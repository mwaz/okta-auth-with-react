import React, { useState, useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";

const Profile = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      setUserInfo(authState.idToken.claims);
    }
  }, [authState, oktaAuth]); // Update if authState changes

  // Create a loading message while we wait for user info
  if (!userInfo) return <div>Loading user info...</div>;

  return (
    <div className="container py-4">
      <div className="jumbotron">
        <p>Name: {userInfo.name}</p>
        <p>Email: {userInfo.email}</p>
        <p>Preferred Username: {userInfo.preferred_username}</p>

        {/* Create a logout button */}
        <button
          className="btn btn-primary btn-sm"
          onClick={() => oktaAuth.signOut()}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
