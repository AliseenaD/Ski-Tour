import React from "react";
import MountainPreviewCard from "./MountainPreviewCard";
import '../../style/RegionMountains.css';

export default function RegionMountains({ mountains }) {
    return(
        <div className="region-content">
            <ul className="region-list">
                {mountains.map((mountainItem) => (
                    <li>
                        <MountainPreviewCard key={mountainItem.id} mountain={mountainItem} />
                    </li>
                ))}
            </ul>
        </div>
    );
}