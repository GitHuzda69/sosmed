import "./Rightbar.css";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";

import defaultprofile from "../../assets/profile/default_avatar.png";

const Rightbar = () => {
  const {
    isLoading,
    error,
    data: friendData,
  } = useQuery(["friend"], () =>
    makeRequest.get("/friends").then((res) => {
      return res.data;
    })
  );
  return (
    <div className="rightBar">
      <h2>People You Follow</h2>
      <div className="rightBarContainer">
        {error ? (
          "Something went wrong"
        ) : isLoading ? (
          "Loading"
        ) : friendData.length === 0 ? (
          <h3>You didn't follow anyone yet. Found someone in the fyp pages!</h3>
        ) : (
          friendData.map((friend) => (
            <div key={friend.userid} className="rightBarItem">
              <div className="rightBarUser">
                <div className="rightBarUserInfo">
                  <Link to={`/profile/${friend.userid}`}>
                    <img
                      className="rightBarImg"
                      src={
                        friend && friend.profilepic
                          ? "/data/" + friend.profilepic
                          : defaultprofile
                      }
                      alt={friend.displayname}
                    />
                  </Link>
                  <div className={`statusDot ${"grayDot"}`} />
                </div>
                <p className={`rightBarUserStatus `}>
                  <span className="rightBarName">{friend.displayname}</span>
                </p>
              </div>
              <Link to="/messages" className="link-rightbar">
                <button className="rightBarButton">Chat</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Rightbar;
