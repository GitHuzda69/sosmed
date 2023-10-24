import "./Rightbar.css";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";

import defaultprofile from "../../assets/profile/default_avatar.png";
import { useContext } from "react";
import AuthContext from "../../context/authContext";

const Rightbar = () => {
  const user = useContext(AuthContext)
   return (
    <div className="rightBar">
      <h2>People You Follow</h2>
      <div className="rightBarContainer">        
              <div key={user._id} className="rightBarItem">
                <div className="rightBarUser">
                  <div className="rightBarUserInfo">
                    <img
                      className="rightBarImg"
                      src={
                        user && user.profilePicture
                          ? "/data/" + user.profilePicture
                          : defaultprofile
                      }
                      alt={user.displayname}
                    />
                    <div className={`statusDot ${"grayDot"}`} />
                  </div>
                  <p className={`rightBarUserStatus `}>
                    <span className="rightBarName">{user.displayname}</span>
                  </p>
                </div>
              <Link to="/messages" className="link-rightbar">
                <button className="rightBarButton">Chat</button>
              </Link>
            </div>
      </div>
    </div>
  );
};

export default Rightbar;
