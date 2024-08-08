import React, { useEffect, useState } from "react";
import { useAuthToken } from "../../AuthTokenContext";
import '../../style/UserMountainReview.css';
import RatingStars from "./RatingStars";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { MdDelete } from "react-icons/md";

export default function UserMountainReview({ mountain, review, refreshReviews, checkOwnProfile}) {
    const navigate = useNavigate();
    const { accessToken } = useAuthToken();
    const [image, setImage] = useState(null);
    const API_URL = process.env.REACT_APP_API_URL;

    // Fetch image upon mountain change
    useEffect(() => {
        if (mountain) {
            fetchImage(mountain.picture);
        }
    }, [mountain])

     // Fetch the image from backend storage. Have a retry counter that will retry if an image has not loaded
     async function fetchImage(picture) {
        try {
            const response = await fetch(`${API_URL}/api/image-url?path=${(picture)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setImage(data.url);
            } 
        catch (error) {
            console.error("Error fetching image URL:", error);
        }
    };

    // Delete review in backend
    async function deleteReview() {
        try {
            const response = await fetch(`${API_URL}/reviews/${review.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            if (!response.ok) {
                throw new Error ('Failed to delete review');
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    // Deletes review
    async function handleDelete() {
        const isConfirmed = window.confirm("Are you sure you want to delete this review?");
        if (isConfirmed) {
            await deleteReview();
            refreshReviews();
        }
    }

    function formatDate(date) {
        return format(date, 'dd-MM-yyyy');
    }


    return (
        <div className={`user-review-content ${checkOwnProfile ? " own" : ""}`}>
            {
                checkOwnProfile ? <MdDelete className="delete-icon" size={30} color="#a0a0a3" onClick={handleDelete} /> : ''
            }
            <img src={image} alt={`${mountain.name} resort`}></img>
            <div className="review-information">
                <p id="review-mountain" onClick={() => navigate(`/mountains/${mountain.id}`)}>{mountain.name}</p>
                <p id="review-date">Reviewed: {formatDate(review.createdAt)}</p>
                <RatingStars className="review-rating" numStars={review.rating} />
                <p id="review">{review.title}</p>
                <hr></hr>
            </div>
        </div>
    );
}