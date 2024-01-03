import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useParams } from "react-router";
import { makeRequest } from "../../fetch.js";
import { AuthContext } from "../../context/authContext.js";
import { Icon } from "@iconify/react";

import "./Profile.css";
import Posts from "../../component/posts/Posts.js";
import Sidebar from "../../component/Leftbar/Leftbar";
import Settings from "../../component/Settings/Settings";
import Logout from "../../component/Logout/Logout";
import Update from "../../component/Update/Update.js";
import RightbarProfile from "./RightbarProfile.js";
import Navbar from "../../component/navbar/navbar.js";

import defaultcover from "../../assets/profile/default_banner.jpg";

const Profile = () => {
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
  const [showPosts] = useState(true);
  const [setShowPopupUnfollow] = useState(false);
  const [showPopupFollow, setShowPopupFollow] = useState(false);
  const [showUnfollowConfirmation, setShowUnfollowConfirmation] = useState(false);
  const [isShowRightBar, setIsShowRightBar] = useState(true);
  const [isUploadVisible, setIsUploadVisible] = useState(false);
  const navigate = useNavigate();

  const [followed, setFollowed] = useState(currentUser.followings.includes(user._id));

  const isProfilePage = true;

  useEffect(() => {
    const isFollowing = currentUser.followings.includes(user._id);
    setFollowed(isFollowing);
  }, [currentUser.followings]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await makeRequest(`users?username=${username}`);
      setUser(res);
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
  }, [username]);

  const handleFollow = async () => {
    try {
      if (followed) {
        setShowUnfollowConfirmation(true);
      } else {
        await makeRequest(`relationships/${user._id}/follow`, "PUT", {
          userId: currentUser._id,
        });
        setShowPopupFollow(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
  const toggleUpload = () => {
    navigate("/", { state: { updateUploadVisibility: !isUploadVisible } });
    setIsUploadVisible(!isUploadVisible);
  };
  useEffect(() => {
    setIsUploadVisible(!isUploadVisible);
  }, [navigate]);

  return (
    <div className={isDarkMode ? "dark-mode" : "app"}>
      <div className="profile-main">
        <div className={isShowRightBar ? "profil" : "profil-norightbar"}>
          {!isShowRightBar && <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} toggleLogout={toggleLogout} />}
          {isShowRightBar ? (
            <div className={`profil-container ${showPosts ? "profile-container-posts-view" : "profile-container-friends-view"}`}>
              <div className={isShowRightBar ? "cover-img" : "cover-img-norightbar"}>
                <div className="post-img-banner">
                  <button className={isShowRightBar ? "img-button" : "img-button-norightbar"} onClick={() => setImagePopupOpenBanner(true)}>
                    <img src={user.coverPicture ? PF + user.coverPicture : defaultcover} alt="banner" />
                  </button>
                </div>
              </div>
              {imagePopupOpenbanner && (
                <div className="image-popup-profil" onClick={() => setImagePopupOpenBanner(false)}>
                  <div className="popup-banner">
                    <img className="popup-img-banner" src={user.coverPicture ? PF + user.coverPicture : defaultcover} alt="" />
                  </div>
                </div>
              )}
              <div className={isShowRightBar ? "profil-user" : "profil-user-norightbar"}>
                <div className="profil-info">
                  <div className="profilePic">
                    <div className="post-img-profile">
                      <button className="img-button-profile" onClick={() => setImagePopupOpenProfile(true)}>
                        <img src={user.profilePicture ? PF + user.profilePicture : defaultcover} alt="post-profile" />
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
                    <>
                      {followed ? (
                        <div className="following-profile">
                          <button className="follow-button" onClick={handleFollow}>
                            <div className="followed-profile">
                              <Icon icon="bi:person-check-fill" width={20} height={20} />
                              Following
                            </div>
                          </button>
                          <Link to="/messages" className="message-profile-link">
                            <div className="message-profile">
                              <Icon icon="ion:chatbox-ellipses-outline" width={20} height={20} />
                            </div>
                          </Link>
                        </div>
                      ) : (
                        <button className="follow-profile" onClick={handleFollow}>
                          <Icon icon="bi:person-plus-fill" width={20} height={20} />
                          Follow
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
              {showPosts && <Posts username={username} className={isShowRightBar ? "posts-profile" : "posts-profile-norightbar"} />}
            </div>
          ) : (
            <div className={`profil-container-norightbar ${showPosts ? "profile-container-posts-view-norightbar" : "profile-container-friends-view-norightbar"}`}>
              <div className={isShowRightBar ? "cover-img" : "cover-img-norightbar"}>
                <div className="post-img-banner">
                  <button className={isShowRightBar ? "img-button" : "img-button-norightbar"} onClick={() => setImagePopupOpenBanner(true)}>
                    <img src={user.coverPicture ? PF + user.coverPicture : defaultcover} alt="banner" />
                  </button>
                </div>
              </div>
              {imagePopupOpenbanner && (
                <div className="image-popup-profil" onClick={() => setImagePopupOpenBanner(false)}>
                  <div className="popup-banner">
                    <img className="popup-img-banner" src={user.coverPicture ? PF + user.coverPicture : defaultcover} alt="" />
                  </div>
                </div>
              )}
              <div className={isShowRightBar ? "profil-user" : "profil-user-norightbar"}>
                <div className="profil-info">
                  <div className="profilePic">
                    <div className="post-img-profile">
                      <button className="img-button-profile" onClick={() => setImagePopupOpenProfile(true)}>
                        <img src={user.profilePicture ? PF + user.profilePicture : defaultcover} alt="post-profile" />
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
                    <>
                      {followed ? (
                        <div className="following-profile">
                          <button className="follow-button" onClick={handleFollow}>
                            <div className="followed-profile">
                              <Icon icon="bi:person-check-fill" width={20} height={20} />
                              Following
                            </div>
                          </button>
                          <Link to="/messages" className="message-profile-link">
                            <div className="message-profile">
                              <Icon icon="ion:chatbox-ellipses-outline" width={20} height={20} />
                            </div>
                          </Link>
                        </div>
                      ) : (
                        <button className="follow-profile" onClick={handleFollow}>
                          <Icon icon="bi:person-plus-fill" width={20} height={20} />
                          Follow
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
              {showPosts && <Posts username={username} className={isShowRightBar ? "posts-profile" : "posts-profile-norightbar"} />}
            </div>
          )}
          {isShowRightBar && (
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
          )}
        </div>
      </div>
      <Sidebar
        isDarkMode={isDarkMode}
        toggleUpload={toggleUpload}
        toggleSettings={toggleSettings}
        toggleLogout={toggleLogout}
        isProfilePage={isProfilePage}
        isShowRightBar={isShowRightBar}
        setIsShowRightBar={setIsShowRightBar}
      />
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
