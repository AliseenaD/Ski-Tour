import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../../style/Home.css";

export default function CreateAccount() {
    const { loginWithRedirect } = useAuth0();

    return (
        <div className="create-account-container">
            <div className="container-background">
                <div className="content-container">
                    <div className="content">Make your own tracks.</div>
                    <div className="create-account-button" onClick={loginWithRedirect}>Sign In / Register</div>
                </div>
            </div>
        </div>
    );
}