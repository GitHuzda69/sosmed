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
  const [user, setUser] = useState({});
  const [settingOpen, setSettingOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { user: currentUser } = useContext(AuthContext);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSideContent, setShowSideContent] = useState(true);
  const [mainContentMaxWidth, setMainContentMaxWidth] = useState("100%");

  const isHomePage = true;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await makeRequest.get("/posts/fyp");
        const postsData = res.data;

        postsData.sort((post1, post2) => post2.desc.length - post1.desc.length);
        setPosts(postsData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, []);

  useEffect(() => {
    if (post.userId) {
      const fetchUser = async () => {
        try {
          const res = await makeRequest.get(`/users?userId=${post.userId}`);
          setUser(res.data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchUser();
    }
  }, [post.userId]);

  useEffect(() => {
    const storedDarkModeStatus = localStorage.getItem("isDarkMode") === "true";
    setIsDarkMode(storedDarkModeStatus);
    setDarkMode(storedDarkModeStatus);

    const handleZoomChange = () => {
      if (window.devicePixelRatio >= 1.5) {
        setShowSideContent(false);
        setMainContentMaxWidth("100%");
      } else {
        setShowSideContent(true);
        setMainContentMaxWidth("calc(100% - 350px)");
      }
    };
    window.addEventListener("resize", handleZoomChange);
    handleZoomChange();
    return () => {
      window.removeEventListener("resize", handleZoomChange);
    };
  }, []);

  const setDarkMode = (isDarkMode) => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  };

  const toggleDarkMode = () => {
    const newDarkModeStatus = !isDarkMode;
    setIsDarkMode(newDarkModeStatus);
    localStorage.setItem("isDarkMode", newDarkModeStatus.toString());
    setDarkMode(newDarkModeStatus);
  };

  const toggleSettings = () => {
    setSettingOpen(!settingOpen);
  };

  const toggleLogout = () => {
    setLogoutOpen(!logoutOpen);
  };
  return (
    <>
      <div className={`app ${isDarkMode ? "dark-mode" : ""}`}>
        <div className="home">
          <div className="leftbar-fyp">
            <Sidebar
              toggleSettings={toggleSettings}
              toggleLogout={toggleLogout}
              isHomePage={isHomePage}
            />
          </div>
          <div
            className="main-content-fyp"
            style={{ maxWidth: mainContentMaxWidth }}
          >
            <div className="topbar-fyp">
              <FypSwitch />
              <SearchBar />
            </div>
            <div className="home-content-fyp">
              <Upload />
              <div className={`posts ${className}`}>
                {!username || username === user.username}
                {posts.map((p) => (
                  <Post key={p._id} post={p} />
                ))}
              </div>
            </div>
            {showSideContent && (
              <div className="side-content">
                <HomeProfile />
                <Rightbar />
              </div>
            )}
          </div>
        </div>
      </div>
      {settingOpen && (
        <>
          <div className="settings-overlay" />
          <div className="settings-container">
            <Settings
              onClose={toggleSettings}
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
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
