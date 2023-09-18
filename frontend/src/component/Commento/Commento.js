import React from "react";
import { useLocation, Link } from "react-router-dom";
import AuthContext from "../../context/authContext.js";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Comments from "../comments/Comments.js";

const Commento = ({ postid }) => {
    const { isLoading, error ,data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postid=" + postid).then((res) => {
      return res.data;
    })
    );
  
  return (
    <div className="comments">
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((comments) => (<Comments comment={comments} key={comments.id} />
          ))}
    </div>
  );
};

export default Commento;
