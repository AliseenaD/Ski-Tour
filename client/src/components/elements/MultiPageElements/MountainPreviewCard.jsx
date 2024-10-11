import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../../style/MultiPage/MountainPreviewCard.css';
import { getMountainImage } from "../../../utility/MountainApi";


export default function MountainPreviewCard({ mountain }) {
    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate(); // For routing upon press

    // Fetch the pictures of the mountains upon load, change of mountain name, or change of mountain
    useEffect(() => {
        fetchImage(mountain.picture);
    }, [mountain.picture, mountain.name]);


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