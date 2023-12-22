import React, { useState, useEffect, useContext } from "react";
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
import AuthContext from "../../context/authContext.js";
import { io } from "socket.io-client";

function Home() {
  const [settingOpen, setSettingOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isShowRightBar, setIsShowRightBar] = useState(true);
  const isHomePage = true;

  const { user } = useContext(AuthContext);

  const socket = io("http://localhost:8900");

  useEffect(() => {
    socket.emit("addUser", user?._id);
  }, [socket, user]);

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
      <div className={`app ${isDarkMode ? "dark-mode" : ""}`}>
        <div className={`main-content ${!isShowRightBar ? "no-right-bar" : ""}`}>
          {!isShowRightBar && (
            <div className="home-navbar">
              <Navbar />
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
            <Posts isHome={true} socket={socket} />
          </div>
          {isShowRightBar && (
            <div className="side-content">
              <HomeProfile />
              <Rightbar socket={socket} />
            </div>
          )}
        </div>
        <div className="leftbar">
          <Sidebar toggleSettings={toggleSettings} toggleLogout={toggleLogout} isHomePage={isHomePage} />
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
