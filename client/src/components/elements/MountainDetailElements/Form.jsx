import React, { useReducer, useState, useRef } from "react";
import { FaStar } from "react-icons/fa";
import { HiOutlineUpload } from "react-icons/hi";
import '../../../style/Pages/MountainDetail.css';
import { useParams } from "react-router-dom";
import { removeFromBucketList } from "../../../utility/BucketListApi";
import { postReview } from "../../../utility/ReviewApi";

export default function Form({ setReviewState, userData, refreshReviews, setBucketFill, accessToken }) {

    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const { id } = useParams(); 
    const [numPhotos, setNumPhotos] = useState(0);
    const fileInputRef = useRef(null);
    const [photos, setPhotos] = useState([]);

    // Handle cancel of the form
    function handleCancel(e) {
        e.preventDefault();
        setRating(0);
        setReviewText('');
        setReviewState(false);
        setNumPhotos(0);
        setPhotos([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    async function handleSubmit(event) {
        event.preventDefault()
        if (accessToken && userData) {
            try {
                const result = await postReview(id, accessToken, reviewText, rating, photos);
                // If successful clear everything in form
                if (result && result.success) {
                    setRating(0);
                    setReviewText('');
                    setReviewState(false);
                    setNumPhotos(0);
                    setPhotos([]);
                    if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                    }
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

    // Converts files to base64 for photo upload
    const fileToDataUrl = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                resolve(event.target.result);
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

    // Handle the upload of photos
    async function handlePhotoUpload(event) {
        const files = Array.from(event.target.files);
        setNumPhotos(files.length);
        // First check to ensure that all files are within adequate sizing
        const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024);
        if (oversizedFiles.length > 0) {
            alert("Some files are too large maximum size is 5MB per file!");
            if (fileInputRef.current) {
                fileInputRef.current = "";
            }
            return;
        }
        const oversizedTotal = files.reduce((sum, file) => sum + file.size, 0);
        if (oversizedTotal > 20 * 1024 * 1024) {
            alert("Total amount of files cannot exceed 20MB!");
            if (fileInputRef.current) {
                fileInputRef.current = "";
            }
            return;
        }

        // Convert the files to data URLs
        try {
            const dataUrls = await Promise.all(
                files.map((file) => fileToDataUrl(file))
            );
            setPhotos(dataUrls);
        }
        catch(error) {
            console.error("Error processing photos:", error);
            // Reset the file input and photo state if there's an error
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            setPhotos([]);
            setNumPhotos(0);
        }
    }

    console.log(photos);
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
            <label htmlFor="file-upload" className="upload-button">Upload Photos</label>
            {numPhotos > 0 ? (
                <p>{numPhotos} {numPhotos === 1 ? 'photo' : 'photos'} selected</p>
            ) : ''}
            <input ref={fileInputRef} id="file-upload" type="file" multiple className="form-file" onChange={(e) => handlePhotoUpload(e)} accept="image/*"></input>
            <button className="form-input" id="submit-button" onClick={(e) => handleSubmit(e)}>Submit</button>
            <button className="form-input" id="cancel-button" onClick={handleCancel}>Cancel</button>
        </form>
    );
}