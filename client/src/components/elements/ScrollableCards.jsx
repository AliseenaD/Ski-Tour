import React, { useRef, useState } from "react";
import '../../style/ScrollableCards.css';
import MountainPreviewCard from "./MountainPreviewCard";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

export default function ScrollableCards( { items } ) {

    const [scrollPosition, setScrollPosition] = useState(0);
    const containerRef = useRef(0);

    function handleScroll(amount) {
        const newPosition = scrollPosition + amount;
        setScrollPosition(newPosition);
        containerRef.current.scrollLeft = newPosition;
    }
    
    return (
        <div className="scrollable-container">
            <FaArrowLeft className="arrow" size={30} onClick={() => {handleScroll(-250)}} />
            <div className="scroll-items">
                <ul className="mountain-list" ref={containerRef}>
                    {
                        items.map((item) => (
                            <li  key={item.id} ><MountainPreviewCard mountain={item} /></li>
                        ))
                    }
                </ul>
            </div>
            <FaArrowRight className="arrow" size={30} onClick={() => {handleScroll(250)}} style={{left:-30}} />
        </div>
    );
}