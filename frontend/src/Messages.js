import React, { useState, useRef, useEffect } from "react";
import profilimage from "./assets/profil.jpg";
import Sidebar from "../src/component/navbar/Sidebar";
import { Icon } from "@iconify/react";
import "./Messages.css";

function Friendslist() {
  const [posts, setPosts] = useState([]);

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

  return (
    <div>
      <Sidebar />
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
    </div>
  );
}

export default Friendslist;
