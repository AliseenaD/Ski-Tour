import React, { useEffect, useState } from "react";
import '../../../style/MultiPage/PhotoScroll.css';
import { IoIosClose } from "react-icons/io";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

export default function PhotoScroll({ photos }) {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [photoPreview, setPhotoPreview] = useState(false);
    const [photoUrls, setPhotoUrls] = useState([]);

    // Set an array of photo urls
    useEffect(() => {
        const totalPhotos = photos.map(item => item.picture);
        setPhotoUrls(totalPhotos);
    }, [photos]);

    // Handle the opening of the preview
    function handleOpen(index) {
        setCurrentPhotoIndex(index);
        setPhotoPreview(true);
    }

    // Handle close on photo preview
    function handleClose() {
        setPhotoPreview(false);
        setCurrentPhotoIndex(0)
    }

    // Handle arrow clicks on photo preview
    function handleArrowClick(amount) {
        if (currentPhotoIndex + amount < 0 || currentPhotoIndex + amount >= photos.length) {
            console.log('no longer able to click');
            return;
        }
        setCurrentPhotoIndex(index => index + amount);
        console.log(currentPhotoIndex);
    }
    
    if (photos && photos.length > 0) {
        return (
            <>
                <div className="review-images">
                    {photoUrls.map((item, index) => 
                        <div 
                        className="review-photo user"
                        key={index} 
                        style={{backgroundImage:`url(${item}`}}
                        onClick={() => handleOpen(index)}
                        /> 
                    )}
                </div>
                {photoPreview ? (
                    <div className="photo-preview-background">
                        <IoIosClose onClick={() => handleClose()} className="preview-delete" size={60} color="white" />
                        <div className="photo-preview-row">
                            <div className="arrow-container">
                                <FaArrowLeft className="preview-arrows" size={30} color="#476ea9" onClick={() => handleArrowClick(-1)} />
                            </div>
                            <img className="preview-visual" src={photoUrls[currentPhotoIndex]} alt={`review photo ${currentPhotoIndex}`} />
                            <div className="arrow-container">
                                <FaArrowRight className="preview-arrows" size={30} color="#476ea9" onClick={() => handleArrowClick(1)} />
                            </div>
                        </div>
                    </div>
                ) : ''}
            </>
        );
    }
}