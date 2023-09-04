import React from "react";
import Post from "../post/Post.js";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Posts = () => {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts").then((res) => {
      return res.data;
    })
  );
 
  return (

    <div className="posts" style={{width: "920px", marginLeft:"100px", marginBottom:"150px"}}>
      {error ? "Something went wrong!" : isLoading ? "loading" : data.map((post) =>
        <Post post={post} key={post.id} />
      )}
    </div>
  );
};

export default Posts;