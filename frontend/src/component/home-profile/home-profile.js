import "./home-profile.css";
import React, { useContext, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext.js";
import { Icon } from "@iconify/react";

import defaultprofile from "../../assets/profile/default_avatar.png";
import defaultcover from "../../assets/profile/default_banner.jpg";

const HomeProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="homeProfile">
      <Link
        to={`/profile/${user.username}`}
        style={{ textDecoration: "none", color: "inherit" }}
        className="profileavatar"
      >
        <img
          className="banner-homeProfile"
          src={user.coverPicture ? user.coverPicture : defaultprofile}
          alt={user.displayname}
        />
        <img
          className="profile-homeProfile"
          src={user.profilePicture ? user.profilePicture : defaultprofile}
          alt="profile"
        />
      </Link>
      <h2>{user.displayname}</h2>
      <div className="follow-homeProfile">
        <h3>{user.followings.length}</h3>
        <h4>Following</h4>
        <h3>{user.followers.length}</h3>
        <h4>Followers</h4>
      </div>
      <button className="connect-homeProfile">
        <Icon icon="ph:link" width="25" height="25" />
        Connect Your Account
      </button>
    </div>
  );
};

export default HomeProfile;
