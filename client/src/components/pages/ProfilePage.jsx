import React, { useEffect, useState } from "react";
import NavBar from "../elements/NavBar";
import { useParams } from "react-router-dom";
import { useAuthToken } from "../../AuthTokenContext";
import { useAuth0 } from "@auth0/auth0-react";
import { IoSettingsSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaPersonSkiing, FaPersonSnowboarding } from "react-icons/fa6";
import '../../style/ProfilePage.css';
import UserMountainReview from "../elements/UserMountainReview";
import EditProfileForm from "../elements/EditProfileForm";
import Footer from "../elements/Footer";

export default function ProfilePage() {
    const { accessToken } = useAuthToken();
    const { isAuthenticated } = useAuth0();
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isOwnProfile, setIsOwnProfile] = useState(false);
    const [settingsUp, setSettingsUp] = useState(false);
    const [userReviews, setUserReviews] = useState([]);
    const API_URL = process.env.REACT_APP_API_URL;

    // Set user reviews
    useEffect(() => {
        if (userData && userData.reviews.length > 0) {
            const reveresedReviews = [...userData.reviews].reverse();
            setUserReviews(reveresedReviews);
        }
        else { // Handles case where user goes from one profile directly to theirs in which reviews would be copied
            setUserReviews([]);
        }
    }, [userData, id]);

    // Fetch userData on page load
    useEffect(() => {
        fetchUser();
        if (accessToken && isAuthenticated) {
            fetchCurrentUser();
        }
    }, [id]);

    // Check if current user and specific user are the same
    useEffect(() => {
        if (currentUser && userData) {
            setIsOwnProfile(currentUser.id === userData.id);
        }
    }, [userData, currentUser]);

    // Fetch current user's data
    async function fetchCurrentUser() {
        try {
            const response = await fetch(`${API_URL}/user`, {
                headers: {
                    Authorization: `Bearer ${accessToken}` 
                }
            });
            if (!response.ok) {
                throw new Error ('Network response failed');
            }
            const data = await response.json();
            setCurrentUser(data);
        }
        catch (error) {
            console.log('Error fetching data: ', error);
        }
    }

    // Fetches id specific user info
    async function fetchUser() {
        try {
            const response = await fetch(`${API_URL}/user/${id}`);
            if (!response.ok) {
                throw new Error('Network response failed');
            }
            const data = await response.json();
            setUserData(data);
        }
        catch (error) {
            console.log(error);
        }
    }

    // Refresh the user data once edit profile form submitted or review deleted
    async function refreshUserData() {
        await fetchUser();
        if (isAuthenticated) {
            await fetchCurrentUser();
        }
    }

    // Simple helper function to capitalize skier level
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Helper function to display skier type
    function displaySkierType(string) {
        if (string.toUpperCase() === 'SKI') {
            return 'Skier';
        }
        return 'Snowboarder';
    }

    // Loading screen
    if (!userData) {
        return (
            <p>Loading...</p>
        );
    }

    return (
        <div className="profile-page">
            <NavBar userData={currentUser} />
            <div className="profile-content">
                <div className="profile-info-container"> 
                    <div className="profile-info">
                        <div className="icon-settings">
                            {
                                userData.skierType ? (
                                    userData.skierType === 'Ski' ? <FaPersonSkiing color="#205097" className="logo" size={55} /> : <FaPersonSnowboarding color="#205097" className="logo" size={55} />
                                ) : <FaUser className="logo" size={55} />
                            }
                            {
                                isOwnProfile ? (
                                <IoSettingsSharp className="profile-settings" size={25} color="#737376" onClick={() => (setSettingsUp(!settingsUp))} />
                                ) : ''
                            }
                        </div>
                        {
                            settingsUp ? (
                                <div className="edit-profile-content">
                                    <EditProfileForm userData={currentUser} setSettingsView={setSettingsUp} refreshUserData={refreshUserData} />
                                </div>
                            )
                            : (<div className="user-info">
                                <p id="user-name">{userData.name}</p>
                                <p id="ski-type">Skier type: { userData.skierType ? displaySkierType(userData.skierType) : 'Not provided' }</p>
                                <p id="ski-level">Skier level: { userData.skierLevel ? capitalizeFirstLetter(userData.skierLevel) : 'Not provided' }</p>
                            </div>)
                        }
                    </div>
                </div>
                <div className="profile-reviews">
                    <div className="user-reviews">
                        <p>Your reviews</p>
                    </div>
                    <ul className="user-review-list">
                        {
                            userReviews && userReviews.length > 0 ? userReviews.map((item) => (
                                <li className="review-item" key={item.id}>
                                    <UserMountainReview review={item} mountain={item.mountain} refreshReviews={refreshUserData} checkOwnProfile={isOwnProfile} />
                                </li> 
                            )) : <p id="empty-review-message">No reviews yet...</p>
                        }
                    </ul>
                </div>
            </div>
            <Footer className="profile-footer" />
        </div>
    );
}