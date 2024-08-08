import React from "react";
import '../../style/MapStyles.css';
import MountainPreviewCard from "./MountainPreviewCard";

export default function MapMountains({ mountains }) {
    return (
        <div className="card-list-content">
            <ul className="card-list">
                {mountains.map((mountainItem) => (
                    <li key={mountainItem.id}>
                        <MountainPreviewCard mountain={mountainItem} />
                    </li>
                ))}
            </ul>
        </div>
    );
}