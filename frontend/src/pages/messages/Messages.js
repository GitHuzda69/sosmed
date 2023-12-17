import React, { useState, useRef, useEffect, useContext } from "react";
import "./Messages.css";
import Sidebar from "../../component/Leftbar/Leftbar";
import Settings from "../../component/Settings/Settings";
import Logout from "../../component/Logout/Logout";
import { makeRequest } from "../../fetch.js";
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
  const [messages, setMessages] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const socket = useRef();
  const isMessagesPage = true;
  const [chatHeight, setChatHeight] = useState("80vh");
  const [displayedDate, setDisplayedDate] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [chatContainerHeight, setChatContainerHeight] = useState(0);
  const chatContainerRef = useRef(null);

  const toggleSettings = () => {
    setSettingOpen(!settingOpen);
  };

  const toggleLogout = () => {
    setLogoutOpen(!logoutOpen);
  };

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await makeRequest("conversations/" + currentUser._id);
        setConversations(res);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [currentUser._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await makeRequest("messages/" + currentChat?._id);
        setMessages(res);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", currentUser._id);
    socket.current.on("getUsers", (u) => {
    console.log(u);
    });
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
    const currentDate = new Date();
    const message = {
      sender: currentUser._id,
      text: newMessage,
      conversationId: currentChat._id,
      createdAt: currentDate,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== currentUser._id
    );
    
    socket.current.emit("sendMessage", {
      senderId: currentUser._id,
      receiverId: receiverId,
      text: newMessage,
    });

    try {
      const res = await makeRequest("messages", "POST", message);
      setMessages([...messages, res]);
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
    const firstMessageWithDate = messages.find((m) => m.createdAt);

    if (firstMessageWithDate) {
      setDisplayedDate(new Date(firstMessageWithDate.createdAt));
    }
  }, [messages]);

  const handleConversationClick = (conversation) => {
    if (selectedConversation === conversation) {
      setSelectedConversation(null);
    } else {
      setCurrentChat(conversation);
      setSelectedConversation(conversation);
    }
  };

  const groupedMessages = messages.reduce((accumulator, message) => {
    if (message && message.createdAt) {
      const dateKey = new Date(message.createdAt).toDateString();

      if (!accumulator[dateKey]) {
        accumulator[dateKey] = [];
      }

      accumulator[dateKey].push(message);
    }

    return accumulator;
  }, {});

  const formatDateLabel = (date) => {
    const currentDate = new Date(date);
    if (isToday(currentDate)) {
      return "Today";
    } else if (isYesterday(currentDate)) {
      return "Yesterday";
    } else {
      return format(currentDate, "MMMM dd, yyyy");
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerHeight;
    }
  }, [chatContainerHeight]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [selectedConversation]);

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
        <div
          style={{
            borderBottom: "1px gray solid",
            marginLeft: "-20px",
            marginRight: "-20px",
          }}
        />
        {conversations.map((c) => (
          <div key={c._id} onClick={() => handleConversationClick(c)}>
            <Conversation
              conversation={c}
              currentUser={currentUser}
              onClick={handleConversationClick}
              isSelected={c === selectedConversation}
            />
          </div>
        ))}
      </div>
      {selectedConversation ? (
        <div className="message-chat-container">
          <div className="chat" ref={chatContainerRef}>
            {Object.entries(groupedMessages).map(([date, messagesForDate]) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p>{formatDateLabel(date)}</p>
                {messagesForDate.map((m) => (
                  <Chat
                    key={m._id}
                    message={m}
                    own={m.sender === currentUser._id}
                  />
                ))}
              </div>
            ))}
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
