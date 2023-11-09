import React, { useContext, useEffect, useState } from "react";
import Post from "../post/Post.js";
import HomeProfile from "../../component/home-profile/home-profile.js";
import Rightbar from "../../component/rightbar/Rightbar.js";
import "./Posts.css";
import { makeRequest } from "../../axios";
import AuthContext from "../../context/authContext.js";

export default function Posts({ username, className, isHome }) {
  const [posts, setPosts] = useState([""]);
  const { user } = useContext(AuthContext);
  const [openPostOption, setOpenPostOption] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await makeRequest.get("/posts/profile/" + username)
        : await makeRequest.get("posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  const handleOpenPostOption = (postId) => {
    // Open post option for the specified post
    setOpenPostOption(postId);
  };

  const handleClosePostOption = () => {
    // Close the post option popup
    setOpenPostOption(null);
  };

  return (
    <>
      <div className={`posts ${className}`}>
        {!username || username === user.username}
        {posts.map((p) => (
          <Post
            key={p._id}
            post={p}
            openPostOption={openPostOption}
            handleOpenPostOption={handleOpenPostOption}
            handleClosePostOption={handleClosePostOption}
          />
        ))}
      </div>
      {isHome && (
        <div className="side-content">
          <HomeProfile />
          <Rightbar />
        </div>
      )}
    </>
  );
}
