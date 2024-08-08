import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/MountainPreviewCard.css';


export default function MountainPreviewCard({ mountain }) {
    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate(); // For routing upon press
    const API_URL = process.env.REACT_APP_API_URL;

    // Fetch the pictures of the mountains upon load, change of mountain name, or change of mountain
    useEffect(() => {
        fetchImage(mountain.picture);
    }, [mountain.picture, mountain.name]);


    // Fetch the image from backend storage. Have a retry counter that will retry if an image has not loaded
    async function fetchImage(picture) {
        try {
            const response = await fetch(`${API_URL}/api/image-url?path=${(picture)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setImageUrl(data.url);
            } 
        catch (error) {
            console.error("Error fetching image URL:", error);
        }
    };

    return (
        <button className="card-container" onClick={() => navigate(`/mountains/${mountain.id}`)}>
            <div className="card-info">
                <div className="picture-area" style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}></div>
                <div className="mountain-title">{mountain.name}</div>
                <div className="mountain-location">{mountain.location}</div>
            </div>
        </button>
    );
}