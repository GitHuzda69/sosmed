import "./Rightbar.css";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { makeRequest } from "../../fetch.js";

import defaultprofile from "../../assets/profile/default_avatar.png";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../context/authContext";
import { io } from "socket.io-client";

const Rightbar = () => {
  const [friends, setFriends] = useState([]);
  const [onlineUser, setOnlineUser] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  const socket = io("http://localhost:8900");
  useEffect(() => {
    socket?.on("getUsers", (users) => {
      setOnlineUser(currentUser.followings.filter((f) => users.some((u) => u.userId === f)));
    });
  }, [currentUser]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await makeRequest("relationships/friends/" + currentUser._id);
        setFriends(friendList);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, []);

  const navigate = useNavigate();
  const handleMessage = async () => {
    try {
      const friendids = friends.find((id) => id);
      await makeRequest(`conversations/`, "POST", { senderId: currentUser._id, receiverId: friendids._id });
      navigate("/messages");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="rightBar">
      <h2>People You Follow</h2>
      <div className="rightBarContainer">
        <div className="rightBarItem">
          {friends && friends.length > 0 ? (
            friends.map((friend) => (
              <div key={friend._id} className="rightBarUser">
                <Link to={`/profile/${friend.username}`} className="rightBarLinkProfile">
                  <div className="rightBarUserInfo">
                    <img className="rightBarImg" src={friend.profilePicture ? friend.profilePicture : defaultprofile} alt={friend.displayname} />
                    {onlineUser && onlineUser.includes(friend._id) ? <div className={`statusDot ${"greenDot"}`} /> : <div className={`statusDot ${"grayDot"}`} />}
                  </div>
                  <p className="rightBarUserStatus">
                    <span className="rightBarName">{friend.displayname}</span>
                  </p>
                </Link>
                <button className="rightBarButton" onClick={handleMessage}>
                  Chat
                </button>
              </div>
            ))
          ) : (
            <p>You haven't followed another user</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
