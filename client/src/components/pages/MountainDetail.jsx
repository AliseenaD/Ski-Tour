import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import { useAuthToken } from "../../AuthTokenContext";
import NavBar from "../elements/MultiPageElements/NavBar";
import { FaBucket } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import axios from 'axios';
import ReviewList from "../elements/MountainDetailElements/ReviewList";
import Form from "../elements/MountainDetailElements/Form";
import WeatherForecast from "../elements/MountainDetailElements/WeatherForecast";
import ikonLogo from "../../photos/Ikon-logo.png";
import epicLogo from "../../photos/epic-logo.png";
import '../../style/Pages/MountainDetail.css';
import Footer from "../elements/MultiPageElements/Footer";
import { addToBucketList, removeFromBucketList } from "../../utility/BucketListApi";
import { getSpecificMountain } from "../../utility/MountainApi";
import { getUser } from "../../utility/UserApi";
import { IoIosClose } from "react-icons/io";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

export default function MountainDetail() {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    const { accessToken } = useAuthToken();
    const [mountainInfo, setMountainInfo] = useState(null); // For the specific info
    const [mountainReviews, setMountainReviews] = useState([]); // For reviews
    const { id } = useParams(); // For id from url
    const mountainId = parseInt(id);
    const [bucketFill, setBucketFill] = useState(false); // If bucket is on bucketlist/filled or not 
    const [averageRating, setAverageRating] = useState(null); // For rating
    const [reviewOpen, setReviewOpen] = useState(false); // For review box to show
    const [weatherData, setWeatherData] = useState(null); // Weather data state
    const [userData, setUserData] = useState(null); // Set the user data 
    const WEATHER_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const [totalPhotos, setTotalPhotos] = useState([]);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [photoVisualOpen, setPhotoVisualOpen] = useState(false);

    // Get the mountain info based off the id passed within the url
    useEffect(() => {
        getMountain(); 
    },[mountainId]);

    // Add all photos to total pictures upon reviews
    useEffect(() => {
        if (mountainReviews.length > 0 ) {
            const actualReviews = mountainReviews[0];
            const totalPhotos = actualReviews.filter((review) => review.photos && review.photos.length > 0).flatMap(review => review.photos).map(photo => photo.picture);
            setTotalPhotos(totalPhotos);
        }
    }, [mountainReviews]);

    // Get the image URL
    useEffect(() => {
        if (mountainInfo) {
            getAverageRating();
            fetchWeather();
        }
    }, [mountainInfo]);

    // Fetch reviews
    useEffect(() => {
        if (mountainInfo && mountainInfo.reviews.length > 0) {
            const reversedReviews = [...mountainInfo.reviews].reverse();
            setMountainReviews([reversedReviews]);
        }
    }, [mountainInfo]);

    // Update user data
    useEffect(() => {
        if (isAuthenticated && accessToken) {
            fetchUserData();
        }
    }, [isAuthenticated, accessToken]);

    // Update if bucket should be filled based on user bucketlist
    useEffect(() => {
        if (userData) {
            const isInBucketList = userData.bucketList.some((item) => item.mountainId === mountainId);
            setBucketFill(isInBucketList);
        }
    }, [userData]);

    // Fetch user data
    async function fetchUserData() {
        try {
            const result = await getUser(accessToken);
            if (result) {
                setUserData(result);
            }
        }
        catch (error) {
            console.log('Error fetching data: ', error);
        }
    }

    // Fetch mountain information using the id
    async function getMountain() {
        try {
            const result = await getSpecificMountain(mountainId);
            setMountainInfo(result);
        }
        catch(error) {
            console.error(error);
        }
    }

    // Refresh the mountain data after review is submitted
    const refreshMountainData = async () => {
        await getMountain();
    };

    // Function to get the weather of the location
    async function fetchWeather() {
        console.log(WEATHER_KEY);
        try {
            const response = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
                params: {
                    key: WEATHER_KEY,
                    q: mountainInfo.location,
                    days: 3
                }
            });
            setWeatherData(response.data);
        }
        catch(error) {
            console.log("Error fetching weather data: ", error);
        }
    }

    // Gets the average ratings of a mountain, otherwise returns null if there are none
    function getAverageRating() {
        if (mountainInfo && mountainInfo.reviews.length > 0) {
            const ratings = mountainInfo.reviews.map(review => review.rating);
            const average = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length; // Get average rating
            const roundedAverage = Number(average.toFixed(1)); // Round to tenth
            setAverageRating(roundedAverage);
        }
    }

    // Open review form if user is logged in, otherwise send to login/create account page
    function handleClick() {
        if (!isAuthenticated && !accessToken) {
            loginWithRedirect();
            return;
        }
        if (reviewOpen) {
            return;
        }
        setReviewOpen(true);
    }

    // Handles what happens if a user hits the bucket item
    async function handleBucketClick() {
        // Reroute if not authenticated
        if (!isAuthenticated) {
            loginWithRedirect();
        }
        try {
            const result = bucketFill ? await removeFromBucketList(id, accessToken) : await addToBucketList(id, accessToken)
            // If successful reset bucketfill to opposite of what it is now
            if (result && result.success) {
                setBucketFill(!bucketFill);
            }
        }
        catch (error) {
            console.error("Error updating list:", error);
        }
    }

    // While loading the information present a loading dialogue to avoid errors when calling for mountainInfo information
    if(!mountainInfo) {
        return (<p>Loading...</p>);
    }

    // Handle close of the photo viewer
    function handleClose() {
        setPhotoVisualOpen(false);
        setCurrentPhotoIndex(0);
    }

    // Handles the opening of photoviewer given an index
    function handleOpen(index) {
        setPhotoVisualOpen(true);
        setCurrentPhotoIndex(index);
    }

    // Handle arrow clicks when photos are open
    function handleArrowClick(amount) {
        if (currentPhotoIndex + amount < 0 || currentPhotoIndex + amount >= totalPhotos.length) {
            return;
        }
        setCurrentPhotoIndex(index => index + amount);
    }
    
    return (
        <div className="mountain-detail-page">
            <NavBar userData={userData} />
            <div className="mountain-content">
                <div className="info-weather-holder">
                    <div className="info-weather">
                        <div className="mountain-information">
                            <img src={mountainInfo.picture} alt={`${mountainInfo.name} resort`} />
                            <div className="title-bucketlist">
                                <p id="mountain-name">{mountainInfo.name}</p>
                                <FaBucket id="bucket-icon" size={30} data-testid="bucket-icon" color={bucketFill ? '#205097' : '#b3afaf'} onClick={handleBucketClick} />
                            </div>
                            <p id="mountain-location">{mountainInfo.location}</p>
                            <div className="ratings-pass">
                                <div className="ratings">
                                    <FaStar id="rating-star" size={25} color="#03214f" />
                                    <p id="mountain-rating">{averageRating ? averageRating : 'No reviews yet'}</p>
                                </div>
                                {
                                    mountainInfo.passType === 'Ikon' ? <img className="pass-type" src={ikonLogo} alt="Ikon Pass"/> 
                                    : <img className="pass-type" src={epicLogo} alt="Epic Pass" />
                                }
                            </div>
                            <button className={`review-button ${reviewOpen ? 'closed' : ''}`} onClick={handleClick}>Leave a Review</button>
                            <div className={`review-box ${reviewOpen ? " open" : ""}`}>
                                <Form setReviewState={setReviewOpen} setBucketFill={setBucketFill} userData={userData} refreshReviews={refreshMountainData} accessToken={accessToken} />
                            </div>
                        </div>
                        <div className="weather-content">
                            <WeatherForecast weatherData={weatherData} />
                        </div>
                    </div>
                </div>
                <div className="mountain-review-content">
                    <div className="mountain-reviews">
                        {totalPhotos && totalPhotos.length > 0 ? (
                        <div className="review-photos-container">
                            <div className="review-photos-header">
                                <p>Photos</p>
                            </div>
                            <div className="review-photos">
                                {totalPhotos.map((photo, index) => (
                                    <div className="review-photo"
                                    key={index} 
                                    onClick={() => handleOpen(index)}
                                    style={{backgroundImage:`url(${photo}`}} />
                                ))}
                            </div>
                        </div>
                        ) : ''}
                        {photoVisualOpen ? (
                            <div className="loaded-image-background">
                                <IoIosClose onClick={() => handleClose()} className="image-delete" size={60} color="white" />
                                <div className="review-photo-row">
                                    <div className="arrow-container">
                                        <FaArrowLeft className="preview-arrows" size={30} color="#476ea9" onClick={() => handleArrowClick(-1)} />
                                    </div>
                                    <img className="current-photovisual" src={totalPhotos[currentPhotoIndex]} alt={`review photo ${currentPhotoIndex}`} />
                                    <div className="arrow-container">
                                        <FaArrowRight className="preview-arrows" size={30} color="#476ea9" onClick={() => handleArrowClick(1)} />
                                    </div>
                                </div>
                            </div>
                        ) : ''}
                        <div className="review-title">
                            <p>Reviews</p>
                        </div>
                        <ReviewList reviews={mountainReviews} />
                    </div>
                </div>
            </div>
            <Footer className="detail-footer" />
        </div>
    );
}