import React, { useContext, useEffect, useRef, useState } from "react";
import Post from "../post/Post.js";
import "./Posts.css";
import { makeRequest } from "../../fetch.js";
import AuthContext from "../../context/authContext.js";

export default function Posts({ username, className, isHome, socket }) {
  const [posts, setPosts] = useState([""]);
  const { user } = useContext(AuthContext);
  const [openPostOption, setOpenPostOption] = useState(null);
  const [arrivalPost, setArrivalPost] = useState(null);

  //SOCKET IO
  useEffect(() => {
    socket?.on("getPostFollow", (data) => {
      const decodeBase64ToBlob = (base64) => {
        const binaryString = window.atob(base64);
        const arrayBuffer = new ArrayBuffer(binaryString.length);
        const byteArray = new Uint8Array(arrayBuffer);

        for (let i = 0; i < binaryString.length; i++) {
          byteArray[i] = binaryString.charCodeAt(i);
        }

        return new Blob([arrayBuffer], { type: "application/octet-stream" });
      };

      const decodedImg = typeof img === "string" ? decodeBase64ToBlob(data.img) : data.img;
      const decodedFile = typeof file === "string" ? decodeBase64ToBlob(data.file) : data.file;

      setArrivalPost({
        userId: data.userId,
        desc: data.desc,
        img: decodedImg,
        file: decodedFile,
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
          : posts.map(
              (p) => p._id && <Post key={p._id} post={p} openPostOption={openPostOption} handleOpenPostOption={handleOpenPostOption} handleClosePostOption={handleClosePostOption} socket={socket} />
            )}
      </div>
    </>
  );
}
