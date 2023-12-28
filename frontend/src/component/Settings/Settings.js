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
    const newIsShowRightBar = !isShowRightBar;
    setIsShowRightBar(newIsShowRightBar);
    localStorage.setItem("isShowRightBar", JSON.stringify(newIsShowRightBar));
  };

  useEffect(() => {
    setIsShowRightBar(isShowRightBar);
  }, [isShowRightBar]);

  return (
    <div className="settings-popup">
      <div className="settings-title">
        <h2>Settings</h2>
        <button onClick={onClose}>
          <Icon icon="ph:x-bold" width={25} height={25} />
        </button>
      </div>
      <div className="settings-content">
        {isShowRightBar && (
          <div className="settings-mode">
            <h3>Dark Mode</h3>
            <label className="switch">
              <input type="checkbox" checked={isDarkMode} onChange={handleSliderChange} />
              <span className="slider round"></span>
            </label>
          </div>
        )}
        <div className="settings-mode">
          <h3>Show Rightbar</h3>
          <label className="switch">
            <input type="checkbox" checked={isShowRightBar} onChange={handleRightBarToggle} />
            <span className="slider round"></span>
          </label>
        </div>
        <Link to={`/profile/${user.username}`}>
          <button>Edit Profile</button>
        </Link>
      </div>
    </div>
  );
};

export default Settings;
