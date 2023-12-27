import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../component/Leftbar/Leftbar.js";
import Rightbar from "../../component/rightbar/Rightbar.js";
import SearchBar from "../../component/search/Search.js";
import Settings from "../../component/Settings/Settings.js";
import "./Result.css";
import "../../component/Settings/Settings.css";
import "../../component/Logout/Logout.css";
import Post from "../../component/post/Post.js";
import Upload from "../../component/Upload/Upload.js";
import Logout from "../../component/Logout/Logout.js";
import { makeRequest } from "../../fetch.js";
import FypSwitch from "../../component/fyp-button/fyp-switch.js";
import HomeProfile from "../../component/home-profile/home-profile.js";
import AuthContext from "../../context/authContext.js";
import { useParams } from "react-router";

const Result = () => {
  const [posts, setPosts] = useState([""]);
  const [settingOpen, setSettingOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { user: currentUser } = useContext(AuthContext);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [setShowSideContent] = useState(true);
  const [mainContentMaxWidth, setMainContentMaxWidth] = useState("100%");
  const [openPostOption, setOpenPostOption] = useState(null);
  const [friends, setFriends] = useState([]);
  const [isShowRightBar, setIsShowRightBar] = useState(true);
  const keyword = useParams().keyword;
  const isHomePage = true;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await makeRequest(`posts/search/${keyword}`);
        setPosts(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [keyword]);

  useEffect(() => {
    const storedDarkModeStatus = localStorage.getItem("isDarkMode") === "true";
    setIsDarkMode(storedDarkModeStatus);
    setDarkMode(storedDarkModeStatus);

    const handleZoomChange = () => {
      if (window.devicePixelRatio >= 1.5) {
        setShowSideContent(false);
        setMainContentMaxWidth("calc(100% - 340px)");
      } else {
        setShowSideContent(true);
        setMainContentMaxWidth("calc(100% - 340px)");
      }
    };
    window.addEventListener("resize", handleZoomChange);
    handleZoomChange();
    return () => {
      window.removeEventListener("resize", handleZoomChange);
    };
  }, [setShowSideContent]);

  useEffect(() => {
    if (currentUser && currentUser._id) {
      const getFriends = async () => {
        try {
          const friendList = await makeRequest("relationships/friends/" + currentUser._id);
          setFriends(friendList);
        } catch (err) {
          console.log(err);
        }
      };
      getFriends();
    }
  }, [currentUser]);

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

  const handleOpenPostOption = (postId) => {
    setOpenPostOption(postId);
  };

  const handleClosePostOption = () => {
    setOpenPostOption(null);
  };

  return (
    <>
      <div className={`app ${isDarkMode ? "dark-mode" : "light-mode"}`}>
        <div className="home">
          <div className="leftbar-fyp">
            <Sidebar isDarkMode={isDarkMode} toggleSettings={toggleSettings} toggleLogout={toggleLogout} isHomePage={isHomePage} setIsShowRightBar={setIsShowRightBar} />
          </div>
          <div className="main-content-fyp" style={{ maxWidth: mainContentMaxWidth }}>
            <div className="topbar-fyp">
              <FypSwitch />
              <SearchBar />
            </div>
            <div className="home-content-fyp">
              <Upload />
              <div className={`posts`}>
                {posts === "There no result"
                  ? "There is no result"
                  : posts.map(
                      (p) =>
                        p._id && (
                          <Post key={p._id} post={p} openPostOption={openPostOption} handleOpenPostOption={handleOpenPostOption} handleClosePostOption={handleClosePostOption} friends={friends} />
                        )
                    )}
              </div>
            </div>
            {isShowRightBar && (
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
            <Settings onClose={toggleSettings} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} isShowRightBar={isShowRightBar} setIsShowRightBar={setIsShowRightBar} />
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

export default Result;
