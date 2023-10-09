import React,  { useState } from "react";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { Icon } from "@iconify/react";
import { makeRequest } from "../../axios";
import defaultprofile from "../../assets/profile/default_avatar.png";


const Chat = ( conversation_id, currentChat ) => {
    const { isLoading: mIsLoading,  error: mError, data: messData} = useQuery(["message"], () =>
        makeRequest.get("/messages/" + conversation_id).then((res) => {
        return res.data;
          })
      );

    return (
        <div>
        {currentChat ? (
        <div className="message-chat-container">
          <div className="chat-profile">
            <img
              className="chat-avatar"
              src={
                currentChat.profilepic && currentChat.profilepic
                  ? "/data/" + currentChat.profilepic
                  : defaultprofile
              }
              alt="name"
            />
            <div className="chat-status">
              <h2>{currentChat.displayname}</h2>
              <h3>{currentChat.biodata}</h3>
            </div>
            <div className="chat-profile-button">
              <button>
                <Icon icon="octicon:search-16" width={25} height={25} />
              </button>
              <button>
                <Icon icon="clarity:pinned-solid" width={25} height={25} />
              </button>
              <button>
                <Icon
                  icon="solar:menu-dots-bold"
                  rotate={1}
                  width={25}
                  height={25}
                />
              </button>
            </div>
          </div>
          <div className="chat">
            <div className="chat-time">
              <h3>Today</h3>
            </div>
            {messData &&
              messData.map((message) => (
                <div className="chat-other">
                  <h3>{message.displayname}</h3>
                  <h4>{message.desc}</h4>
                  <h5>{moment(message.createdat).fromNow()}</h5>
                </div>
              ))}
          </div>
          <div className="chat-input">
            <textarea type="text" placeholder={`Tuliskan sesuatu `} />
            <div className="chat-input-button">
              <button className="chat-button">
                <Icon icon="mdi:paperclip" width={25} height={25} />
              </button>
              <button className="chat-button">
                <Icon icon="fluent:gif-16-regular" width={25} height={25} />
              </button>
              <button className="chat-button">
                <Icon
                  icon="material-symbols:folder-copy-outline"
                  width={25}
                  height={25}
                />
              </button>
              <button className="post-chat">
                <Icon
                  icon="icon-park-outline:send-one"
                  width={23}
                  height={23}
                  color="white"
                />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <span className="not-chat">Open a Conversation</span>
      )}
        </div>
    )
}

export default Chat;