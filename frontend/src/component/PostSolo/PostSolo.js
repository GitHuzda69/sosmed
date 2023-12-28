import React, { useEffect, useState, useContext } from "react";
import { makeRequest } from "../../fetch";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import defaultprofile from "../../assets/profile/default_avatar.png";

import Sidebar from "../Leftbar/Leftbar";
import Navbar from "../navbar/navbar";
import Rightbar from "../rightbar/Rightbar";
import HomeProfile from "../home-profile/home-profile";
import AuthContext from "../../context/authContext";
import Settings from "../Settings/Settings";
import Logout from "../Logout/Logout";
import Commento from "../Commento/Commento";
import "./PostSolo.css";
import { Icon } from "@iconify/react";
import moment from "moment";

const PostSolo = () => {
  const [posts, setPosts] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const postid = useParams().postid;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isShowRightBar, setIsShowRightBar] = useState(true);
  const [like, setLike] = useState(posts.likes ? posts.likes.length : 0);
  const [settingOpen, setSettingOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedPostImg, setSelectedPostImg] = useState(null);
  const { user: currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchPost = async () => {
      const res = await makeRequest(`posts/posts/${postid}`);
      setPosts(res);
    };
    fetchPost();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await makeRequest(`posts/${postid}`);
      const hasil = await makeRequest(`users?userId=${res}`);
      setUserPosts(hasil);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const storedDarkModeStatus = localStorage.getItem("isDarkMode") === "true";
    setIsDarkMode(storedDarkModeStatus);
    setDarkMode(storedDarkModeStatus);
  });

  useEffect(() => {
    setIsLiked(posts.likes && posts.likes.includes(currentUser._id));
  }, [posts.likes]);

  const setDarkMode = (isDarkMode) => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  };

  const handleLike = async () => {
    try {
      await makeRequest(`likes/${posts._id}/like`, "PUT", {
        userId: currentUser._id,
      });

      await makeRequest(`notif`, "POST", {
        own: posts.userId,
        userId: currentUser._id,
        postId: posts._id,
        type: " liked your post",
      });

      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
    } catch (err) {
      console.error(err.message);
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

  const openPopup = (imgUrl) => {
    setSelectedPostImg(imgUrl);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedPostImg(null);
    setPopupOpen(false);
  };
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={isDarkMode ? "dark-mode" : "app"}>
      <div className="post-solo-container">
        <div className={isShowRightBar ? "post-solo" : "post-solo-norightbar"}>
          <div className="post-nav">
            <button onClick={handleGoBack}>
              <Icon icon="ic:round-arrow-back" width={30} height={30} />
            </button>
            <h2>{userPosts.displayname}'s Post</h2>
          </div>
          <div className="user-solo">
            <img src={PF + userPosts.profilePicture} alt="" />
            <div className="user-solo-info">
              <h3>{userPosts.displayname}</h3>
              <h4>{moment(posts.createdAt).fromNow()}</h4>
            </div>
          </div>
          <div className="post-solo-content">
            <div className="post-solo-caption">{posts.desc}</div>
            <div className="post-solo-img">
              <button className="img-button-post" onClick={() => openPopup(defaultprofile)}>
                {posts?.img ? <img src={PF + posts.img} /> : ""}
              </button>
            </div>
            <div className="post-solo-audio"></div>
          </div>
          <div className="item-solo">
            {isLiked ? (
              <div className="liked-post">
                <Icon className="icon" icon="iconamoon:like-fill" width={25} height={25} onClick={handleLike} />
                <h3>{like}</h3>
              </div>
            ) : (
              <div className="like-post">
                <Icon className="icon" icon="iconamoon:like-light" width={25} height={25} onClick={handleLike} />
                <h3>{like}</h3>
              </div>
            )}
          </div>
          <div className="commento-solo">
            <Commento postid={postid} />
          </div>
        </div>
        <div className="leftbar-solp">
          <Sidebar isDarkMode={isDarkMode} toggleSettings={toggleSettings} toggleLogout={toggleLogout} isShowRightBar={isShowRightBar} setIsShowRightBar={setIsShowRightBar} />
        </div>
        {!isShowRightBar && (
          <div className="solo-navbar">
            <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} toggleLogout={toggleLogout} />
          </div>
        )}
        {isShowRightBar && (
          <div className="side-content">
            <HomeProfile />
            <Rightbar />
          </div>
        )}
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
        {popupOpen && (
          <div className="popup-overlay-post" onClick={closePopup}>
            <div className="popup-post">{selectedPostImg && <img className="popup-image-post" src={selectedPostImg} alt="post-img" />}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostSolo;
