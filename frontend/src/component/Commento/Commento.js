import React from "react";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Comments from "../comments/Comments.js";

const Commento = ({ postid, className }) => {
    const { isLoading, error ,data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postid=" + postid).then((res) => {
      return res.data;
    })
    );
  
  return (
    <div className={`comments ${className}`}>
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((comment) => (<Comments comment={comment} key={comment.id} />
          ))}
    </div>
  );
};

export default Commento;
