import React, { useState, useEffect, useContext } from "react";
import "./Settings.css";
import "../../DarkMode.css";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext.js";
import { useNavigate } from "react-router-dom";

import Navbar from "../navbar/navbar.js";
import Sidebar from "../Leftbar/Leftbar.js";
import Logout from "../Logout/Logout.js";

const SettingsPages = () => {
  const { user } = useContext(AuthContext);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isShowRightBar, setIsShowRightBar] = useState(false);
  const [isUploadVisible, setIsUploadVisible] = useState(false);
  const navigate = useNavigate();

  const isSettingsPage = true;

  const handleSliderChange = () => {
    toggleDarkMode();
  };

  const toggleLogout = () => {
    setLogoutOpen(!logoutOpen);
  };

  useEffect(() => {
    const storedDarkModeStatus = localStorage.getItem("isDarkMode") === "true";
    setIsDarkMode(storedDarkModeStatus);
    setDarkMode(storedDarkModeStatus);
  }, []);

  const setDarkMode = (isDarkMode) => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  };

  const toggleDarkMode = () => {
    const newDarkModeStatus = !isDarkMode;
    setIsDarkMode(newDarkModeStatus);
    localStorage.setItem("isDarkMode", newDarkModeStatus.toString());
    setDarkMode(newDarkModeStatus);
  };

  useEffect(() => {
    const storedDarkModeStatus = localStorage.getItem("isDarkMode") === "true";
    setIsDarkMode(storedDarkModeStatus);
    setDarkMode(storedDarkModeStatus);

    const storedIsShowRightBar = localStorage.getItem("isShowRightBar");
    if (storedIsShowRightBar !== null) {
      setIsShowRightBar(JSON.parse(storedIsShowRightBar));
    }
  }, []);

  const handleRightBarToggle = () => {
    const newIsShowRightBar = !isShowRightBar;
    setIsShowRightBar(newIsShowRightBar);
    localStorage.setItem("isShowRightBar", JSON.stringify(newIsShowRightBar));
    if (newIsShowRightBar) {
      navigate("/");
    }
  };

  useEffect(() => {
    setIsShowRightBar(isShowRightBar);
  }, [isShowRightBar]);

  const toggleUpload = () => {
    navigate("/", { state: { updateUploadVisibility: !isUploadVisible } });
    setIsUploadVisible(!isUploadVisible);
  };
  useEffect(() => {
    setIsUploadVisible(!isUploadVisible);
  }, [navigate]);

  return (
    <div className={isDarkMode ? "dark-mode" : "app"}>
      <div className="settings-pages">
        {!isShowRightBar && (
          <div className="home-navbar">
            <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} toggleLogout={toggleLogout} />
          </div>
        )}
        <Sidebar
          isSettingsPage={isSettingsPage}
          toggleUpload={toggleUpload}
          isDarkMode={isDarkMode}
          toggleLogout={toggleLogout}
          isShowRightBar={isShowRightBar}
          setIsShowRightBar={setIsShowRightBar}
        />
        <div className="settingspage-title">
          <h2>Settings</h2>
        </div>
        <div className="settingspage-content">
          <div className="settingspage-mode">
            <Icon icon="mingcute:layout-rightbar-close-fill" width={25} height={25} />
            <h3>Show Rightbar</h3>
            <label className="switch-norightbar">
              <input type="checkbox" checked={isShowRightBar} onChange={handleRightBarToggle} />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="link-settings-container">
            <div className="button-link-settings">
              <Icon icon="ant-design:safety-outlined" width={25} height={25} />
              Privacy and Safety
            </div>
            <Link className="link-settings" to="/other">
              <Icon icon="icon-park-outline:right" width={25} height={25} />
            </Link>
          </div>
          <div className="link-settings-container">
            <div className="button-link-settings">
              <Icon icon="bxs:edit" width={25} height={25} />
              Edit Profile
            </div>
            <Link className="link-settings" to={`/profile/${user.username}`}>
              <Icon icon="icon-park-outline:right" width={25} height={25} />
            </Link>
          </div>
          <div className="logout-settings-container">
            <button onClick={toggleLogout}>
              <Icon icon="tabler:logout" width="30" height="30" />
              Log out
            </button>
          </div>
        </div>
      </div>
      {logoutOpen && (
        <>
          <div className="popup-logout-container" />
          <div className="popup-logout">
            <Logout onClose={toggleLogout} />
          </div>
        </>
      )}
    </div>
  );
};

export default SettingsPages;
