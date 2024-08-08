import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import '../../style/Form.css';
import { useParams } from "react-router-dom";

export default function Form({ setReviewState, userData, refreshReviews, setBucketFill, accessToken }) {

    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const { id } = useParams(); 
    const API_URL = process.env.REACT_APP_API_URL;

    // Handle cancel of the form
    function handleCancel(e) {
        e.preventDefault();
        setRating(0);
        setReviewText('');
        setReviewState(false);
    }

    // Function to handle submit
    async function handleSubmit(event) {
        event.preventDefault();
        if (accessToken && userData) {
            try {
                const response = await fetch(`${API_URL}/reviews/${id}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: reviewText,
                        rating: rating
                    })
                });
                if (!response.ok) {
                    throw new Error('Failed to post review');
                }
                const data = await response.json();
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
            catch (error) {
                console.log(error);
            }
        }
    }

    // Remove the mountain from bucketlist if a review is left by the user
    async function removeBucketList() {
        try {
            const response = await fetch(`${API_URL}/bucket-list/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error ('Failed to update bucket-list');
            }
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