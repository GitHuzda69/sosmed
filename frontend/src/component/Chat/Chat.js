import React, { useState } from "react";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { Icon } from "@iconify/react";
import { makeRequest } from "../../axios";
import defaultprofile from "../../assets/profile/default_avatar.png";

const Chat = (conv, currentChat) => {
  const { isLoading: mIsLoading, error: mError, data: messData } = useQuery(["message"], () => {
    const messageId = conv.id;
      return makeRequest.get("/messages/" + conv.id).then((res) => {
        return res.data;
      });
  });
  console.log(conv)    
  console.log(messData)    
  console.log("Message ID:", conv.id);

  return (
    <div>
      {mIsLoading
        ? "Loading"
        : mError
        ? "Something went wrong"
        : messData.map((message) => (
            <div key={message.id} className="chat-other">
              <h3>{message.displayname}</h3>
              <h4>{message.desc}</h4>
              <h5>{moment(message.createdat).fromNow()}</h5>
            </div>
          ))}
    </div>
  );
};

export default Chat;
