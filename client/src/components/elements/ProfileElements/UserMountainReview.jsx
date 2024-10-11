import React, { useEffect, useState } from "react";
import { useAuthToken } from "../../../AuthTokenContext";
import '../../../style/Pages/ProfilePage.css';
import RatingStars from "../MultiPageElements/RatingStars";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { MdDelete } from "react-icons/md";
import { getMountainImage } from "../../../utility/MountainApi";
import { deleteReview } from "../../../utility/ReviewApi";

export default function UserMountainReview({ mountain, review, refreshReviews, checkOwnProfile}) {
    const navigate = useNavigate();
    const { accessToken } = useAuthToken();
    const [image, setImage] = useState(null);

    // Fetch image upon mountain change
    useEffect(() => {
        if (mountain) {
            fetchImage(mountain.picture);
        }
    }, [mountain])

     // Fetch the image from backend storage.
    async function fetchImage(picture) {
        try {
            const result = await getMountainImage(picture);
            setImage(result.url);
            } 
        catch (error) {
            console.error("Error fetching image URL:", error);
        }
    };

    // Deletes review
    async function handleDelete() {
        const isConfirmed = window.confirm("Are you sure you want to delete this review?");
        if (isConfirmed) {
            const result = await deleteReview(review.id, accessToken);
            // If successfully deleted, refresh reviews
            if (result && result.success) {
                refreshReviews();
            }
            else {
                console.error("Error deleting mountain");
            }
        }
    }

    // Format the date
    function formatDate(date) {
        return format(date, 'MM-dd-yyyy');
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