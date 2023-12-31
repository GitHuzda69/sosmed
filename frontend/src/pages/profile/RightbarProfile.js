import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import moment from "moment";

import defaultprofile from "../../assets/profile/default_avatar.png";
import { makeRequest } from "../../fetch";
import { io } from "socket.io-client";

const RightbarProfile = ({ handleFollow, handleMessage, currentUser }) => {
  const [user, setUser] = useState();
  const username = useParams().username;
  const [friends, setFriends] = useState();
  const [onlineUser, setOnlineUser] = useState();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const socket = io("http://localhost:8900");
  useEffect(() => {
    socket?.on("getUsers", (users) => {
      setOnlineUser(currentUser.followings.filter((f) => users.some((u) => u.userId === f)));
    });
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await makeRequest(`users?username=${username}`);
      setUser(res);
    };
    fetchUser();
  }, [username]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await makeRequest("relationships/friends/" + user._id);
        setFriends(friendList);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const [followed] = useState(currentUser.followings.includes(user?._id));
  return (
    <div className="rightProfile-Container">
      <div className="rightProfileBar">
        <div className="search-profile">
          <input className="input-profile" type="text" placeholder="Search on Your profile" />
        </div>
        <div className="intro">
          <h2>Intro</h2>
          <h3>
            <Icon icon="ep:info-filled" width={25} height={25} />
            Joined
            <span>{moment(user && user.createdAt).format("DD MMMM YYYY")}</span>
          </h3>
          <h3>
            <Icon icon="fluent:location-16-filled" width={25} height={25} />
            From
            <span>{(user && user.city) || "Earth"}</span>
          </h3>
          <h4>{(user && user.desc) || "This is your biodata, You can update it on the edit profile."}</h4>
        </div>
        <div className="friends-rec">
          {friends && friends.length === 0 ? (
            <span className="friendlist-empty">{user.username === currentUser.username ? "You haven't followed anyone yet." : `This user hasn't followed anyone yet.`}</span>
          ) : friends && friends.length > 0 ? (
            friends.map((friend) => (
              <div key={friend._id} className="rightBarUserProfile">
                <Link
                  className="LinkUserProfile"
                  to={"/profile/" + friend.username}
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <div className="rightBarUserInfoProfile">
                    <img className="rightBarImgProfile" src={friend.profilePicture ? PF + friend.profilePicture : defaultprofile} alt="" />
                    {onlineUser && onlineUser.includes(friend._id) ? <div className={`statusDot-rightbar ${"greenDot-rightbar"}`} /> : <div className={`statusDot-rightbar ${"grayDot-rightbar"}`} />}
                  </div>
                  <div className="rightBarNameProfile">
                    <span>{friend.displayname}</span>
                    <p>{friend && truncateText(friend.desc, 20)}</p>
                  </div>
                </Link>
                {currentUser.username === username ? (
                  <button className="rightBarButtonProfile" onClick={handleMessage}>
                    Chat
                  </button>
                ) : (
                  <div>
                    {followed ? (
                      <button className="rightBarButtonProfile" onClick={handleFollow}>
                        Follow
                      </button>
                    ) : (
                      <button className="rightBarButtonProfile" onClick={handleMessage}>
                        Chat
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            "Loading"
          )}
        </div>
      </div>
    </div>
  );
};

export default RightbarProfile;
