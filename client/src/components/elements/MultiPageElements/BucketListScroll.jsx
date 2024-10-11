import React from "react";
import ScrollableCards from "./ScrollableCards";
import { Link } from "react-router-dom";
import '../../../style/MultiPage/BucketListScroll.css';

export default function BucketListScroll({ mountains }) {
    if (mountains.length > 0) {
        return (
            <>
                <p className="bucket-list-header">Your Bucket List</p>
                <ScrollableCards items={mountains} />
            </>
        );
    }
    else {
        return (
            <>
            <p className="bucket-list-header">Your Bucket List</p>
            <div className="empty-list-message">
                <div className="adventure-message">No mountains on your list, find your next adventure...</div>
                <Link className="explore-link" to="/mountains">Explore Mountains</Link>
            </div>
            </>
        );
    }
}