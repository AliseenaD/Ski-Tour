import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import '../../../style/Pages/MountainDetail.css';
import { useParams } from "react-router-dom";
import { removeFromBucketList } from "../../../utility/BucketListApi";
import { postReview } from "../../../utility/ReviewApi";

export default function Form({ setReviewState, userData, refreshReviews, setBucketFill, accessToken }) {

    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const { id } = useParams(); 

    // Handle cancel of the form
    function handleCancel(e) {
        e.preventDefault();
        setRating(0);
        setReviewText('');
        setReviewState(false);
    }

    async function handleSubmit(event) {
        event.preventDefault()
        if (accessToken && userData) {
            try {
                const result = await postReview(id, accessToken, reviewText, rating);
                // If successful clear everything in form
                if (result && result.success) {
                    setRating(0);
                    setReviewText('');
                    setReviewState(false);
                    if (refreshReviews) {
                        refreshReviews();
                    }
                    if (userData.bucketList.filter(item => item.mountainId === id)) {
                        removeBucketList();
                        setBucketFill(false);
                    } 
                }
            }
            catch (error) {
                console.error("Error submitting review:", error);
            }
        }
    }

    // Remove the mountain from bucketlist if a review is left by the user
    async function removeBucketList() {
        try {
            const response = await removeFromBucketList(id, accessToken);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <form className="review-form">
            <div className="star-rating">
                <div className="rating-label">
                    <label>Resort rating: </label>
                </div>
                <div className="rating">
                    {[...Array(5)].map((star, index) => {
                        const ratingValue = index + 1;
                        return (
                            <label key={index}>
                                <input 
                                    type="radio" 
                                    name="rating" 
                                    value={ratingValue} 
                                    onClick={() => setRating(ratingValue)}
                                />
                                <FaStar 
                                    className="star" 
                                    color={ratingValue <= (rating) ? "#476ea9" : "#e4e5e9"}
                                    size={20}
                                />
                            </label>
                        );
                    })}
                </div>
            </div>
            <textarea className="form-input" type="text" placeholder="Your review" value={reviewText} onChange={(e) => setReviewText(e.target.value)} ></textarea>
            <button className="form-input" id="submit-button" onClick={(e) => handleSubmit(e)}>Submit</button>
            <button className="form-input" id="cancel-button" onClick={handleCancel}>Cancel</button>
        </form>
    );
}