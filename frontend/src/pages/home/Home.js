import React, { useState, useEffect } from "react";
import Sidebar from "../../component/Leftbar/Leftbar.js";
import Rightbar from "../../component/rightbar/Rightbar.js";
import SearchBar from "../../component/search/Search";
import Settings from "../../component/Settings/Settings.js";
import "./Home.css";
import "../../component/Settings/Settings.css";
import "../../component/Logout/Logout.css";
import Posts from "../../component/posts/Posts";
import Upload from "../../component/Upload/Upload.js";
import Logout from "../../component/Logout/Logout.js";
import FypSwitch from "../../component/fyp-button/fyp-switch.js";
import HomeProfile from "../../component/home-profile/home-profile.js";

function Home() {
  const [settingOpen, setSettingOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSideContent, setShowSideContent] = useState(true);
  const [mainContentMaxWidth, setMainContentMaxWidth] = useState("100%");

  const isHomePage = true;

  const toggleSettings = () => {
    setSettingOpen(!settingOpen);
  };

  const toggleLogout = () => {
    setLogoutOpen(!logoutOpen);
  };

  useEffect(() => {
    const storedDarkModeStatus = localStorage.getItem("isDarkMode") === "true";
    setIsDarkMode(storedDarkModeStatus);
    setDarkMode(storedDarkModeStatus);

    const handleZoomChange = () => {
      if (window.devicePixelRatio >= 1.5) {
        setShowSideContent(false);
        setMainContentMaxWidth("100%");
      } else {
        setShowSideContent(true);
        setMainContentMaxWidth("calc(100% - 360px)");
      }
    };
    window.addEventListener("resize", handleZoomChange);
    handleZoomChange();
    return () => {
      window.removeEventListener("resize", handleZoomChange);
    };
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

  return (
    <>
      <div className={`app ${isDarkMode ? "dark-mode" : ""}`}>
        <div className="main-content" style={{ maxWidth: mainContentMaxWidth }}>
          <div className="topbar">
            <FypSwitch />
            <SearchBar />
          </div>
          <div className="home-content">
            <Upload />
            <Posts />
          </div>
        </div>
        {showSideContent && (
          <div className="side-content">
            <HomeProfile />
            <Rightbar />
          </div>
        )}
        <div className="leftbar">
          <Sidebar
            toggleSettings={toggleSettings}
            toggleLogout={toggleLogout}
            isHomePage={isHomePage}
          />
        </div>
      </div>
      {settingOpen && (
        <>
          <div className="settings-overlay" />
          <div className="settings-container">
            <Settings
              onClose={toggleSettings}
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          </div>
        </>
      )}
      {logoutOpen && (
        <>
          <div className="popup-logout-container" />
          <div className="popup-logout">
            <Logout onClose={toggleLogout} />
          </div>
        </>
      )}
    </>
  );
}

export default Home;
