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

function Friendslist() {
  const [posts, setPosts] = useState([]);
  const [settingOpen, setSettingOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

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

  const { isLoading: cIsLoading, error: cError, data: convData} = useQuery(["conversation"], () =>
    makeRequest.get("/conversations").then((res) => {
      return res.data;
    })
);

//   const { isLoading, error, data} = useQuery(["message"], () =>
//     makeRequest.get("/messages").then((res) => {
//       return res.data;
//     })
// );

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
          {friend.map((friend) => (
            <button>
              <div className="message-friend">
                <img
                  className="message-friend-avatar"
                  src={friend.avatar}
                  alt={friend.sender}
                  avatar
                />
                <div className="message-friend-bio">
                  <h2>{friend.sender}</h2>
                  <h3>{friend.content}</h3>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="message-chat-container">chat</div>
      <Sidebar toggleSettings={toggleSettings} toggleLogout={toggleLogout} />
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

//<div style={{ paddingLeft: "10px" }}>
//   <div>
//     <button>
//      <Link
//       to="/home"
//        style={{
//         display: "flex",
//        justifyContent: "center",
//       alignItems: "center",
//    }}
//  >
//    <Icon
//     icon="mingcute:back-2-fill"
//    width={29}
//   height={29}
//   color="black"
//            />
//         </Link>
//       </button>
//     </div>
//     <div className="messages-container">
//             <h1>Messages</h1>
//            <div className="message-list">
//               {messages.map((message, index) => (
//                <div className="message" key={index}>
///                 <div className="message-sender">{message.sender}</div>
//                 <div className="message-content">{message.content}</div>
//                 <div className="message-timestamp">{message.timestamp}</div>
//                </div>
//             ))}
//            </div>
//         </div>
//  </div>
