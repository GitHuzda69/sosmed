import React, { useState, useEffect } from "react";
import Sidebar from "../../component/Leftbar/Leftbar.js";
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
import Rightbar from "../../component/rightbar/Rightbar.js";
import Navbar from "../../component/navbar/navbar.js";

function Home() {
  const [settingOpen, setSettingOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isShowRightBar, setIsShowRightBar] = useState(true);

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

  return (
    <>
      <div className={isDarkMode ? "dark-mode" : "app"}>
        <div className={`main-content ${!isShowRightBar ? "no-right-bar" : ""}`}>
          {!isShowRightBar && (
            <div className="home-navbar">
              <Navbar isHomePage={isHomePage} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} toggleLogout={toggleLogout} />
            </div>
          )}
          {isShowRightBar && (
            <div className="topbar">
              <FypSwitch />
              <SearchBar />
            </div>
          )}
          <div className="home-content">
            <Upload />
            <Posts isHome={true} />
          </div>
          {isShowRightBar && (
            <div className="side-content">
              <HomeProfile />
              <Rightbar />
            </div>
          )}
        </div>
        <div className="leftbar">
          <Sidebar isDarkMode={isDarkMode} toggleSettings={toggleSettings} toggleLogout={toggleLogout} isHomePage={isHomePage} isShowRightBar={isShowRightBar} setIsShowRightBar={setIsShowRightBar} />
        </div>
      </div>
      {settingOpen && (
        <>
          <div className="settings-overlay" />
          <div className="settings-container">
            <Settings onClose={toggleSettings} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} isShowRightBar={isShowRightBar} setIsShowRightBar={setIsShowRightBar} />
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
