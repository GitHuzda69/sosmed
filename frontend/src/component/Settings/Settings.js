import React, { useState, useEffect } from "react";
import "./Settings.css";
import "../../DarkMode.css";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Settings = ({ onClose, isDarkMode, toggleDarkMode }) => {
  const handleSliderChange = () => {
    toggleDarkMode();
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
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={handleSliderChange}
            />
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
        <Link to="/update">
          <button>Edit Profile</button>
        </Link>
      </div>
    </div>
  );
};

export default Settings;
