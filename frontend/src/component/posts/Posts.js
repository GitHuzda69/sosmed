import React, { useContext, useEffect, useRef, useState } from "react";
import Post from "../post/Post.js";
import HomeProfile from "../../component/home-profile/home-profile.js";
import Rightbar from "../../component/rightbar/Rightbar.js";
import "./Posts.css";
import { makeRequest } from "../../fetch.js";
import AuthContext from "../../context/authContext.js";
import { io } from "socket.io-client";

export default function Posts({ username, className, isHome }) {
  const [posts, setPosts] = useState([""]);
  const { user } = useContext(AuthContext);
  const [openPostOption, setOpenPostOption] = useState(null);
  const [friends, setFriends] = useState([]);
  const [arrivalPost, setArrivalPost] = useState(null);

  //SOCKET IO
  const socket = useRef();
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getPostFollow", (data) => {
      setArrivalPost({
        userId: data.userId,
        desc: data.desc,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
  if (arrivalPost && !posts.some((post) => post._id === arrivalPost._id)) {
    setPosts((prev) => [arrivalPost, ...prev]);
  }
}, [arrivalPost, posts]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {});
  }, [user]);

  useEffect(() => {
    const fetchPosts = async () => {
      const endpoint = username
        ? `posts/profile/${username}`
        : `posts/timeline/${user._id}`;

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

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await makeRequest(
          "relationships/friends/" + user._id
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
        {posts.length === 0
          ? "There is no any post yet"
          : posts.map((p) => (
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
