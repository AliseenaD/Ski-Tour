import React, { useEffect, useState } from "react";
import '../../../style/Pages/MountainDetail.css';
import { useNavigate } from "react-router-dom";
import { FaPersonSkiing, FaPersonSnowboarding } from "react-icons/fa6";
import { format } from "date-fns";
import RatingStars from "../MultiPageElements/RatingStars";
import PhotoScroll from "../MultiPageElements/PhotoScroll";

export default function ReviewList({ reviews }) {
    const navigate = useNavigate();

    // Simple helper function to capitalize skier level
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Format a passed in date
    function formatDate(date) {
        return format(date, 'MM-dd-yyyy');
    }

    return (
        <div className="reviews-content">
            <ul className="reviews-list">
                {reviews.length > 0 ? (
                    reviews[0].map((reviewItem) => (
                        <li key={reviewItem.id}>
                            <div className="review-item">
                                <div className="author-logo">
                                    {
                                        reviewItem.author.picture ? (<div className="review-profile-photo" style={{backgroundImage: `url(${reviewItem.author.picture})`}}></div>) :
                                        reviewItem.author.skierType === 'Ski' ? 
                                        (<FaPersonSkiing className="profile-logo" size={25} color="#205097" />) 
                                        : (<FaPersonSnowboarding className="profile-logo" size={25} color="#205097" />)
                                    }
                                    <p id={`${reviewItem.author.picture ? 'rating-author-picture' : 'rating-author'}`} onClick={() => navigate(`/profile/${reviewItem.author.id}`)}>{reviewItem.author.name}</p>
                                </div>
                                {
                                    reviewItem.author.skierLevel ? 
                                    (
                                        <p id="reviewer-time">Skier level: {capitalizeFirstLetter(reviewItem.author.skierLevel)}</p>
                                    )
                                    : ''
                                }
                                <p id="reviewer-time">Reviewed: {formatDate(reviewItem.createdAt)}</p>
                                <RatingStars numStars={reviewItem.rating} />
                                <p id="rating-title">{reviewItem.title}</p>
                                <PhotoScroll photos={reviewItem.photos} />
                            </div>
                        </li>
                    ))
                ) : <p id="empty-reviews">No Reviews Yet!</p> }
            </ul>
        </div>
    );
}