import React, { useState } from "react";
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

    // Handle submit of form
    async function handleSubmit(event) {
        // If any variable blank
        if (!name || !skierType || !skierLevel) {
            window.alert("Cannot leave any portion of the form blank!");
            return;
        }
        event.preventDefault();
        // Edit the users profile information
        if (userData) {
            try {
                const result = await editProfile(name, skierType, skierLevel, accessToken);
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
                <button id="edit-submit" onClick={(e) => handleSubmit(e)}>Submit</button>
                <button id="edit-cancel" onClick={() => setSettingsView(false)}>Cancel</button>
            </form>
            <button id="logout" onClick={() => logout()}>Logout</button>
        </div>
    );
}