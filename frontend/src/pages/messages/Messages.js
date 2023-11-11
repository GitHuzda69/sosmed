import React, { useState, useRef, useEffect, useContext } from "react";
import "./Messages.css";
import Sidebar from "../../component/Leftbar/Leftbar";
import Settings from "../../component/Settings/Settings";
import Logout from "../../component/Logout/Logout";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";
import { AuthContext } from "../../context/authContext.js";
import { Icon } from "@iconify/react";
import moment from "moment";

import defaultprofile from "../../assets/profile/default_avatar.png";
import Chat from "../../component/Chat/Chat";

function Message() {
  const [settingOpen, setSettingOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState(null);
  const { user: currentUser } = useContext(AuthContext);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const friendid = conversations.map((friend) => ( friend.members ))
  console.log(friendid)
  const isMessagesPage = true;

  const toggleSettings = () => {
    setSettingOpen(!settingOpen);
  };

  const toggleLogout = () => {
    setLogoutOpen(!logoutOpen);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await makeRequest.get("/users?userId=" + friendid);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversations]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await makeRequest.get("/conversations/" + currentUser._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [currentUser._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await makeRequest.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

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
    <div className="main-messages">
      <div className="message-friend-container">
        <h1>Messages</h1>
        <div className="search-message-friend">
          <Icon
            icon="octicon:search-16"
            className="searchbar-message-friend-button"
            width="22"
            height="22"
          />
          <input
            className="input-search-friend"
            type="text"
            placeholder="Search on Messages"
          />
        </div>
        <div className="message-friend-bar">
          {conversations.map((friend) => (
                <button key={friend._id} onClick={() => setCurrentChat(friend)}>
                  <div className="message-friend">
                    <img
                      className="message-friend-avatar"
                      src={user &&
                        user.profilePicture
                          ? PF + user.profilePicture
                          : defaultprofile
                      }
                    />
                    <div className="message-friend-bio">
                      <h2>{user && user.displayname}</h2>
                      <h3>{user && user.desc}</h3>
                    </div>
                  </div>
                </button>
              ))}
        </div>
      </div>

      {currentChat ? (
        <div className="message-chat-container">
          <div className="chat-profile">
            <img
              className="chat-avatar"
              src={
                currentChat.profilePicture
                  ? PF + currentChat.profilePicture
                  : defaultprofile
              }
              alt={currentChat.displayname}
            />
            <div className="chat-status">
              <h2>{currentChat.displayname}</h2>
              <h3>{currentChat.desc}</h3>
            </div>
            <div className="chat-profile-button">
              <button>
                <Icon icon="octicon:search-16" width={25} height={25} />
              </button>
              <button>
                <Icon icon="clarity:pinned-solid" width={25} height={25} />
              </button>
              <button>
                <Icon
                  icon="solar:menu-dots-bold"
                  rotate={1}
                  width={25}
                  height={25}
                />
              </button>
            </div>
          </div>
          <div className="chat">
            <div className="chat-time">
              <h3>Today</h3>
            </div>
            {messages.map((m) => (
                  <div key={m.id} className="chat-other">
                    <h3>{m.displayname}</h3>
                    <h4>{m.desc}</h4>
                    <h5>{moment(m.createdat).fromNow()}</h5>
                  </div>
                ))}
          </div>
          <div className="chat-input">
            <textarea
              type="text"
              placeholder={`Tuliskan sesuatu `}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="chat-input-button">
              <button className="chat-button">
                <Icon icon="mdi:paperclip" width={25} height={25} />
              </button>
              <button className="chat-button">
                <Icon icon="fluent:gif-16-regular" width={25} height={25} />
              </button>
              <button className="chat-button">
                <Icon
                  icon="material-symbols:folder-copy-outline"
                  width={25}
                  height={25}
                />
              </button>
              <button className="post-chat">
                <Icon
                  icon="icon-park-outline:send-one"
                  width={23}
                  height={23}
                  color="white"
                />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <span className="not-chat">Open a Conversation</span>
      )}

      <Sidebar
        toggleSettings={toggleSettings}
        toggleLogout={toggleLogout}
        isMessagesPage={isMessagesPage}
      />
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
}

export default Message;
