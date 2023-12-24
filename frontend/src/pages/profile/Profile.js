import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useParams } from "react-router";
import { makeRequest } from "../../fetch.js";
import { AuthContext } from "../../context/authContext.js";
import { Icon } from "@iconify/react";
import moment from "moment";

import "./Profile.css";
import Posts from "../../component/posts/Posts.js";
import Sidebar from "../../component/Leftbar/Leftbar";
import Settings from "../../component/Settings/Settings";
import Logout from "../../component/Logout/Logout";
import Update from "../../component/Update/Update.js";
import RightbarProfile from "./RightbarProfile.js";
import FriendList from "../../component/friendlist/FriendsList.js";

import defaultprofile from "../../assets/profile/default_avatar.png";
import defaultcover from "../../assets/profile/default_banner.jpg";

const Profile = (socket) => {
  const [imagePopupOpenbanner, setImagePopupOpenBanner] = useState(false);
  const [imagePopupOpenprofile, setImagePopupOpenProfile] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [user, setUser] = useState({});
  const [settingOpen, setSettingOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const username = useParams().username;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPosts, setShowPosts] = useState(true);
  const [showPopupUnfollow, setShowPopupUnfollow] = useState(false);
  const [showPopupFollow, setShowPopupFollow] = useState(false);
  const [showUnfollowConfirmation, setShowUnfollowConfirmation] = useState(false);
  const [isShowRightBar, setIsShowRightBar] = useState(true);

  const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));

  const isProfilePage = true;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await makeRequest(`users?username=${username}`);
      setUser(res);
      setFollowed(currentUser.followings.includes(res._id));
    };
    fetchUser();
  }, [username, currentUser.followings]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await makeRequest(`users?username=${username}`);
        const friendList = await makeRequest("relationships/friends/" + res._id, "GET");
        setFriends(friendList);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleFollow = async () => {
    try {
      if (followed) {
        setShowUnfollowConfirmation(true);
      } else {
        await makeRequest(`relationships/${user._id}/follow`, "PUT", {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
        setShowPopupFollow(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const handleMessage = async () => {
    try {
      const friend = friends.find((id) => id._id);
      await makeRequest(`conversations/`, "POST", {
        senderId: currentUser._id,
        receiverId: friend._id,
      });
      navigate("/messages");
    } catch (err) {
      console.log(err);
    }
  };

  const toggleSettings = () => {
    setSettingOpen(!settingOpen);
  };

  const toggleLogout = () => {
    setLogoutOpen(!logoutOpen);
  };

  const openUpdateModal = () => {
    setIsUpdateOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateOpen(false);
  };

  useEffect(() => {
    const storedDarkModeStatus = localStorage.getItem("isDarkMode") === "true";
    setIsDarkMode(storedDarkModeStatus);

    setDarkMode(storedDarkModeStatus);
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

  const handleUnfollowConfirmation = async () => {
    try {
      await makeRequest(`relationships/${user._id}/unfollow`, "PUT", {
        userId: currentUser._id,
      });
      dispatch({ type: "UNFOLLOW", payload: user._id });
      setShowUnfollowConfirmation(false);
      setShowPopupUnfollow(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelUnfollow = () => {
    setShowUnfollowConfirmation(false);
  };

  return (
    <div className={`app ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="profile-main">
        <div className="profil">
          <div className={`profil-container ${showPosts ? "profile-container-posts-view" : "profile-container-friends-view"}`}>
            <div className="cover-img">
              <div className="post-img-banner">
                <button className="img-button" onClick={() => setImagePopupOpenBanner(true)}>
                  <img src={user.coverPicture ? user.coverPicture : defaultcover} alt="banner" />
                </button>
              </div>
            </div>
            {imagePopupOpenbanner && (
              <div className="image-popup-profil" onClick={() => setImagePopupOpenBanner(false)}>
                <div className="popup-banner">
                  <img className="popup-img-banner" src={user.coverPicture ? user.coverPicture : defaultcover} alt="" />
                </div>
              </div>
            )}
            <div className="profil-user">
              <div className="profil-info">
                <div className="profilePic">
                  <div className="post-img-profile">
                    <button className="img-button-profile" onClick={() => setImagePopupOpenProfile(true)}>
                      <img src={user.profilePicture ? user.profilePicture : defaultcover} alt="post-profile" />
                    </button>
                  </div>
                </div>
                {imagePopupOpenprofile && (
                  <div className="image-popup-profil" onClick={() => setImagePopupOpenProfile(false)}>
                    <div className="popup-profil">
                      <img className="popup-img-profil" src={user.profilePicture ? PF + user.profilePicture : defaultcover} alt="" />
                    </div>
                  </div>
                )}
                <div className="profil-bio">
                  <h2>{user && user.displayname}</h2>
                  <h4>
                    <Link to={`/friend/${username}`}>
                      <button>{user.followers ? user.followers.length : "Loading"} Follower</button>
                    </Link>
                  </h4>
                </div>
              </div>
              <div className="profiluser-button">
                {user.username === currentUser.username ? (
                  <button className="edit-profile-button" onClick={openUpdateModal}>
                    <Icon icon="bxs:edit" width={20} height={20} />
                    Edit Profile
                  </button>
                ) : (
                  <button className="follow-button" onClick={handleFollow}>
                    {followed ? (
                      <div className="following-profile">
                        <div className="followed-profile">
                          <Icon icon="bi:person-check-fill" width={20} height={20} />
                          Following
                        </div>
                        <div className="message-profile">
                          <Icon icon="ion:chatbox-ellipses-outline" width={20} height={20} />
                        </div>
                        <div className="share-profile">
                          <Icon icon="basil:share-outline" width={20} height={20} />
                        </div>
                      </div>
                    ) : (
                      <div className="follow-profile">
                        <Icon icon="bi:person-plus-fill" width={20} height={20} />
                        Follow
                      </div>
                    )}
                  </button>
                )}
              </div>
            </div>
            {showPosts && <Posts username={username} className="posts-profile" socket={socket.socket} />}
          </div>
          <RightbarProfile
            user={currentUser}
            friends={friends}
            username={username}
            handleFollow={handleFollow}
            handleMessage={handleMessage}
            currentUser={currentUser}
            setShowUnfollowConfirmation={setShowUnfollowConfirmation}
            showUnfollowConfirmation={showUnfollowConfirmation}
            showPopupFollow={showPopupFollow}
          />
        </div>
      </div>
      <Sidebar toggleSettings={toggleSettings} toggleLogout={toggleLogout} isProfilePage={isProfilePage} setIsShowRightBar={setIsShowRightBar} socket={socket.socket} />
      {showUnfollowConfirmation && (
        <div className="popup-follow-container">
          <div className="popup-follow">
            <p>Are you sure you want to unfollow {user && user.displayname} ?</p>
            <button onClick={handleUnfollowConfirmation} style={{ marginRight: "30px" }}>
              Yes
            </button>
            <button onClick={handleCancelUnfollow}>Cancel</button>
          </div>
        </div>
      )}
      {showPopupFollow && (
        <div className="popup-follow-container">
          <div className="popup-follow">
            <p>You are now following {user && user.displayname} !</p>
            <button onClick={() => setShowPopupFollow(false)}>Close</button>
          </div>
        </div>
      )}
      {settingOpen && (
        <>
          <div className="settings-overlay" />
          <div className="settings-container">
            <Settings onClose={toggleSettings} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
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
      {isUpdateOpen && (
        <div>
          <div className="settings-overlay" />
          <Update onClose={closeUpdateModal} user={user} />
        </div>
      )}
    </div>
  );
};

export default Profile;
