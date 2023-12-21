import React, { useState, useContext, useEffect } from "react";
import "./navbar.css";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

import SearchBar from "../search/Search";
import { AuthContext } from "../../context/authContext.js";

import logo from "../../assets/Logo_BNW.jpg";
import defaultprofile from "../../assets/profile/default_avatar.png";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <img className="navbar-logo" src={logo} alt="BNW logo" />
      <span className="navbar-name">S M D</span>
      <SearchBar />
      <Link to="/fyp" className="navbar-fyp">
        <Icon icon="fluent:sparkle-48-regular" width={30} height={30} />
        <button>For you</button>
      </Link>
      <Link to="/" className="navbar-home">
        <Icon icon="mingcute:user-follow-2-line" width={30} height={30} />
        <button>Following</button>
      </Link>
      <Link className="navbar-newest">
        <Icon icon="solar:graph-new-up-bold" width={30} height={30} />
        <button>Newest</button>
      </Link>
      <Link className="navbar-profile">
        <button>
          <img className="navbar-profile-img" src={user.profilePicture ? user.profilePicture : defaultprofile} alt="profile" />
        </button>
        <button>
          <Icon icon="mingcute:down-line" width={30} height={30} />
        </button>
      </Link>
    </div>
  );
};

export default Navbar;
