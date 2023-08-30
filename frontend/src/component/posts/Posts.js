import React from "react";
import profilimage from "../../assets/profil.jpg";
import friend3 from "../../assets/friend/friend3.jpg";
import friend4 from "../../assets/friend/friend4.jpg";
import "./Posts.css";
import Post from "../post/Post.js";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Posts = () => {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts").then((res) => {
      return res.data;
    })
  );
  // Data Dummy
  const posts = [
    {
      id: 1,
      username: "Jeou",
      userId: 1,
      profilepic: profilimage,
      img: friend4,
      desc: "Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd ",
      createdat: "2023-08-30 08:33:34"
    },
    {
      id: 2,
      username: "Bukan",
      userId: 2,
      profilepic: profilimage,
      desc: "Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd asdkas a;askjhnd oiasdoiasoa isasdoi asoidh asoidihasoid ",
      img: "",
      createdat: "2023-08-30 08:00:34"
    },
    {
      id: 3,
      username: "Orang",
      userId: 3,
      profilepic: profilimage,
      desc: "Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd asdkas Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd asdkas Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd asdkas Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd asdkas a;askjhnd oiasdoiasoa isasdoi asoidh asoidihasoid ",
      img: "",
      createdat: "2023-08-28 08:33:34"
    },
    {
      id: 4,
      username: "Biasa",
      userId: 4,
      profilepic: profilimage,
      desc: "Lorem ipsum dolor sit amet asioasdiLorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd lala asdkas Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpods lala asdkas Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd lala asdkas os aosidjas asdpoasd po poadjpoasd asdkas a;askjhnd oiasdoiasoa isasdoi Lorem ipsum dolor sit amet asioasdiLorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd lala asdkas Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpods lala asdkas Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd lala asdkas os aosidjas asdpoasd po poadjpoasd asdkas a;askjhnd oiasdoiasoa isas Lorem ipsum dolor sit amet asioasdiLorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd lala asdkas Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpods lala asdkas Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd lala asdkas os aosidjas asdpoasd po poadjpoasd asdkas a;askjhnd oiasdoiasoa isas Lorem ipsum dolor sit amet asioasdiLorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd lala asdkas Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpods lala asdkas Lorem ipsum dolor sit amet asioasdios aosidjas asdpoasd po poadjpoasd lala asdkas os aosidjas asdpoasd po poadjpoasd asdkas a;askjhnd oiasdoiasoa isasasoidh asoidihasoid ",
      img: friend3,
      createdat: "2023-08-27 08:33:34"
    },
  ];

  return (

    <div className="posts" style={{width: "920px"}}>
      {error ? "Something went wrong!" : isLoading ? "loading" : data.map((post) =>
        <Post post={post} key={post.id} />
      )}
    </div>
  );
};

export default Posts;