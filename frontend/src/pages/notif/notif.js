import React, { useState, useRef, useEffect } from "react";
import profilimage from "../../assets/profil.jpg";
import "./notif.css";
import Sidebar from "../../component/Leftbar/Leftbar";
import Rightbar from "../../component/rightbar/Rightbar";
import HomeProfile from "../../component/home-profile/home-profile.js";
import Settings from "../../component/Settings/Settings";
import Logout from "../../component/Logout/Logout";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

import avatar1 from "../../assets/friend/friend1.jpg";
import avatar2 from "../../assets/friend/friend2.jpg";
import avatar3 from "../../assets/friend/friend3.jpg";
import avatar4 from "../../assets/friend/friend4.jpg";
import avatar5 from "../../assets/friend/friend5.jpeg";

function Notif() {
  const [settingOpen, setSettingOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [showMentions, setShowMentions] = useState(false);
  const [showUnread, setShowUnread] = useState(false);

  const isNotifPage = true;

  const notification = [
    {
      id: 1,
      name: "John Doe",
      notif: "Liked your post .",
      avatar: avatar4,
      date: "2 Hours Ago",
    },
    {
      id: 2,
      name: "Jennifer",
      notif: "Started follow you .",
      avatar: avatar3,
      date: "2 Hours Ago",
    },
    {
      id: 3,
      name: "Lala",
      notif: "Following you back .",
      avatar: avatar2,
      date: "2 Hours Ago",
    },
    {
      id: 4,
      name: "Johnny Doe",
      notif: "Mention you in a post .",
      avatar: avatar5,
      date: "2 Hours Ago",
    },
    {
      id: 5,
      name: "John Doel",
      notif:
        "Started follow you Lorem ipsum dolor sit amet, consectetur adipiscing elit  Nam in lorem sodales tellus semper pharetra. Mauris nec auctor elit, sed facilisis eros..",
      avatar: avatar1,
      date: "2 Hours Ago",
    },
    {
      id: 6,
      name: "Lala",
      notif: "Following you back .",
      avatar: avatar2,
      date: "2 Hours Ago",
    },
    {
      id: 7,
      name: "Johnny Doe",
      notif: "Mention you in a post .",
      avatar: avatar5,
      date: "2 Hours Ago",
    },
    {
      id: 8,
      name: "John Doel",
      notif:
        "Started follow you Lorem ipsum dolor sit amet, consectetur adipiscing elit  Nam in lorem sodales tellus semper pharetra. Mauris nec auctor elit, sed facilisis eros..",
      avatar: avatar1,
      date: "2 Hours Ago",
    },
  ];

  const toggleSettings = () => {
    setSettingOpen(!settingOpen);
  };

  const toggleLogout = () => {
    setLogoutOpen(!logoutOpen);
  };

  const toggleAll = () => {
    setShowAll(true);
    setShowMentions(false);
    setShowUnread(false);
  };

  const toggleMentions = () => {
    setShowAll(false);
    setShowMentions(true);
    setShowUnread(false);
  };

  const toggleUnread = () => {
    setShowAll(false);
    setShowMentions(false);
    setShowUnread(true);
  };

  return (
    <div className="main-notif">
      <h1>Notifications</h1>
      <button className="mark-read-button">
        <Icon icon="solar:check-read-linear" width={30} height={30} />
        Mark all as read
      </button>
      <div className="notif-container">
        <div className="notif-border">
          <div className="notif-buttons">
            <button
              onClick={toggleAll}
              className={`all-button ${showAll ? "bold-button" : ""}`}
            >
              All
            </button>
            <button
              onClick={toggleMentions}
              className={`mentions-button ${showMentions ? "bold-button" : ""}`}
            >
              Mentions
            </button>
            <button
              onClick={toggleUnread}
              className={`unread-button ${showUnread ? "bold-button" : ""}`}
            >
              Unread
            </button>
          </div>
        </div>
        <div className="notif-content">
          {showAll && (
            <div className="all-notif-container">
              {notification.map((notification) => (
                <div className="notif" key={notification.id}>
                  <span className="notif-date">{notification.date}</span>
                  <div className="notif-user">
                    <img
                      className="notif-avatar"
                      src={notification.avatar}
                      alt={notification.name}
                    />
                    <div className="notif-text">
                      <p>
                        <strong>{notification.name}</strong>{" "}
                        {notification.notif}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {showMentions && (
            <div className="mentions-notif-container">
              {notification.map((notification) => (
                <div className="notif" key={notification.id}>
                  <span className="notif-date">{notification.date}</span>
                  <div className="notif-user">
                    <img
                      className="notif-avatar"
                      src={notification.avatar}
                      alt={notification.name}
                    />
                    <div className="notif-text">
                      <p>
                        <strong>{notification.name}</strong>{" "}
                        {notification.notif}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {showUnread && (
            <div className="unread-notif-container">
              {notification.map((notification) => (
                <div className="notif" key={notification.id}>
                  <span className="notif-date">{notification.date}</span>
                  <div className="notif-user">
                    <img
                      className="notif-avatar"
                      src={notification.avatar}
                      alt={notification.name}
                    />
                    <div className="notif-text">
                      <p>
                        <strong>{notification.name}</strong>{" "}
                        {notification.notif}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <HomeProfile />
      <Rightbar />
      <Sidebar
        toggleSettings={toggleSettings}
        toggleLogout={toggleLogout}
        isNotifPage={isNotifPage}
      />
      {settingOpen && (
        <>
          <div className="settings-overlay" />
          <div className="settings-container">
            <Settings onClose={toggleSettings} />
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
    </div>
  );
}

export default Notif;
