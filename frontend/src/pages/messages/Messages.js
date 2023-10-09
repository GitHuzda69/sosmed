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
  const [currentChat, serCurrentChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const isMessagesPage = true;
  
   const toggleSettings = () => {
    setSettingOpen(!settingOpen);
  };

  const toggleLogout = () => {
    setLogoutOpen(!logoutOpen);
  };

  const { isLoading: cIsLoading, error: cError, data:convData } = useQuery(["message"], () =>
    makeRequest.get("/messages").then((res) => {
      return res.data;
    })
  );
 console.log(convData)

 return (
  <div>
    {cIsLoading ? (
      "Loading"
    ) : cError ? (
      "Something went wrong"
    ) : (
      <>
        {convData &&
          convData.map((C) => (
            <div key={C.id} className="main-messages">
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
                  <button onClick={() => serCurrentChat(C)}>
                    <div className="message-friend">
                      <img
                        className="message-friend-avatar"
                        src={
                          C.profilepic
                            ? "/data/" + C.profilepic
                            : defaultprofile
                        }
                        alt={C.displayname}
                      />
                      <div className="message-friend-bio">
                        <h2>{C.displayname}</h2>
                        <h3>{C.biodata}</h3>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
              <div className="message-chat-container">
                <div className="chat-profile">
                  <img
                    className="chat-avatar"
                    src={
                      C.profilepic && C.profilepic
                        ? "/data/" + C.profilepic
                        : defaultprofile
                    }
                    alt="name"
                  />
                  <div className="chat-status">
                    <h2>{C.displayname}</h2>
                    <h3>{C.biodata}</h3>
                  </div>
                  <div className="chat-profile-button">
                    <button>
                      <Icon
                        icon="octicon:search-16"
                        width={25}
                        height={25}
                      />
                    </button>
                    <button>
                      <Icon
                        icon="clarity:pinned-solid"
                        width={25}
                        height={25}
                      />
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
                  
                    <div className="chat-other">
                      <h3>{C.displayname}</h3>
                      <h4>{C.desc}</h4>
                      <h5>
                        {moment(C.createdat).fromNow()}
                      </h5>
                    </div>
                  
                </div>
                <div className="chat-input">
                  <textarea type="text" placeholder={`Tuliskan sesuatu `} />
                  <div className="chat-input-button">
                    <button className="chat-button">
                      <Icon icon="mdi:paperclip" width={25} height={25} />
                    </button>
                    <button className="chat-button">
                      <Icon
                        icon="fluent:gif-16-regular"
                        width={25}
                        height={25}
                      />
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
            </div>
          ))}
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
      </>
    )}
  </div>
);
}

export default Message;
