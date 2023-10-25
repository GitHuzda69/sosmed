import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../component/Leftbar/Leftbar.js";
import Rightbar from "../../component/rightbar/Rightbar.js";
import SearchBar from "../../component/search/Search";
import Settings from "../../component/Settings/Settings.js";
import "./Fyp.css";
import "../../component/Settings/Settings.css";
import "../../component/Logout/Logout.css";
import Post from "../../component/post/Post.js";
import Upload from "../../component/Upload/Upload.js";
import Logout from "../../component/Logout/Logout.js";
import { makeRequest } from "../../axios.js";
import FypSwitch from "../../component/fyp-button/fyp-switch.js";
import HomeProfile from "../../component/home-profile/home-profile.js";
import AuthContext from "../../context/authContext.js";

const Fyp = (post, className, username) => {
  const [posts, setPosts] = useState([""]);
  const [settingOpen, setSettingOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const user = useContext(AuthContext)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await makeRequest.get(`posts/${post._id}`);
        setPosts([res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt)})]); 
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [post._id]);
  

  const toggleSettings = () => {
    setSettingOpen(!settingOpen);
  };

  const toggleLogout = () => {
    setLogoutOpen(!logoutOpen);
  };
  console.log(posts)
  return (
    <>
      <div className="home">
        <div className="leftbar-fyp">
          <Sidebar
            toggleSettings={toggleSettings}
            toggleLogout={toggleLogout}
          />
        </div>
        <div className="main-content">
          <div className="topbar-fyp">
            <FypSwitch />
            <SearchBar />
          </div>
          <div className="home-content">
            <Upload />
            <div className={`posts ${className}`}>
            {(!username || username === user.username)}
              {posts.map((p) => (
                <Post key={p._id} post={p} />
              ))}
            </div>
          </div>
          <div className="side-content">
            <HomeProfile />
            <Rightbar />
            <h5>
              Terms of Service Privacy Policy © 2023 Nama All rights reserved.
            </h5>
          </div>
        </div>
      </div>
      {settingOpen && (
        <>
          <div className="settings-overlay" />
          <div className="settings-container">
            <Settings onClose={toggleSettings} />
          </div>
        </>
      )}
      {logoutOpen && (
        <>
          <div className="popup-logout-container" />
          <div className="popup-logout">
            <Logout onClose={toggleLogout} />
          </div>
        </>
      )}
      </>
  );
};

export default Fyp;
