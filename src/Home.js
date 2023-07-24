import React, { useState } from "react";
import "./App.css";

function Home() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "John Doe",
      content: "This is my first post! #excited",
      likes: 5,
    },
    {
      id: 2,
      author: "Jane Smith",
      content: "Hello, world! #firstpost",
      likes: 10,
    },
  ]);

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

  return (
    <div className="app">
      <header className="header">
        <h1>Social Media</h1>
        <nav>
          <ul>
            <li>Home</li>
            <li>Profile</li>
            <li>Messages</li>
            <li>Logout</li>
          </ul>
        </nav>
      </header>
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
              <h2>{post.author}</h2>
              <p>{post.content}</p>
              <div className="likes">
                <button onClick={() => handleLike(post.id)}>Like</button>
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
