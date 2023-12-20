import React, { useState, useRef, useEffect, useContext } from "react";
import profilimage from "../../assets/profil.jpg";
import "./notif.css";
import Sidebar from "../../component/Leftbar/Leftbar";
import Rightbar from "../../component/rightbar/Rightbar";
import HomeProfile from "../../component/home-profile/home-profile.js";
import Settings from "../../component/Settings/Settings";
import Logout from "../../component/Logout/Logout";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { io } from "socket.io-client";

import avatar1 from "../../assets/friend/friend1.jpg";
import avatar2 from "../../assets/friend/friend2.jpg";
import avatar3 from "../../assets/friend/friend3.jpg";
import avatar4 from "../../assets/friend/friend4.jpg";
import avatar5 from "../../assets/friend/friend5.jpeg";
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
  const [notifications, setNotifications] = useState([]);
  const [notificationsReaded, setNotificationReaded] = useState([]);
  const [notificationsUnReaded, setNotificationUnReaded] = useState([]);
  const [user, setUser] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const isNotifPage = true;

  //SOCKET IO
  const socket = useRef();
  socket.current = io("ws://localhost:8900");

  useEffect(() => {
    socket.current.emit("addUser", currentUser._id);
    socket.current.on("getUsers", (users) => {});
  }, [currentUser]);

  useEffect(() => {
    socket.current.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  useEffect(() => {
    const fetchNotif = async () => {
      try {
        const res = await makeRequest(`notif?own=${currentUser._id}`, "GET");
        console.log(res);
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
        const res = await makeRequest(`notif/read?own=${currentUser._id}&read=${true}`, "GET");
        setNotificationReaded(res);
      } catch (err) {
        console.error(err);
      }
      fetchNotifRead();
    };
  }, [notifications]);

  useEffect(() => {
    const fetchNotifUnRead = async () => {
      try {
        const res = await makeRequest(`notif/read?own=${currentUser._id}&read=${false}`, "GET");
        setNotificationUnReaded(res);
      } catch (err) {
        console.error(err);
      }
      fetchNotifUnRead();
    };
  }, [notifications]);

  const notif = notification.map((notification) => ({ ...notification }));

  useEffect(() => {
    // Check if notif is an array and has at least one element
    if (Array.isArray(notif) && notif.length > 0) {
      const fetchUser = async () => {
        const url = `users?userId=${notif[notif.length - 1].userId}`; // Assuming userId is in the first notification
        try {
          const res = await makeRequest(url);
          setUser(res);
        } catch (err) {
          console.error("Error:", err.message);
        }
      };
      fetchUser();
    }
  }, [notif]);

  console.log(notifications);
  console.log(notification);

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
                Mentions
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
                              <strong>{user.displayname}</strong> {notification.type}
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
      <div className="side-content">
        <HomeProfile />
        <Rightbar />
      </div>
      <Sidebar toggleSettings={toggleSettings} toggleLogout={toggleLogout} isNotifPage={isNotifPage} />
      {settingOpen && (
        <>
          <div className="settings-overlay" />
          <div className="settings-container">
            <Settings onClose={toggleSettings} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
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
