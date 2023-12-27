import React, { useContext, useEffect, useState } from "react";
import "./Leftbar.css";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";

import logo from "../../assets/Logo_BNW.jpg";
import logopng from "../../assets/Logo_BNW.png";
import logopnghitam from "../../assets/Logo_BNW_black.png";

const Sidebar = ({
  toggleSettings,
  toggleLogout,
  isHomePage,
  isMessagesPage,
  isNotifPage,
  isConnectPage,
  isProfilePage,
  isSettingsPage,
  isShowRightBar,
  setIsShowRightBar,
  isDarkMode,
  toggleUpload,
}) => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const storedIsShowRightBar = localStorage.getItem("isShowRightBar");
    if (storedIsShowRightBar !== null) {
      setIsShowRightBar(JSON.parse(storedIsShowRightBar), () => {});
    }
  }, [setIsShowRightBar]);

  return (
    <div className={`sidebar ${isShowRightBar ? "show-right-bar" : "hide-right-bar"}`}>
      {isShowRightBar ? (
        <div className="content-sidebar">
          <Link to="/other">{isDarkMode ? <img className="sidebar-logo" src={logopng} alt="BNW logo" /> : <img className="sidebar-logo" src={logopnghitam} alt="BNW logo" />}</Link>
          <Link to="/">
            <button>{isHomePage ? <Icon icon="mingcute:home-4-fill" width="35" height="35" /> : <Icon icon="mingcute:home-4-line" width="35" height="35" />} </button>
          </Link>
          <Link to="/notif">
            <button>{isNotifPage ? <Icon icon="mdi:bell" width="35" height="35" /> : <Icon icon="mdi:bell-outline" width="35" height="35" />}</button>
          </Link>
          <Link to="/messages">
            <button>{isMessagesPage ? <Icon icon="bxs:chat" width="35" height="35" /> : <Icon icon="bx:chat" width="35" height="35" />}</button>
          </Link>
          {!isShowRightBar && (
            <Link to={`/profile/${user.username}`}>
              <button>{isProfilePage ? <Icon icon="iconamoon:profile-fill" width="35" height="35" /> : <Icon icon="iconamoon:profile" width="35" height="35" />}</button>
            </Link>
          )}
          <Link to="/connect">
            <button>{isConnectPage ? <Icon icon="mingcute:link-fill" width="35" height="35" rotate={1} /> : <Icon icon="mingcute:link-line" width="35" height="35" rotate={1} />}</button>
          </Link>
          <button onClick={toggleSettings}>
            <Icon icon="solar:settings-outline" width="35" height="35" />
          </button>
          <button onClick={toggleLogout}>
            <Icon icon="tabler:logout" width="35" height="35" />
          </button>
        </div>
      ) : (
        <div className="content-sidebar-rightbar">
          <Link to="/" className="nav-link">
            <button className="nav-button">{isHomePage ? <Icon icon="mingcute:home-4-fill" width="35" height="35" /> : <Icon icon="mingcute:home-4-line" width="35" height="35" />} </button>
            <span className={isHomePage ? "nav-bold-text" : "nav-text"}>Homepage</span>
          </Link>
          <Link to="/notif" className="nav-link">
            <button className="nav-button">{isNotifPage ? <Icon icon="mdi:bell" width="35" height="35" /> : <Icon icon="mdi:bell-outline" width="35" height="35" />}</button>
            <span className={isNotifPage ? "nav-bold-text" : "nav-text"}>Notification</span>
          </Link>
          <Link to="/messages" className="nav-link">
            <button className="nav-button">{isMessagesPage ? <Icon icon="bxs:chat" width="35" height="35" /> : <Icon icon="bx:chat" width="35" height="35" />}</button>
            <span className={isMessagesPage ? "nav-bold-text" : "nav-text"}>Messages</span>
          </Link>
          {!isShowRightBar && (
            <Link to={`/profile/${user.username}`} className="nav-link">
              <button className="nav-button">{isProfilePage ? <Icon icon="iconamoon:profile-fill" width="35" height="35" /> : <Icon icon="iconamoon:profile" width="35" height="35" />}</button>
              <span className={isProfilePage ? "nav-bold-text" : "nav-text"}>Profile</span>
            </Link>
          )}
          <Link to="/connect" className="nav-link">
            <button className="nav-button">
              {isConnectPage ? <Icon icon="mingcute:link-fill" width="35" height="35" rotate={1} /> : <Icon icon="mingcute:link-line" width="35" height="35" rotate={1} />}
            </button>
            <span className={isConnectPage ? "nav-bold-text" : "nav-text"}>Connect</span>
          </Link>
          <Link to="/settings" className="nav-link">
            <button onClick={toggleSettings} className="nav-button">
              {isSettingsPage ? <Icon icon="solar:settings-bold" width="35" height="35" /> : <Icon icon="solar:settings-outline" width="35" height="35" />}
              <span className={isSettingsPage ? "nav-bold-text" : "nav-text"}>Settings</span>
            </button>
          </Link>
          <button className="nav-button-post" onClick={toggleUpload}>
            <Icon icon="gridicons:create" width="35" height="35" />
            <span className="">Create Post</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
