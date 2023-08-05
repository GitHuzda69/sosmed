import React, { useState } from "react";
import "./App.css";
import { Icon } from "@iconify/react";
import Sidebar from "./component/navbar/Sidebar";
import SearchBar from "./component/search/Search";

function Home() {
  const [posts, setPosts] = useState([]);

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
    <div className="app">
      <Sidebar />
      <SearchBar onSearch={handleSearch} />
      <main className="main">
        <div className="post-form">
          <h2>Create New Post</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="author"
              placeholder="Your Name"
              value={newPost.author}
              onChange={handleInputChange}
            />
            <textarea
              name="content"
              placeholder="What's on your mind?"
              value={newPost.content}
              onChange={handleInputChange}
            />
            <button type="submit">Post</button>
          </form>
        </div>
        <div className="post-list">
          {posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="post-content">
                <h2>{post.author}</h2>
                <p>{post.content}</p>
              </div>
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
                <span>{post.likes} Likes</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
