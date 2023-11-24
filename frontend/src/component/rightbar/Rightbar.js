import "./Rightbar.css";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { makeRequest } from "../../fetch.js";

import defaultprofile from "../../assets/profile/default_avatar.png";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/authContext";

const Rightbar = () => {
  const [friends, setFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await makeRequest(
          "relationships/friends/" + currentUser._id
        );
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
      const friendids = friends.flatMap((id) => (id._id));
      const userDataArray = [];

      for (const friendId of friendids) {
      if (friendId === currentUser._id) continue;

      console.log(friendids)
      await makeRequest(`conversations/`, { senderId: currentUser._id,  receiverId: friendids });
      navigate("/messages");
    }} catch (err) {
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
                    <img
                      className="rightBarImg"
                      src={friend.profilePicture ? PF + friend.profilePicture : defaultprofile}
                      alt={friend.displayname}
                    />
                    <div className={`statusDot ${"grayDot"}`} />
                  </div>
                  <p className="rightBarUserStatus">
                    <span className="rightBarName">{friend.displayname}</span>
                  </p>
                </Link>
                  <button className="rightBarButton" onClick={handleMessage}>Chat</button>
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
