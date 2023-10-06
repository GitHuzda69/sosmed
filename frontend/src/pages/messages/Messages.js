import React, { useState, useRef, useEffect } from "react";
import "./Messages.css";
import Sidebar from "../../component/Leftbar/Leftbar";
import Settings from "../../component/Settings/Settings";
import Logout from "../../component/Logout/Logout";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";
import { Icon } from "@iconify/react";

import avatar1 from "../../assets/friend/friend1.jpg";
import avatar2 from "../../assets/friend/friend2.jpg";
import avatar3 from "../../assets/friend/friend3.jpg";
import avatar4 from "../../assets/friend/friend4.jpg";
import avatar5 from "../../assets/friend/friend5.jpeg";

const friend = [
  {
    sender: "John Doe",
    content: "Hello there!",
    avatar: avatar4,
  },
  {
    sender: "Jane Smith",
    content: "Hi John! How are you?",
    avatar: avatar5,
  },
  {
    sender: "Jane Ol",
    content: "Hi John! How are you?",
    avatar: avatar3,
  },
  {
    sender: "Jade Smith",
    content: "Hi John! How are you?",
    avatar: avatar1,
  },
  {
    sender: "Jane Lord",
    content: "Hi John! How are you?",
    avatar: avatar5,
  },
  {
    sender: "Jath",
    content: "Hi John! How are you?",
    avatar: avatar2,
  },
  {
    sender: "Nawtic",
    content: "Hi John! How are you?",
    avatar: avatar1,
  },
];

const other = [
  {
    chat: "Hoe",
    time: "19.21 AM",
  },
  {
    chat: "Dodol baru mateng, ditarik susah putus",
    time: "19.21 AM",
  },
  {
    chat: "Temanku yg ganteng, adakah seratus",
    time: "19.21 AM",
  },
];

const self = [
  {
    chat: "Keren",
    time: "19.25 AM",
  },
  {
    chat: "Tapi Gaada",
    time: "19.25 AM",
  },
  {
    chat: "Ini aja ada kerjaan ",
    time: "19.25 AM",
  },
  {
    chat: "Bawa aqua gelas sambil jongkok",
    time: "19.25 AM",
  },
];

function Friendslist() {
  const [posts, setPosts] = useState([]);
  const [settingOpen, setSettingOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [currentChat, setCurrenChat] = useState(null);
  const isMessagesPage = true;

  const [newPost, setNewPost] = useState({ author: "", content: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newPost.author && newPost.content) {
      const newPostWithId = {
        ...newPost,
        id: Date.now(),
        likes: 0,
      };
      setPosts([...posts, newPostWithId]);
      setNewPost({ author: "", content: "" });
    }
  };

  const toggleSettings = () => {
    setSettingOpen(!settingOpen);
  };

  const toggleLogout = () => {
    setLogoutOpen(!logoutOpen);
  };

  const {isLoading: cIsLoading, error: cError, data: convData } = useQuery(["conversation"], () =>
    makeRequest.get("/conversations").then((res) => {
      return res.data;
    })
  );

  const { isLoading, error, data } = useQuery(["message"], () =>
    makeRequest.get("/messages").then((res) => {
      return res.data;
    })
  );
console.log(data)

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
          {convData.map((friend) => (
            <button>
              <div className="message-friend">
                <img
                  className="message-friend-avatar"
                  src={"/data/" + friend.profilepic}
                  alt={friend.displayname}
                  avatar
                />
                <div className="message-friend-bio">
                  <h2>{friend.displayname}</h2>
                  <h3>Data dummy</h3>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {currentChat ? 
      <div className="message-chat-container">
        <div className="chat-profile">
          <img className="chat-avatar" src={avatar5} alt="name" />
          <div className="chat-status">
            <h2>Jane Smith</h2>
            <h3>Last online 12 hours ago.</h3>
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
          {other.map((other) => (
            <div className="chat-other">
              <h3>{other.chat}</h3>
              <h4>{other.time}</h4>
            </div>
          ))}
          {self.map((self) => (
            <div className="chat-self">
              <h3>{self.chat}</h3>
              <h4>{self.time}</h4>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <textarea type="text" placeholder={`Tuliskan sesuatu `} />
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
      </div> : <span>Open a Conversation</span>}
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

export default Friendslist;
