import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import '../../style/ExploreRegion.css';
import RegionMountains from "./RegionMountains";

export default function ExploreRegion({ name, region }) {

    const [openRegion, setOpenRegion] = useState(false);

    return (
        <div className="region-content">
            <div className="region-title" onClick={() => setOpenRegion(!openRegion)}>
                {name}
                {openRegion ? (
                    <FaAngleUp color="#f6f6f6" size={50} className="arrow-icon" />
                ) : (
                    <FaAngleDown color="#f6f6f6" size={50} className="arrow-icon" />
                )}
            </div>
            <div className={`region-mountains ${openRegion ? ' region-open' : ''}`}>
                <RegionMountains mountains={region} />
            </div>
        </div>
    );
}