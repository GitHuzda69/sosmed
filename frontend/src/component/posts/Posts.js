import React, { useContext, useEffect, useState } from "react";
import Post from "../post/Post.js";
import "./Posts.css";
import { makeRequest } from "../../axios";
import AuthContext from "../../context/authContext.js";

export default function Posts ({ username, className }) {
  const [posts, setPosts] = useState([""]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await makeRequest.get("/posts/timeline/" + username)
        : await makeRequest.get("posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className={`posts ${className}`}>
      {(!username || username === user.username)}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
    </div>
  );
};
