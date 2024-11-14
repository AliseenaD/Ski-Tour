import React, { useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import '../../../style/Pages/ProfilePage.css';
import { useAuthToken } from "../../../AuthTokenContext";
import { editProfile } from "../../../utility/UserApi";

export default function EditProfileForm({ userData, setSettingsView, refreshUserData }) {
    const { logout } = useAuth0(); 
    const [name, setName] = useState(''); // For name
    const [skierType, setSkierType] = useState(''); // For edit profile
    const [skierLevel, setSkierLevel] = useState(''); // For edit profile
    const { accessToken } = useAuthToken();
    const fileInputRef = useRef(null);
    const [profilePhoto, setProfilePhoto] = useState(null);

    // Handle submit of form
    async function handleSubmit(event) {
        // If any variable blank
        if (!name || !skierType || !skierLevel) {
            window.alert("Name, skier type, and skier level are required!");
            return;
        }
        event.preventDefault();
        // Edit the users profile information
        if (userData) {
            try {
                const result = await editProfile(name, skierType, skierLevel, profilePhoto, accessToken);
                if (result && result.success) {
                    setSettingsView(false);
                    refreshUserData();
                }
            }
            catch (error) {
                console.error(error);
            }
        }
    }

    // Converts files to base64 for photo upload
    const fileToDataUrl = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                resolve(event.target.result);
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

    // Handles the upload of photo
    async function handlePhotoUpload(event) {
        const file = event.target.files[0];
        // First check to ensure that all files are within adequate sizing
        if (file.size > 5 * 1024 * 1024) {
            alert("Profile photo is too large. Maximum size is 5MB!");
            if (fileInputRef.current) {
                fileInputRef.current = "";
            }
            return;
        }
        // Convert the files to data URLs
        try {
            const dataFile = await fileToDataUrl(file);
            setProfilePhoto(dataFile);
        }
        catch(error) {
            console.error("Error processing photos:", error);
            // Reset the file input and photo state if there's an error
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            setProfilePhoto(null);
        }
    }

    return (
        <div>
            <p id="form-title">Edit Profile</p>
            <form className="edit-form">
                <label className="form-label" htmlFor="name">Your name:</label>
                <input className="form-select" id="text-input" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required></input>
                <label className="form-label" htmlFor="skierType">Skier or Snowboarder?</label>
                <select className="form-select" id="skierType" value={skierType} onChange={(e) => setSkierType(e.target.value)} required>
                    <option value="">--Please choose an option--</option>
                    <option value="Ski">Skier</option>
                    <option value="Snowboard">Snowboarder</option>
                </select>
                <label className="form-label" htmlFor="skierLevel">Skier level:</label>
                <select className="form-select" id="skierLevel" value={skierLevel} onChange={(e) => setSkierLevel(e.target.value)} required>
                    <option value="">--Please choose an option--</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>
                <label htmlFor="file-upload" className="profile-photo-button">Upload Profile Photo</label>
                {profilePhoto ? (
                    <div className="profile-photo-notification">
                        <p className="profile-photo-notification">Profile photo selected</p>
                    </div>
                ) : ''}
                <input ref={fileInputRef} id="file-upload" type="file" className="form-file" onChange={(e) => handlePhotoUpload(e)} accept="image/*"></input>
                <button id="edit-submit" onClick={(e) => handleSubmit(e)}>Submit</button>
                <button id="edit-cancel" onClick={() => setSettingsView(false)}>Cancel</button>
            </form>
            <button id="logout" onClick={() => logout()}>Logout</button>
        </div>
    );
}