import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../style/Pages/Home.css";

export default function ExploreMountainsBanner() {
    const navigate = useNavigate();

    return (
        <div className="explore-mountains-container">
            <div className="explore-background">
                <div className="explore-content">
                    <div className="content">The world at the tips of your skis.</div>
                    <div className="create-account-button" onClick={() => navigate('/mountains')}>Explore</div>
                </div>
            </div>
        </div>
    );
}