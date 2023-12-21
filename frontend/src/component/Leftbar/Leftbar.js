import React, { useState, useContext, useEffect } from "react";
import "./Leftbar.css";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";
import Settings from "../Settings/Settings";

import defaultprofile from "../../assets/profile/default_avatar.png";
import logo from "../../assets/Logo_BNW.jpg";

const Sidebar = ({ toggleSettings, toggleLogout, isFriendListPage, isHomePage, isMessagesPage, isNotifPage, isConnectPage, isProfilePage }) => {
  const { currentUser } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const [isShowRightBar, setIsShowRightBar] = useState(true);

  useEffect(() => {
    const storedIsShowRightBar = localStorage.getItem("isShowRightBar");
    if (storedIsShowRightBar !== null) {
      setIsShowRightBar(JSON.parse(storedIsShowRightBar), () => {});
    }
  }, []);

  return (
    <div className={`sidebar ${isShowRightBar ? "hide-right-bar" : "show-right-bar"}`}>
      {isShowRightBar ? (
        <div className="content-sidebar">
          <img className="sidebar-logo" src={logo} alt="BNW logo" />
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
            <button className="nav-button">{isConnectPage ? <Icon icon="mingcute:link-fill" width="35" height="35" rotate={1} /> : <Icon icon="mingcute:link-line" width="35" height="35" rotate={1} />}</button>
            <span className={isConnectPage ? "nav-bold-text" : "nav-text"}>Connect</span>
          </Link>
          <button onClick={toggleSettings} className="nav-button">
            <Icon icon="solar:settings-outline" width="35" height="35" />
            <span className={isNotifPage ? "nav-bold-text" : "nav-text"}>Settings</span>
          </button>
          <button onClick={toggleLogout} className="nav-button">
            <Icon icon="tabler:logout" width="35" height="35" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
