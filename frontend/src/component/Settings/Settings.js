import React, { useState } from "react";
import "./Settings.css";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Settings = ({ onClose, userdata }) => {
  const [isSliderOn, setIsSliderOn] = useState(false);

  const handleSliderChange = () => {
    setIsSliderOn(!isSliderOn);
  };
  return (
    <div className="settings-popup">
      <div className="settings-title">
        <h2>Settings</h2>
        <button onClick={onClose}>
          <Icon icon="ph:x-bold" color="black" width={25} height={25} />
        </button>
      </div>
      <div className="settings-content">
        <div className="settings-mode">
          <h3>Dark Mode</h3>
          <label className="switch">
            <input
              type="checkbox"
              checked={isSliderOn}
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
      </div>
    </div>
  );
};

export default Settings;
