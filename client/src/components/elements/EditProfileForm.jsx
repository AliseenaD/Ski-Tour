import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import '../../style/ProfilePage.css';
import { useAuthToken } from "../../AuthTokenContext";

export default function EditProfileForm({ userData, setSettingsView, refreshUserData }) {
    const { logout } = useAuth0(); 
    const [skierType, setSkierType] = useState(''); // For edit profile
    const [skierLevel, setSkierLevel] = useState(''); // For edit profile
    const { accessToken } = useAuthToken();
    const API_URL = process.env.REACT_APP_API_URL;

    async function handleSubmit(event) {
        event.preventDefault();
        if (userData) {
            try {
                const response = await fetch(`${API_URL}/user`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({
                        skierType,
                        skierLevel
                    })
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setSettingsView(false);
                refreshUserData();
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div>
            <p id="form-title">Edit Profile</p>
            <form className="edit-form">
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