import React, { useContext, useEffect, useRef, useState } from "react";
import Post from "../post/Post.js";
import "./Posts.css";
import { makeRequest } from "../../fetch.js";
import AuthContext from "../../context/authContext.js";

export default function Posts({ username, className, isHome }) {
  const [posts, setPosts] = useState([""]);
  const { user } = useContext(AuthContext);
  const [openPostOption, setOpenPostOption] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const endpoint = username ? `posts/profile/${username}` : `posts/timeline/${user._id}`;

      try {
        const res = await makeRequest(endpoint);
        setPosts(
          res.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      } catch (error) {
        // Handle error
        console.error("Error:", error.message);
      }
    };

    fetchPosts();
  }, [username, user._id]);

  const handleOpenPostOption = (postId) => {
    setOpenPostOption(postId);
  };

  const handleClosePostOption = () => {
    setOpenPostOption(null);
  };

  return (
    <>
      <div className={`posts ${className}`}>
        {!username || username === user.username}
        {posts.length === 0
          ? "There is no any post yet"
          : posts.map((p) => p._id && <Post key={p._id} post={p} openPostOption={openPostOption} handleOpenPostOption={handleOpenPostOption} handleClosePostOption={handleClosePostOption} />)}
      </div>
    </>
  );
}
