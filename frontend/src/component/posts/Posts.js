import React from "react";
import profilimage from "../../assets/profil.jpg";
import friend3 from "../../assets/friend/friend3.jpg";
import friend4 from "../../assets/friend/friend4.jpg";
import "./Posts.css";
import Post from "../post/Post.js";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Posts = () => {
  const { isLoading, error, data } = useQuery(['posts'], ()  =>
  makeRequest.get("/posts").then((res) => {
    return res.data;
  })
  );
  // Data Dummy
  const posts = [
    {
      id: 1,
      name: "Jeou",
      userId: 1,
      profilePic: profilimage,
      img: friend4,
      desc: "Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd ",
    },
    {
      id: 2,
      name: "Bukan",
      userId: 2,
      profilePic: profilimage,
      desc: "Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd asdkas a;askjhnd oiasdoiasoa isasdoi asoidh asoidihasoid ",
      img: "",
    },
    {
      id: 3,
      name: "Orang",
      userId: 3,
      profilePic: profilimage,
      desc: "Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd asdkas Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd asdkas Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd asdkas Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd asdkas a;askjhnd oiasdoiasoa isasdoi asoidh asoidihasoid ",
      img: "",
    },
    {
      id: 4,
      name: "Biasa",
      userId: 4,
      profilePic: profilimage,
      desc: "Lorem ipsum dolor sit amet asioasdiLorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd lala asdkas Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpods lala asdkas Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd lala asdkas os aosidjas asdpoasd po poadjpoasd asdkas a;askjhnd oiasdoiasoa isasdoi Lorem ipsum dolor sit amet asioasdiLorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd lala asdkas Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpods lala asdkas Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd lala asdkas os aosidjas asdpoasd po poadjpoasd asdkas a;askjhnd oiasdoiasoa isas Lorem ipsum dolor sit amet asioasdiLorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd lala asdkas Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpods lala asdkas Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd lala asdkas os aosidjas asdpoasd po poadjpoasd asdkas a;askjhnd oiasdoiasoa isas Lorem ipsum dolor sit amet asioasdiLorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd lala asdkas Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpods lala asdkas Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd lala asdkas os aosidjas asdpoasd po poadjpoasd asdkas a;askjhnd oiasdoiasoa isasasoidh asoidihasoid ",
      img: friend3,
    },
  ];

  return (
    <div
      className="posts"
      style={{
        width: "920px",
      }}
    >
      {posts.map((post) => (
        <Post post={post} key={[post.id]} />
      ))}
    </div>
  );
};

export default Posts;

/* JANGAN DIHAPOS
{error ? "Something went wrong!" : isLoading ? "loading" : posts.map((post) =>
        <Post post={post} key={post.id} />
      )}
*/