import { useEffect, useState } from "react";
import "./Conversation.css";
import { Icon } from "@iconify/react";
import "../../DarkMode.css";

import { makeRequest } from "../../fetch";
import defaultprofile from "../../assets/profile/default_avatar.png";

export default function Conversation({
  conversation,
  currentUser,
  onClick,
  isSelected,
}) {
  const [user, setUser] = useState();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const userUrl = `users?userId=${friendId}`;
        const res = await makeRequest(userUrl);
        setUser(res);
        setIsOnline(res?.isOnline || false);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="message-friend-container">
      <div className="message-friend-bar">
        <button
          className={`message-friend ${isSelected ? "selected-friend" : ""}`}
          onClick={() => onClick(conversation)}
        >
          <img
            className="message-friend-avatar"
            src={
              user && user.profilePicture
                ? PF + user.profilePicture
                : defaultprofile
            }
            alt=""
          />
          <div
            className="message-friend-dot"
            style={{ backgroundColor: isOnline ? "green" : "grey" }}
          />
          <div className="message-friend-bio">
            <h2>{user && user.displayname}</h2>
            <h3>{user && user.desc && user.desc.slice(0, 35)}...</h3>
          </div>
        </button>
      </div>
    </div>
  );
}
