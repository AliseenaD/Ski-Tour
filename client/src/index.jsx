import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import VerifyUser from "./components/pages/VerifyUser";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthTokenProvider } from "./AuthTokenContext";
import { requestedScopes } from "./constants";
import Mountains from "./components/pages/Mountains";
import BucketList from "./components/pages/BucketList";
import MountainDetail from "./components/pages/MountainDetail";
import ProfilePage from "./components/pages/ProfilePage";

const container = document.getElementById("root");

const root = ReactDOMClient.createRoot(container);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/verify-user`,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        scope: requestedScopes.join(" "),
      }}
    >
      <AuthTokenProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bucket-list" element={<BucketList />} />
            <Route path="/mountains" element={<Mountains />} />
            <Route path="/mountains/:id" element={<MountainDetail />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/verify-user" element={<VerifyUser />} />
          </Routes>
        </BrowserRouter>
      </AuthTokenProvider>
    </Auth0Provider>
  </React.StrictMode>
);
