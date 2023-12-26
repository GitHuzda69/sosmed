import React, { useState, useRef, useEffect, useContext } from "react";
import "./Messages.css";
import Sidebar from "../../component/Leftbar/Leftbar";
import Settings from "../../component/Settings/Settings";
import Logout from "../../component/Logout/Logout";
import { makeRequest } from "../../fetch.js";
import { AuthContext } from "../../context/authContext.js";
import { Icon } from "@iconify/react";

import defaultprofile from "../../assets/profile/default_avatar.png";
import { format, isToday, isSameDay, isYesterday, isThisYear } from "date-fns";
import Conversation from "../../component/Conversations/Conversations.js";
import Chat from "../../component/Chat/Chat.js";
import Navbar from "../../component/navbar/navbar.js";

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
  const isMessagesPage = true;
  const [chatHeight, setChatHeight] = useState("80vh");
  const [displayedDate, setDisplayedDate] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [chatContainerHeight, setChatContainerHeight] = useState(0);
  const chatContainerRef = useRef(null);
  const [isShowRightBar, setIsShowRightBar] = useState(true);

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
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

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

    const receiverId = currentChat.members.find((member) => member !== currentUser._id);
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
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerHeight;
    }
  }, [chatContainerHeight]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [selectedConversation]);

  useEffect(() => {
    const storedDarkModeStatus = localStorage.getItem("isDarkMode") === "true";
    setIsDarkMode(storedDarkModeStatus);
    setDarkMode(storedDarkModeStatus);

    const storedIsShowRightBar = localStorage.getItem("isShowRightBar");
    if (storedIsShowRightBar !== null) {
      setIsShowRightBar(JSON.parse(storedIsShowRightBar));
    }
  }, []);

  console.log("isShowRightbar:", isShowRightBar);

  return (
    <div className={isShowRightBar ? "main-messages" : "main-messages-norightbar"} style={{ height: chatHeight }}>
      <div className={!isShowRightBar ? "message-friend-pages-norightbar" : "message-friend-pages"}>
        {!isShowRightBar && <Icon icon="fluent:chat-16-regular" width={30} height={30} />}
        <h1>Messages</h1>
      </div>
      <div className={isShowRightBar ? "search-message-friend" : "search-message-norightbar"}>
        <Icon icon="octicon:search-16" className={isShowRightBar ? "searchbar-message-friend-button" : "searchbar-message-friend-norightbar"} width="22" height="22" />
        <input className={isShowRightBar ? "input-search-friend" : "input-search-friend-norightbar"} type="text" placeholder="Search on Messages" />
        <div
          style={{
            borderBottom: `${isShowRightBar ? "1px gray solid" : " 2px #E0E0E0 solid"} `,
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
              isShowRightBar={isShowRightBar}
              setIsShowRightBar={setIsShowRightBar}
            />
          </div>
        ))}
      </div>
      {selectedConversation ? (
        <div className={isShowRightBar ? "message-chat-container" : "message-chat-container-norightbar"}>
          <div className="chat" ref={chatContainerRef}>
            {Object.entries(groupedMessages).map(([date, messagesForDate]) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p className={!isShowRightBar ? "chat-date-norightbar" : ""}>{formatDateLabel(date)}</p>
                {messagesForDate.map((m) => (
                  <Chat key={m._id} message={m} own={m.sender === currentUser._id} isShowRightBar={isShowRightBar} setIsShowRightBar={setIsShowRightBar} />
                ))}
              </div>
            ))}
          </div>
          {isShowRightBar ? (
            <div className="chat-input">
              <textarea placeholder={`Tuliskan sesuatu `} value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={handleEnterPress} />
              <div className="chat-input-button">
                <button className="chat-button">
                  <Icon icon="mdi:paperclip" width={25} height={25} />
                </button>
                <button className="chat-button">
                  <Icon icon="fluent:gif-16-regular" width={25} height={25} />
                </button>
                <button className="chat-button">
                  <Icon icon="material-symbols:folder-copy-outline" width={25} height={25} />
                </button>
                <button className="post-chat" onClick={handleSubmit} disabled={newMessage.trim() === ""}>
                  <Icon icon="icon-park-outline:send-one" width={23} height={23} color="white" />
                </button>
              </div>
            </div>
          ) : (
            <div className="chat-input-norightbar">
              <button className="chat-button-norightbar">
                <Icon icon="ep:circle-plus-filled" width={30} height={30} />
              </button>
              <textarea placeholder={`Tuliskan sesuatu `} value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={handleEnterPress} />
              <button className="post-chat-norightbar" onClick={handleSubmit} disabled={newMessage.trim() === ""}>
                <Icon icon="iconamoon:send-light" width={35} height={35} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className={isShowRightBar ? "pick-chat" : "pick-chat-norightbar"}>
          <span className="not-chat">Open a Conversation</span>
        </div>
      )}
      {!isShowRightBar && <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} toggleLogout={toggleLogout} />}
      <Sidebar
        isDarkMode={isDarkMode}
        toggleSettings={toggleSettings}
        toggleLogout={toggleLogout}
        isMessagesPage={isMessagesPage}
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

export default Message;
