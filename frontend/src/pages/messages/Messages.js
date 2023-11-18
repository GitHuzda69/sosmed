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
// import { io } from "socket.io-client";

import defaultprofile from "../../assets/profile/default_avatar.png";
import { format, isToday, isSameDay, isYesterday, isThisYear } from "date-fns";

function Message() {
  const [settingOpen, setSettingOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);
  const [info, setInfo] = useState(null);
  const [messages, setMessages] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const isMessagesPage = true;
  const [chatHeight, setChatHeight] = useState("80vh");
  const [displayedDate, setDisplayedDate] = useState(null);

  const toggleSettings = () => {
    setSettingOpen(!settingOpen);
  };

  const toggleLogout = () => {
    setLogoutOpen(!logoutOpen);
  };

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
    const getUser = async () => {
      try {
        const friendids = conversations.flatMap(
          (conversation) => conversation.members
        );
        const userDataArray = [];

        for (const friendId of friendids) {
          if (friendId === currentUser._id) continue;

          const res = await makeRequest.get("/users?userId=" + friendId);
          userDataArray.push(res.data);
          setUser(userDataArray);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [conversations, currentUser]);

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

  // useEffect(() => {
  //   setSocket(io("ws://localhost:8900"));
  // }, []);

  useEffect(() => {
    const storedDarkModeStatus = localStorage.getItem("isDarkMode") === "true";
    setIsDarkMode(storedDarkModeStatus);

    setDarkMode(storedDarkModeStatus);
  }, []);

  useEffect(() => {
    const updateChatHeight = () => {
      const windowHeight = window.innerHeight;
      const headerHeight = 0;
      const newChatHeight = windowHeight - headerHeight + "px";
      setChatHeight(newChatHeight);
    };

    window.addEventListener("resize", updateChatHeight);
    updateChatHeight();

    return () => {
      window.removeEventListener("resize", updateChatHeight);
    };
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: currentUser._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    try {
      const res = await makeRequest.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (newMessage.trim() !== "") {
        handleSubmit(e);
      }
    }
  };

  useEffect(() => {
    // Find the first message with a valid date
    const firstMessageWithDate = messages.find((m) => m.createdAt);

    // Update displayed date if it exists
    if (firstMessageWithDate) {
      setDisplayedDate(new Date(firstMessageWithDate.createdAt));
    }
  }, [messages]);

  return (
    <div className="main-messages" style={{ height: chatHeight }}>
      <div className="message-friend-container">
        <div className="search-message-friend">
          <h1>Messages</h1>
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
          {user && user.length > 0 ? (
            conversations.map((conversation) => {
              const friendId = conversation.members.find(
                (member) => member !== currentUser._id
              );

              const friendUser = user.find((u) => u._id === friendId);
              const truncatedDesc =
                friendUser && friendUser.desc
                  ? friendUser.desc.length > 30
                    ? friendUser.desc.slice(0, 30) + "..."
                    : friendUser.desc
                  : "";

              return (
                <button
                  className="message-friend"
                  onClick={() => setCurrentChat(conversation)}
                >
                  <img
                    className="message-friend-avatar"
                    src={
                      friendUser && friendUser.profilePicture
                        ? PF + friendUser.profilePicture
                        : defaultprofile
                    }
                    alt="nana"
                  />
                  <div className="message-friend-bio">
                    <h2>{friendUser && friendUser.displayname}</h2>
                    <h3>{truncatedDesc}</h3>
                  </div>
                </button>
              );
            })
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>

      {currentChat ? (
        <div className="message-chat-container">
          <div className="chat-profile">
            <Link to={`/profile/${user.username}`}>
              <div className="avatar-status-container">
                <img
                  className="chat-avatar"
                  src={
                    user.profilePicture
                      ? PF + user.profilePicture
                      : defaultprofile
                  }
                  alt={user.displayname}
                />
                <div className="chat-status">
                  <h2>{user.displayname}</h2>
                  <h3>{user.desc}</h3>
                </div>
              </div>
            </Link>
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
            {messages.map((m, index) => {
              const previousMessage = messages[index - 1];
              const showDate =
                !previousMessage ||
                !isSameDay(
                  new Date(previousMessage.createdAt),
                  new Date(m.createdAt)
                );

              return (
                <React.Fragment key={m.id}>
                  {showDate && (
                    <div className="chat-time">
                      <h3>
                        {isToday(new Date(m.createdAt))
                          ? "Today"
                          : format(new Date(m.createdAt), "MMMM dd, yyyy")}
                      </h3>
                    </div>
                  )}
                  <div
                    className={
                      m.sender === currentUser._id ? "chat-self" : "chat-other"
                    }
                  >
                    <h3>{m.text}</h3>
                    <h4>{format(new Date(m.createdAt), "hh:mm a")}</h4>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          <div className="chat-input">
            <textarea
              placeholder={`Tuliskan sesuatu `}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleEnterPress}
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
              <button
                className="post-chat"
                onClick={handleSubmit}
                disabled={newMessage.trim() === ""}
              >
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
        <div className="pick-chat">
          <span className="not-chat">Open a Conversation</span>
        </div>
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
