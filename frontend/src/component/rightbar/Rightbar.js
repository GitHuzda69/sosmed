import "./Rightbar.css";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";

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
        const friendList = await makeRequest.get(
          "/relationships/friends/" + currentUser._id
        );
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, []);

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
                <Link to={`/messages/${friend._id}`} className="link-rightbar">
                  <button className="rightBarButton">Chat</button>
                </Link>
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
