import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../../../AuthTokenContext";
import Form from "./Form";
import { FaStar } from "react-icons/fa";
import { FaBucket } from "react-icons/fa6";
import '../../../style/Pages/MountainDetail.css';
import { getMountainImage } from "../../../utility/MountainApi";
import { addToBucketList, removeFromBucketList } from "../../../utility/BucketListApi";

export default function MountainInfoCard({ mountainInfo, userData }) {
    const [bucketFill, setBucketFill] = useState(false); // If bucket is on bucketlist/filled or not 
    const [averageRating, setAverageRating] = useState(null); // For rating
    const [imageUrl, setImageUrl] = useState(null); // For image url
    const [reviewOpen, setReviewOpen] = useState(false); // For review box to show
    const { accessToken } = useAuthToken();
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    // Get the image URL
    useEffect(() => {
        if (mountainInfo) {
            fetchImage(mountainInfo.picture);
            getAverageRating();
        }
    }, [mountainInfo]);

    // Update if bucket should be filled based on user bucketlist
    useEffect(() => {
        if (userData) {
            const isInBucketList = userData.bucketList.some((item) => item.mountainId === mountainInfo);
            setBucketFill(isInBucketList);
        }
    }, [userData]);

    // handle what occurs if user clicks on the bucket icon
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

    // Fetch the image from backend storage.
    async function fetchImage(picture) {
        try {
            const result = await getMountainImage(picture);
            setImageUrl(result.url);
            } 
        catch (error) {
            console.error("Error fetching image URL:", error);
        }
    };

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
        if (reviewOpen) {
            return;
        }
        setReviewOpen(true);
    }
    
    return (
        <div className="mountain-information">
            <img src={imageUrl} alt={`${mountainInfo.name} resort`} />
            <div className="title-bucketlist">
                <p id="mountain-name">{mountainInfo.name}</p>
                <FaBucket id="bucket-icon" size={30} color={bucketFill ? '#205097' : '#b3afaf'} onClick={handleBucketClick} />
            </div>
            <p id="mountain-location">{mountainInfo.location}</p>
            <div className="ratings-pass">
                <div className="ratings">
                    <FaStar id="rating-star" size={25} color="#03214f" />
                    <p id="mountain-rating">{averageRating ? averageRating : 'No reviews yet'}</p>
                </div>
                <p id="pass-type">{mountainInfo.passType}</p>
            </div>
            <button className={`review-button ${reviewOpen ? 'closed' : ''}`} onClick={handleClick}>Leave a Review</button>
            <div className={`review-box ${reviewOpen ? " open" : ""}`}>
                <Form setReviewState={setReviewOpen} />
            </div>
        </div>
    );
}