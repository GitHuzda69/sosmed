import "./home-profile.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext.js";

import defaultprofile from "../../assets/profile/default_avatar.png";

const HomeProfile = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="homeProfile">
      <Link to={`/profile/${user.username}`} style={{ textDecoration: "none", color: "inherit" }} className="profileavatar">
        <img className="banner-homeProfile" src={user.coverPicture ? PF + user.coverPicture : defaultprofile} alt={user.displayname} />
        <img className="profile-homeProfile" src={user.profilePicture ? PF + user.profilePicture : defaultprofile} alt="profile" />
      </Link>
      <h2>{user.displayname}</h2>
      <div className="follow-homeProfile">
        <h3>{user.followings.length}</h3>
        <h4>Following</h4>
        <h3>{user.followers.length}</h3>
        <h4>Followers</h4>
      </div>
    </div>
  );
};

export default HomeProfile;
