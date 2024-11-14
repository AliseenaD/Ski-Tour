import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../../style/MultiPage/MountainPreviewCard.css';
import { getMountainImage } from "../../../utility/MountainApi";


export default function MountainPreviewCard({ mountain }) {
    const navigate = useNavigate(); // For routing upon press

    return (
        <button className="card-container" onClick={() => navigate(`/mountains/${mountain.id}`)}>
            <div className="card-info">
                <div className="picture-area" style={{
                    backgroundImage: `url(${mountain.picture})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}></div>
                <div className="mountain-title">{mountain.name}</div>
                <div className="mountain-location">{mountain.location}</div>
            </div>
        </button>
    );
}