import { useContext, useEffect, useState } from "react";
import "./Conversation.css";
import "../../DarkMode.css";

import { makeRequest } from "../../fetch";
import defaultprofile from "../../assets/profile/default_avatar.png";
import { io } from "socket.io-client";
import AuthContext from "../../context/authContext";

export default function Conversation({ conversation, onClick, isSelected, isShowRightBar }) {
  const [user, setUser] = useState();
  const { user: currentUser } = useContext(AuthContext);
  const [isOnline, setIsOnline] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const friendId = conversation.members.find((m) => m !== currentUser._id);
  useEffect(() => {
    const getUser = async () => {
      try {
        const userUrl = `users?userId=${friendId}`;
        const res = await makeRequest(userUrl);
        setUser(res);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [friendId, conversation]);

  const socket = io("http://localhost:8900");
  useEffect(() => {
    socket?.on("getUsers", (users) => {
      setIsOnline(currentUser.followings.filter((f) => users.some((u) => u.userId === f)));
    });
  }, [user]);

  return (
    <div className="message-friend-container">
      <div className="message-friend-bar">
        {isShowRightBar ? (
          <button className={`message-friend ${isSelected ? "selected-friend" : ""}`} onClick={() => onClick(conversation)}>
            <img className="message-friend-avatar" src={user && user.profilePicture ? PF + user.profilePicture : defaultprofile} alt="" />
            {isOnline && isOnline.includes(friendId) ? <div className={`statusDot ${"greenDot"}`} /> : <div className={`statusDot ${"grayDot"}`} />}
            <div className="message-friend-bio">
              <h2>{user && user.displayname}</h2>
              <h3>{user && user.desc && user.desc.slice(0, 35)}...</h3>
            </div>
          </button>
        ) : (
          <button className={`message-friend-norightbar ${isSelected ? "selected-friend-norightbar" : ""}`} onClick={() => onClick(conversation)}>
            <img className="message-friend-avatar" src={user && user.profilePicture ? PF + user.profilePicture : defaultprofile} alt="" />
            {isOnline && isOnline.includes(friendId) ? <div className={`statusDot ${"greenDot"}`} /> : <div className={`statusDot ${"grayDot"}`} />}
            <div className="message-friend-bio">
              <h2>{user && user.displayname}</h2>
              <h3>{user && user.desc && user.desc.slice(0, 35)}...</h3>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
