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
import { io } from "socket.io-client";

import defaultprofile from "../../assets/profile/default_avatar.png";
import { format, isToday, isSameDay, isYesterday, isThisYear } from "date-fns";
import Conversation from "../../component/Conversations/Conversations.js";
import Chat from "../../component/Chat/Chat.js";

function Message() {
  const [settingOpen, setSettingOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const socket = useRef();
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
    const getMessages = async () => {
      try {
        const res = await makeRequest.get("/messages/" + currentChat?._id);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);
  
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", data => {setArrivalMessage({
      sender: data.senderId,
      text: data.text,
      createdAt: Date.now(),})
    })
  }, [])
  
  useEffect(() => {
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
    setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])

  useEffect(  () =>  {
    try {
      socket.current.emit("addUser", currentUser._id, socket.current.id);
      socket.current.on("getUsers", users => {
        console.log(users)
      })}catch (err) {
        console.log(err)
      }
  }, [currentUser]);

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

    const receiverId = currentChat.members.find(member => member !== currentUser._id)

    socket.current.emit("sendMessage", {
      senderId: currentUser._id,
      receiverId: receiverId,
      text: newMessage
    })

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
      {conversations.map((c) => (
        <div onClick={() => setCurrentChat(c)}>
      <Conversation conversation={c} currentUser={currentUser} />
      </div>
      ))}
      {currentChat ? (
        <div className="message-chat-container">
          <div className="chat">
            {messages.map((m) => {
                  <Chat message={m} own={m.sender === currentUser._id} />
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
