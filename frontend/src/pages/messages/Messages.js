import React, { useState, useRef, useEffect, useContext } from "react";
import "./Messages.css";
import Sidebar from "../../component/Leftbar/Leftbar";
import Settings from "../../component/Settings/Settings";
import Logout from "../../component/Logout/Logout";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";
import { AuthContext } from "../../context/authContext.js";
import { Icon } from "@iconify/react";
import moment from "moment";

import defaultprofile from "../../assets/profile/default_avatar.png";
import Chat from "../../component/Chat/Chat";

function Message() {
  const [settingOpen, setSettingOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const isMessagesPage = true;
  
   const toggleSettings = () => {
    setSettingOpen(!settingOpen);
  };

  const toggleLogout = () => {
    setLogoutOpen(!logoutOpen);
  };

  const { isLoading: cIsLoading, error: cError, data: convData } = useQuery(["conversation"], () =>
      makeRequest.get("/conversations").then((res) => {
        return res.data;
      })
  );
  const { isLoading: mIsLoading, error: mError, data: messData } = useQuery(["message"], () => {
    const messageId = convData[0].id;
    console.log("Message ID:", messageId);
      return makeRequest.get("/messages/" + messageId).then((res) => {
        return res.data;
      });
  });

 console.log(convData)
 console.log(messData)

 return (
  <div className="main-messages">
    <div className="message-friend-container">
      <h1>Messages</h1>
      <div className="search-message-friend">
        <Icon
          icon="octicon:search-16"
          className="searchbar-message-friend-button"
          color="black"
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
        {cIsLoading ? "Loading" : cError ? "Something went wrong" :  convData &&
          convData.map((friend) => (
            <button key={friend.id} onClick={() => setCurrentChat(friend)}>
              <div className="message-friend">
                <img
                  className="message-friend-avatar"
                  src={
                    friend.profilepic
                      ? `/data/${friend.profilepic}`
                      : defaultprofile
                  }
                  alt={friend.displayname}
                />
                <div className="message-friend-bio">
                  <h2>{friend.displayname}</h2>
                  <h3>{friend.biodata}</h3>
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
              currentChat.profilepic
                ? `/data/${currentChat.profilepic}`
                : defaultprofile
            }
            alt={currentChat.displayname}
          />
          <div className="chat-status">
            <h2>{currentChat.displayname}</h2>
            <h3>{currentChat.biodata}</h3>
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
          {mIsLoading ? "Loading" : mError ? "Something went wrong" : messData.map((message) => (
            <div key={message.id} className="chat-other">
              <h3>{message.displayname}</h3>
              <h4>{message.desc}</h4>
              <h5>{moment(message.createdat).fromNow()}</h5>
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
      <span>Open a Conversation</span>
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

export default Message;
