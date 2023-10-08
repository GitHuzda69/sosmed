import "./home-profile.css";
import React, { useContext, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";
import { AuthContext } from "../../context/authContext.js";
import { Icon } from "@iconify/react";

import defaultprofile from "../../assets/profile/default_avatar.png";
import defaultcover from "../../assets/profile/default_banner.jpg";

import profil from "../../assets/profil.jpg";
import banner from "../../assets/banner.jpg";

const HomeProfile = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="homeProfile">
      <Link
        to={`/profile/${currentUser.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
        className="profileavatar"
      >
        <img
          className="banner-homeProfile"
          src={
            currentUser && currentUser.coverpic
              ? "/data/" + currentUser.coverpic
              : defaultcover
          }
          alt="banner"
        />
        <img
          className="profile-homeProfile"
          src={
            currentUser && currentUser.profilepic
              ? "/data/" + currentUser.profilepic
              : defaultprofile
          }
          alt="profile"
        />
      </Link>
      <h2>{currentUser.displayname}</h2>
      <div className="follow-homeProfile">
        <h3>123</h3>
        <h4>Following</h4>
        <h3>456</h3>
        <h4>Followers</h4>
      </div>
      <button className="connect-homeProfile">
        <Icon icon="ph:link" width="25" height="25" color="white" />
        Connect Your Account
      </button>
    </div>
  );
};

export default HomeProfile;