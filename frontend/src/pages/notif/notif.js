import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./notif.css";
import Sidebar from "../../component/Leftbar/Leftbar";
import Rightbar from "../../component/rightbar/Rightbar";
import HomeProfile from "../../component/home-profile/home-profile.js";
import Settings from "../../component/Settings/Settings";
import Logout from "../../component/Logout/Logout";
import Navbar from "../../component/navbar/navbar.js";
import { Icon } from "@iconify/react";
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
  const [notif, masukNotif] = useState([]);
  const [notificationsReaded, setNotificationReaded] = useState([]);
  const [notificationsUnReaded, setNotificationUnReaded] = useState([]);
  const [user, setUser] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const [isShowRightBar, setIsShowRightBar] = useState(true);
  const [isUploadVisible, setIsUploadVisible] = useState(false);
  const navigate = useNavigate();

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const isNotifPage = true;

  useEffect(() => {
    const fetchNotif = async () => {
      try {
        const res = await makeRequest(`notif?own=${currentUser._id}`, "GET");
        res.sort((n1, n2) => new Date(n2.createdAt) - new Date(n1.createdAt));
        setNotification(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotif();
  }, [currentUser]);

  useEffect(() => {
    const fetchNotifRead = async () => {
      try {
        const res = await makeRequest(`notif?own=${currentUser._id}&read=true`, "GET");
        res.sort((n1, n2) => new Date(n2.createdAt) - new Date(n1.createdAt));
        setNotificationReaded(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotifRead();
  }, [currentUser]);

  useEffect(() => {
    const fetchNotifUnRead = async () => {
      try {
        const res = await makeRequest(`notif?own=${currentUser._id}&read=false`, "GET");
        res.sort((n1, n2) => new Date(n2.createdAt) - new Date(n1.createdAt));
        setNotificationUnReaded(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotifUnRead();
  }, [currentUser]);

  const markAsRead = async () => {
    try {
      await makeRequest(`notif/read`, "PUT", { userId: currentUser._id });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const usersPromises = notification.map(async (notif) => {
          if (notif.userId) {
            const url = `users?userId=${notif.userId}`;
            const res = await makeRequest(url);
            return res;
          }
          return null;
        });
        const users = await Promise.all(usersPromises);
        const filteredUsers = users.filter((user) => user !== null);
        filteredUsers.map((a) => {
          setUser(a);
        });
      } catch (err) {
        console.error("Error:", err.message);
      }
    };
    fetchUser();
  }, [notification]);

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

  const toggleUpload = () => {
    navigate("/", { state: { updateUploadVisibility: !isUploadVisible } });
    setIsUploadVisible(!isUploadVisible);
  };
  useEffect(() => {
    setIsUploadVisible(!isUploadVisible);
  }, [navigate]);

  return (
    <div className={isDarkMode ? "dark-mode" : "app"}>
      <div className={isShowRightBar ? "main-notif" : "main-notif-norightbar"}>
        <h1>Notifications</h1>
        <button className={isShowRightBar ? "mark-read-button" : "mark-read-button-norightbar"} onClick={markAsRead}>
          {isShowRightBar && <Icon icon="solar:check-read-linear" width={30} height={30} />}Mark all as read
        </button>
        <div className="notif-container">
          <div className={isShowRightBar ? "notif-border" : "notif-border-norightbar"}>
            <div className="notif-buttons">
              <button onClick={toggleAll} className={showAll ? "bold-button" : "all-button"}>
                All
              </button>
              <button onClick={toggleMentions} className={showMentions ? "bold-button" : "mentions-button"}>
                Readed
              </button>
              <button onClick={toggleUnread} className={showUnread ? "bold-button" : "unread-button"}>
                Unread
              </button>
            </div>
          </div>
          <div className={isShowRightBar ? "notif-content" : "notif-content-norightbar"}>
            {showAll && (
              <div className="all-notif-container">
                {notification.length === 0 ? (
                  <div className="notif-empty">
                    <Icon icon="simple-line-icons:check" width={35} height={35} />
                    <h2>You're all caught up!</h2>
                    <h2>You've seen all the Notificationsss.</h2>
                  </div>
                ) : (
                  notification.map((notification) => (
                    <div className="notif" key={notification.id}>
                      <span className="notif-date">{moment(notification.createdAt).fromNow()}</span>
                      <div className="notif-user">
                        <img className="notif-avatar" src={PF + user.profilePicture} alt={user.username} />
                        <div className="notif-text">
                          <p>
                            <strong>{user.displayname}</strong> {notification.type}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
            {showMentions && (
              <div className="mentions-notif-container">
                {notificationsReaded.length === 0 ? (
                  <div className="notif-empty">
                    <Icon icon="simple-line-icons:check" width={35} height={35} />
                    <h2>You're all caught up!</h2>
                    <h2>You've seen all the Notificationsss.</h2>
                  </div>
                ) : (
                  notificationsReaded.map((notification) => (
                    <div className="notif" key={notification.id}>
                      <span className="notif-date">{moment(notification.createdAt).fromNow()}</span>
                      <div className="notif-user">
                        <img className="notif-avatar" src={PF + user.profilePicture} alt={user.username} />
                        <div className="notif-text">
                          <p>
                            <strong>{user.displayname}</strong>
                            {notification.type && notification.type}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
            {showUnread && (
              <div className="unread-notif-container">
                {notificationsUnReaded.length === 0 ? (
                  <div className="notif-empty">
                    <Icon icon="simple-line-icons:check" width={35} height={35} />
                    <h2>You're all caught up!</h2>
                    <h2>You've seen all the Notificationsss.</h2>
                  </div>
                ) : (
                  notificationsUnReaded.map((notification) => (
                    <div className="notif" key={notification.id}>
                      <span className="notif-date">{moment(notification.createdAt).fromNow()}</span>
                      <div className="notif-user">
                        <img className="notif-avatar" src={PF + user.profilePicture} alt={user.username} />
                        <div className="notif-text">
                          <p>
                            <strong>{user.displayname}</strong> {notification.type}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
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
      {!isShowRightBar && (
        <div className="home-navbar">
          <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} toggleLogout={toggleLogout} />
        </div>
      )}
      <Sidebar
        isDarkMode={isDarkMode}
        toggleUpload={toggleUpload}
        toggleSettings={toggleSettings}
        toggleLogout={toggleLogout}
        isNotifPage={isNotifPage}
        isShowRightBar={isShowRightBar}
        setIsShowRightBar={setIsShowRightBar}
      />
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
