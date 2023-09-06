import React, { useState, useRef, useEffect } from "react";
import profilimage from "../../assets/profil.jpg";
import "./Messages.css";
import Sidebar from "../../component/Leftbar/Leftbar";
import Settings from "../../component/Settings/Settings";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const messages = [
  {
    sender: "John Doe",
    content: "Hello there!",
    timestamp: "2023-08-05 12:30",
  },
  {
    sender: "Jane Smith",
    content: "Hi John! How are you?",
    timestamp: "2023-08-05 12:35",
  },
  // Add more messages here
];

function Friendslist() {
  const [posts, setPosts] = useState([]);
  const [settingOpen, setSettingOpen] = useState(false);

  const [newPost, setNewPost] = useState({ author: "", content: "" });
  const [textareaHeight] = useState("auto");
  const textareaRef = useRef(null);
  const [maxTextareaHeight] = useState("120px");

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
  const handleTextareaChange = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";

    if (textarea.scrollHeight > parseInt(maxTextareaHeight)) {
      textarea.style.overflowY = "scroll";
      textarea.style.height = maxTextareaHeight;
    } else {
      textarea.style.overflowY = "hidden";
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.width = "1000px";
    textarea.style.width = textarea.scrollWidth + "px";
  }, [newPost.content]);

  const toggleSettings = () => {
    setSettingOpen(!settingOpen);
  };

  return (
    <div>
      <h1 className="messages-main">Messages</h1>
      <main className="main">
        <div className="message-form">
          <form onSubmit={handleSubmit}>
            <div className="avatar2">
              <img src={profilimage} alt="Avatar" />
            </div>
            <textarea
              className="content-text"
              ref={textareaRef}
              name="content"
              placeholder="What's on your mind?"
              value={newPost.content}
              onChange={handleInputChange}
              onInput={handleTextareaChange}
              style={{ height: textareaHeight, maxHeight: maxTextareaHeight }}
            />
            <button className="post-button" type="submit">
              <Icon icon="fluent:send-28-filled" height={25} width={25} />
            </button>
            <input
              className="author"
              type="text"
              name="author"
              placeholder="Your Name"
              value={newPost.author}
              onChange={handleInputChange}
            />
          </form>
        </div>
        <div className="message-list">
          {posts.map((post) => (
            <div className="message" key={post.id}>
              <div className="avatar">
                <img src={profilimage} alt="Avatar" />
              </div>
              <div className="message-content">
                <h2>{post.author}</h2>
                <p>{post.content}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Sidebar toggleSettings={toggleSettings} />
      {settingOpen && (
        <>
          <div className="settings-overlay" />
          <div className="settings-container">
            <Settings onClose={toggleSettings} />
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
