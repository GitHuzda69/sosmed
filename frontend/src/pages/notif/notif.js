import React, { useState, useRef, useEffect, useContext } from "react";
import "./notif.css";
import Sidebar from "../../component/Leftbar/Leftbar";
import Rightbar from "../../component/rightbar/Rightbar";
import HomeProfile from "../../component/home-profile/home-profile.js";
import Settings from "../../component/Settings/Settings";
import Logout from "../../component/Logout/Logout";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { io } from "socket.io-client";

import AuthContext from "../../context/authContext.js";
import { makeRequest } from "../../fetch.js";
import moment from "moment";

function Notif() {
  const [settingOpen, setSettingOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [showMentions, setShowMentions] = useState(false);
  const [showUnread, setShowUnread] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notification, setNotification] = useState([]);
  const [notifSocket, setNotifSocket] = useState([]);
  const [notificationsReaded, setNotificationReaded] = useState([]);
  const [notificationsUnReaded, setNotificationUnReaded] = useState([]);
  const [user, setUser] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const [isShowRightBar, setIsShowRightBar] = useState(true);

  const isNotifPage = true;

  //SOCKET IO
  const socket = io("http://localhost:8900");

  useEffect(() => {
    socket.on("getUsers", (users) => {});
  }, [currentUser]);

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifSocket((prev) => [...prev, data]);
    });
  }, [socket]);

  useEffect(() => {
    const fetchNotif = async () => {
      try {
        const res = await makeRequest(`notif?own=${currentUser._id}`, "GET");
        setNotification(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotif();
  }, []);

  useEffect(() => {
    const fetchNotifRead = async () => {
      try {
        const res = await makeRequest(`notif?own=${currentUser._id}&read=true`, "GET");
        setNotificationReaded(res);
      } catch (err) {
        console.error(err);
      }
      fetchNotifRead();
    };
  }, []);

  useEffect(() => {
    const fetchNotifUnRead = async () => {
      try {
        const res = await makeRequest(`notif?own=${currentUser._id}&read=false`, "GET");
        setNotificationUnReaded(res);
      } catch (err) {
        console.error(err);
      }
      fetchNotifUnRead();
    };
  }, []);

  const notif = notification.find((originalNotification) => {
    return originalNotification;
  });
  useEffect(() => {
    const fetchUser = async () => {
      if (notif && notif.userId) {
        const url = `users?userId=${notif.userId}`;
        try {
          const res = await makeRequest(url);
          setUser(res);
        } catch (err) {
          console.error("Error:", err.message);
        }
      } else {
        console.error("Notification or userId is undefined");
      }
    };
    if (notif) {
      fetchUser();
    }
  }, [notif]);

  console.log(notifSocket);

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
    <div className={`app ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="main-notif">
        <h1>Notifications</h1>
        <button className="mark-read-button">
          <Icon icon="solar:check-read-linear" width={30} height={30} />
          Mark all as read
        </button>
        <div className="notif-container">
          <div className="notif-border">
            <div className="notif-buttons">
              <button onClick={toggleAll} className={`all-button ${showAll ? "bold-button" : ""}`}>
                All
              </button>
              <button onClick={toggleMentions} className={`mentions-button ${showMentions ? "bold-button" : ""}`}>
                Readed
              </button>
              <button onClick={toggleUnread} className={`unread-button ${showUnread ? "bold-button" : ""}`}>
                Unread
              </button>
            </div>
          </div>
          <div className="notif-content">
            {showAll && (
              <div className="all-notif-container">
                {notification.length === 0
                  ? "There no notification"
                  : notification.map((notification) => (
                      <div className="notif" key={notification.id}>
                        <span className="notif-date">{moment(notification.createdAt).fromNow()}</span>
                        <div className="notif-user">
                          <img className="notif-avatar" src={user.profilePicture} alt={user.username} />
                          <div className="notif-text">
                            <p>
                              <strong>{user.displayname}</strong> {notification.type}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            )}
            {showMentions && (
              <div className="mentions-notif-container">
                {notificationsReaded.length === 0
                  ? "There no notification has read yet"
                  : notificationsReaded.map((notification) => (
                      <div className="notif" key={notification.id}>
                        <span className="notif-date">{moment(notification.createdAt).fromNow()}</span>
                        <div className="notif-user">
                          <img className="notif-avatar" src={user.profilePicture} alt={user.username} />
                          <div className="notif-text">
                            <p>
                              <strong>{user.displayname}</strong>
                              {notification.type && notification.type}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            )}
            {showUnread && (
              <div className="unread-notif-container">
                {notificationsUnReaded.length === 0
                  ? "There no notification has unread"
                  : notificationsUnReaded.map((notification) => (
                      <div className="notif" key={notification.id}>
                        <span className="notif-date">{moment(notification.createdAt).fromNow()}</span>
                        <div className="notif-user">
                          <img className="notif-avatar" src={user.profilePicture} alt={user.username} />
                          <div className="notif-text">
                            <p>
                              <strong>{user.displayname}</strong> {notification.type}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {isShowRightBar && (
        <div className="side-content">
          <HomeProfile />
          <Rightbar />
        </div>
      )}
      <Sidebar toggleSettings={toggleSettings} toggleLogout={toggleLogout} isNotifPage={isNotifPage} />
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
    </div>
  );
}

export default Notif;
