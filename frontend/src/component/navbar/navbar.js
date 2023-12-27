import React, { useState, useContext } from "react";
import "./navbar.css";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

import SearchBar from "../search/Search";
import { AuthContext } from "../../context/authContext.js";

import logo from "../../assets/Logo_BNW.jpg";
import defaultprofile from "../../assets/profile/default_avatar.png";

const Navbar = ({ isHomePage, isFypPage, isNewestPage, isDarkMode, toggleDarkMode, toggleLogout }) => {
  const { user } = useContext(AuthContext);
  const [isPopupNavbar, setIsPopupNavbar] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const togglePopupNavbar = () => {
    setIsPopupNavbar(!isPopupNavbar);
  };

  const handleSliderChange = () => {
    toggleDarkMode();
  };

  return (
    <div className="navbar">
      <Link to="/other" className="tos-link-navbar">
        <img className="navbar-logo" src={logo} alt="BNW logo" />
        <span className="navbar-name">S M D</span>
      </Link>
      <SearchBar />
      {(isHomePage || isFypPage || isNewestPage) && (
        <>
          <Link to="/fyp" className="navbar-fyp">
            {isFypPage ? <Icon icon="fluent:sparkle-48-filled" width={30} height={30} /> : <Icon icon="fluent:sparkle-48-regular" width={30} height={30} />}
            <button>For you</button>
          </Link>
          <Link to="/" className="navbar-home">
            {isHomePage ? <Icon icon="mingcute:user-follow-2-fill" width={30} height={30} /> : <Icon icon="mingcute:user-follow-2-line" width={30} height={30} />}
            <button>Following</button>
          </Link>
          <Link to="/newest" className="navbar-newest">
            {isNewestPage ? <Icon icon="solar:graph-new-up-bold" width={30} height={30} /> : <Icon icon="solar:graph-new-up-outline" width={30} height={30} />}
            <button>Newest</button>
          </Link>
        </>
      )}
      <Link className="navbar-profile">
        <button>
          <img className="navbar-profile-img" src={user.profilePicture ? PF + user.profilePicture : defaultprofile} alt="profile" />
        </button>
        <button className="navbar-popup" onClick={togglePopupNavbar}>
          <Icon icon="mingcute:down-line" width={30} height={30} />
        </button>
      </Link>
      {isPopupNavbar && (
        <div className="popup-navbar">
          <Link to={`/profile/${user.username}`} className="profile-navbar">
            <button>
              <Icon icon="iconamoon:profile-light" width={25} height={25} />
              User Profile
            </button>
          </Link>
          <div className="navbar-mode">
            <h3>Dark Mode</h3>
            <label className="switch-navbar">
              <input type="checkbox" checked={isDarkMode} onChange={handleSliderChange} />
              <span className="slider round"></span>
            </label>
          </div>
          <Link className="navbar-signout">
            <button onClick={toggleLogout}>
              <Icon icon="material-symbols:logout" width={25} height={25} />
              Sign Out
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
