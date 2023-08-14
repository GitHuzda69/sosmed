import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import Sidebar from "./component/navbar/Sidebar";
import SearchBar from "./component/search/Search";
import profilimage from "./assets/profil.jpg";
import "./Messages.css";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function Home() {
  const [posts, setPosts] = useState([]);

  const [newPost, setNewPost] = useState({ author: "", content: "" });
  const [textareaHeight] = useState("auto");
  const [maxTextareaHeight] = useState("50px");
  const textareaRef = useRef(null);

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
  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.width = "1000px";
    textarea.style.width = textarea.scrollWidth + "px";
  }, [newPost.content]);

  const handleLike = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleSearch = (searchTerm) => {
    console.log("Pencarian:", searchTerm);
  };
  return (
    <QueryClientProvider client={queryClient}>
    <div className="app">
      <Sidebar />
      <SearchBar onSearch={handleSearch} />
      <main className="main">
        <div className="message-form">
          <div className="button-container">
            <button className="button-content">
              <Icon icon="oi:share" width={30} height={30} />
            </button>
            <button className="button-content">
              <Icon icon="ci:download" width={30} height={30} />
            </button>
            <button className="button-content">
              <Icon icon="mdi:heart-outline" width={30} height={30} />
            </button>
            <button className="button-content">
              <Icon icon="ri:share-line" width={30} height={30} />
            </button>
            <button className="button-content">
              <Icon
                icon="radix-icons:dots-vertical"
                rotate={1}
                width={30}
                height={30}
                />
            </button>
          </div>
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
              <span className="span-likes">{post.likes} Likes</span>
              <div className="likes">
                <button onClick={() => handleLike(post.id)}>
                  Like
                  <Icon
                    icon="iconamoon:like-fill"
                    width={18}
                    height={18}
                    style={{
                      marginLeft: "1px",
                      marginTop: "-2px",
                    }}
                    />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
    </QueryClientProvider>
  );
}

export default Home;
