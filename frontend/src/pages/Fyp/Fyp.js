import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { makeRequest } from "../../fetch.js";
import FypSwitch from "../../component/fyp-button/fyp-switch.js";
import HomeProfile from "../../component/home-profile/home-profile.js";
import Navbar from "../../component/navbar/navbar.js";
import AuthContext from "../../context/authContext.js";

const Fyp = () => {
  const [posts, setPosts] = useState([""]);
  const [settingOpen, setSettingOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { user: currentUser } = useContext(AuthContext);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [openPostOption, setOpenPostOption] = useState(null);
  const [friends, setFriends] = useState([]);
  const [isShowRightBar, setIsShowRightBar] = useState(true);
  const [isUploadVisible, setIsUploadVisible] = useState(false);
  const isFypPage = true;
  const isHomePage = true;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await makeRequest("posts");
        res.sort((post1, post2) => post2.desc.length - post1.desc.length);
        setPosts(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, []);

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

  useEffect(() => {
    const storedDarkModeStatus = localStorage.getItem("isDarkMode") === "true";
    setIsDarkMode(storedDarkModeStatus);
    setDarkMode(storedDarkModeStatus);

    const storedIsShowRightBar = localStorage.getItem("isShowRightBar");
    if (storedIsShowRightBar !== null) {
      setIsShowRightBar(JSON.parse(storedIsShowRightBar));
    }
  }, []);

  const toggleUpload = () => {
    navigate("/", { state: { updateUploadVisibility: !isUploadVisible } });
    setIsUploadVisible(!isUploadVisible);
  };
  useEffect(() => {
    setIsUploadVisible(!isUploadVisible);
  }, [navigate]);

  return (
    <>
      <div className={isDarkMode ? "dark-mode" : "app"}>
        <div className="leftbar-fyp">
          <Sidebar
            isDarkMode={isDarkMode}
            toggleUpload={toggleUpload}
            toggleSettings={toggleSettings}
            toggleLogout={toggleLogout}
            isHomePage={isHomePage}
            isShowRightBar={isShowRightBar}
            setIsShowRightBar={setIsShowRightBar}
          />
        </div>
        <div className={`main-content ${!isShowRightBar ? "no-right-bar-fyp" : ""}`}>
          {!isShowRightBar && (
            <div className="fyp-navbar">
              <Navbar isFypPage={isFypPage} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} toggleLogout={toggleLogout} />
            </div>
          )}
          {isShowRightBar && (
            <div className="topbar-fyp">
              <FypSwitch />
              <SearchBar />
            </div>
          )}
          <div className="home-content-fyp">
            <div className={`posts`}>
              {posts.map(
                (p) =>
                  p._id && <Post key={p._id} post={p} openPostOption={openPostOption} handleOpenPostOption={handleOpenPostOption} handleClosePostOption={handleClosePostOption} friends={friends} />
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

export default Fyp;
