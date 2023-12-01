import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext.js";
import { Icon } from "@iconify/react";
import "./FriendsList.css";
import { useParams } from "react-router";
import Sidebar from "../../component/Leftbar/Leftbar";
import HomeProfile from "../home-profile/home-profile.js";
import Rightbar from "../rightbar/Rightbar.js";
import Settings from "../../component/Settings/Settings";
import Logout from "../../component/Logout/Logout";
import { makeRequest } from "../../fetch.js";
import { useLocation, Link } from "react-router-dom";

import defaultprofile from "../../assets/profile/default_avatar.png";
import defaultcover from "../../assets/profile/default_banner.jpg";

const FriendList = () => {
  const { user: currentUser } = useContext(AuthContext);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState({});
  const [id, setId] = useState({});
  const [friends, setFriends] = useState([]);
  const username = useParams().username;
  const [settingOpen, setSettingOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const isFriendListPage = true;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [popupPosition, setPopupPosition] = useState({
    visible: false,
    top: 0,
    left: 0,
  });

  useEffect(() => {
    const getFriends = async () => {
      try {
        const id = await makeRequest(`users?username=${username}`, "GET");
        const friendList = await makeRequest(`relationships/friends/followers/${id._id}`, "GET");
        setFriends(friendList);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

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
  return (
    <div className="friendlist-main">
      <div className="friendlist-container">
        <div className="friendlist-header">
          <Link to={`/profile/${username}`}>
            <button className="button-info">
              <Icon icon="ic:round-arrow-back" width={35} height={35} />
            </button>
          </Link>
          <h2 style={{ flex: 1 }}>{user && user.displayname} Follower's</h2>
        </div>
        <div className="friendlist">
          {friends && friends.length === 0 ? (
            <span className="friendlist-empty">Didn't follow anyone yet.</span>
          ) : friends && friends.length > 0 ? (
            friends &&
            friends.map((friend) => (
              <div className="friend" key={friend.userId}>
                <Link
                  to={`/profile/${friend.userid}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  className="profileavatar"
                >
                  <img
                    className="friend-cover"
                    src={
                      friend && friend.coverPicture
                        ? PF + friend.coverPicture
                        : defaultcover
                    }
                    alt={friend.displayname}
                  />
                  <div>
                    <img
                      src={
                        friend && friend.profilePicture
                          ? PF + friend.profilePicture
                          : defaultprofile
                      }
                      alt={friend.displayname}
                      className="friend-avatar"
                    />
                  </div>
                </Link>
                <div className="friend-info-container">
                  <div className="friend-info-details">
                    <h3>{friend.displayname}</h3>
                    <div className="friend-follower">
                      <h3>{friend.followings.length}</h3>
                      <h4>Following</h4>
                      <h3>{friend.followers.length}</h3>
                      <h4>Followers</h4>
                    </div>
                  </div>
                  <button className="button-popup">
                    <Icon icon="tabler:dots" width={20} height={20} />
                  </button>
                </div>
                <div className="friend-desc">
                  <p>{friend.desc}</p>
                </div>
              </div>
            ))
          ) : (
            "Loading"
          )}
        </div>
        {popupPosition.visible && (
          <div
            className="popup"
            style={{
              top: `${popupPosition.top}px`,
              left: `${popupPosition.left}px`,
            }}
          >
            <button className="icon-button">
              <Icon icon="heroicons-solid:chat" width={25} height={25} />
              Messages
            </button>
            <button className="icon-button">
              <Icon icon="bi:person-dash-fill" width={20} height={20} />
              Unfriend
            </button>
            <button className="icon-button" style={{ color: "red" }}>
              <Icon icon="bi:person-x-fill" width={20} height={20} />
              Block
            </button>
          </div>
        )}
      </div>
      <Sidebar
        toggleSettings={toggleSettings}
        toggleLogout={toggleLogout}
        isFriendListPage={isFriendListPage}
      />
      <div className="side-content">
        <HomeProfile />
        <Rightbar />
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
    </div>
  );
};

export default FriendList;
