import React, { useEffect, useState } from "react";
import photoOne from "../../photos/home1.jpg";
import photoTwo from "../../photos/home2.jpg";
import photoThree from "../../photos/home3.jpg";
import "../../style/HeaderImage.css";

export default function HeaderImage() {
    const [index, setIndex] = useState(0);
    const photos = [photoOne, photoTwo, photoThree];

    // Automatically scroll through the photos
    const infiniteScroll = () => {
        setIndex((currentIndex) => (currentIndex === 2 ? 0 : currentIndex + 1));
    }

    // Constantly scroll through every three seconds
    useEffect(() => {
        const interval = setInterval(infiniteScroll, 5000);
        return () => clearInterval(interval);
    }, [])

    return (
        <div className="carousel-container">
            {photos.map((photo, idx) => (
                <div key={idx} className={`carousel-image ${idx === index ? "active" : ""}`} style={{ backgroundImage: `url(${photo})` }}></div>
            ))}
        </div>
    );
}