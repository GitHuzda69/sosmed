import React, { useState, useRef, useEffect } from "react";
import profilimage from "../../assets/profil.jpg";
import { Icon } from "@iconify/react";
import "./Posts.css";
import Post from "../post/Post.js";

const Posts = () => {

  // Data Dummy
  const posts = [
    {
      id: 1,
      name: "Jeou",
      userId: 1,
      profilePic: profilimage,
      desc: "Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd ",
      img:"profilimage"
    },
    {
      id: 2,
      name: "Bukan",
      userId: 2,
      profilePic: profilimage,
      desc: "Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd asdkas a;askjhnd oiasdoiasoa isasdoi asoidh asoidihasoid ",
      img: "",
    },
  ];

  return <div className="posts">
      {posts.map(post=>(
        <Post post={post} key={[post.id]} />
      ))}
      
    </div>
};


export default Posts;
