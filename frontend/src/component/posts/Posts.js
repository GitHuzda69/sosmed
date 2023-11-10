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
  const [friends, setFriends] = useState([]);

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

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await makeRequest.get(
          "/relationships/friends/" + user._id
        );
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user._id]);

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
        {posts.map((p) => (
          <Post
            key={p._id}
            post={p}
            openPostOption={openPostOption}
            handleOpenPostOption={handleOpenPostOption}
            handleClosePostOption={handleClosePostOption}
            friends={friends}
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
