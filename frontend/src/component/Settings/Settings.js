import React, { useState, useEffect, useContext } from "react";
import "./Settings.css";
import "../../DarkMode.css";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext.js";

const Settings = ({ onClose, isDarkMode, toggleDarkMode, isShowRightBar, setIsShowRightBar }) => {
  const { user } = useContext(AuthContext);

  const handleSliderChange = () => {
    toggleDarkMode();
  };

  const handleRightBarToggle = () => {
    setIsShowRightBar((prevIsShowRightBar) => !prevIsShowRightBar);
  };

  return (
    <div className="settings-popup">
      <div className="settings-title">
        <h2>Settings</h2>
        <button onClick={onClose}>
          <Icon icon="ph:x-bold" width={25} height={25} />
        </button>
      </div>
      <div className="settings-content">
        <div className="settings-mode">
          <h3>Dark Mode</h3>
          <label className="switch">
            <input type="checkbox" checked={isDarkMode} onChange={handleSliderChange} />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="settings-mode">
          <h3>Show Rightbar</h3>
          <label className="switch">
            <input type="checkbox" checked={isShowRightBar} onChange={handleRightBarToggle} />
            <span className="slider round"></span>
          </label>
        </div>
        <button>
          Connect to Instagram
          <Icon icon="bi:instagram" width="20" height="20" />
        </button>
        <button>
          Connect to Facebook
          <Icon icon="ic:baseline-facebook" width="23" height="23" />
        </button>
        <button style={{ marginTop: "0px" }}>
          Connect to Twitter
          <Icon icon="mdi:twitter" width="20" height="20" />
        </button>
        <Link to={`/profile/${user.username}`}>
          <button>Edit Profile</button>
        </Link>
      </div>
    </div>
  );
};

export default Settings;
