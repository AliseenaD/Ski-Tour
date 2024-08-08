import React from "react";
import { FaStar } from "react-icons/fa";
import '../../style/RatingStars.css';

export default function RatingStars({ numStars }) {
    return (
        <div className="star-container">
            <ul className="star-list">
                {Array(numStars).fill().map((item, index) => (
                    <li key={index}>
                        <FaStar className="rating-star" size={20} color="#205097" />
                    </li>
                ))}
            </ul>
        </div>
    );
}