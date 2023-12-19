import React, { useState, useContext } from "react";
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

  return (
    <div className="sidebar">
      <div className="content-sidebar">
        <img className="sidebar-logo" src={logo} alt="BNW logo" />
        {isHomePage ? (
          <Link to="/">
            <button className="home-button">
              <Icon icon="mingcute:home-4-fill" width="35" height="35" />
            </button>
          </Link>
        ) : (
          <Link to="/">
            <button className="home-button">
              <Icon icon="mingcute:home-4-line" width="35" height="35" />
            </button>
          </Link>
        )}
        {isNotifPage ? (
          <Link to="/notif">
            <button className="notif-button">
              <Icon icon="mdi:bell" width="35" height="35" />
            </button>
          </Link>
        ) : (
          <Link to="/notif">
            <button className="notif-button">
              <Icon icon="mdi:bell-outline" width="35" height="35" />
            </button>
          </Link>
        )}
        {isMessagesPage ? (
          <Link to="/messages">
            <button className="messages-button">
              <Icon icon="bxs:chat" width="35" height="35" />
            </button>
          </Link>
        ) : (
          <Link to="/messages">
            <button className="messages-button">
              <Icon icon="bx:chat" width="35" height="35" />
            </button>
          </Link>
        )}
        {isProfilePage ? (
          <Link to={`/profile/${user.username}`}>
            <button className="messages-button">
              <Icon icon="iconamoon:profile-bold" width="35" height="35" />
            </button>
          </Link>
        ) : (
          <Link to={`/profile/${user.username}`}>
            <button className="messages-button">
              <Icon icon="iconamoon:profile-fill" width="35" height="35" />
            </button>
          </Link>
        )}
        {isConnectPage ? (
          <button className="messages-button">
            <Icon icon="carbon:link" width="35" height="35" />
          </button>
        ) : (
          <button className="messages-button">
            <Icon icon="carbon:link" width="35" height="35" />
          </button>
        )}
        <button onClick={toggleSettings}>
          <Icon icon="solar:settings-outline" width="35" height="35" />
        </button>
        <button onClick={toggleLogout}>
          <Icon icon="tabler:logout" width="35" height="35" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
