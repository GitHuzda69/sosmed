import React from "react";
import Post from "../post/Post.js";
import "./Posts.css";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Posts = ({ userId, className }) => {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts?userid=" + userId).then((res) => {
      return res.data;
    })
  );

  return (
    <div className={`posts ${className}`}>
      {error
        ? `Something went wrong`
        : isLoading
        ? "loading"
        : data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
