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
import FriendList from "../../component/friendlist/FriendsList.js";

import defaultprofile from "../../assets/profile/default_avatar.png";
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
  const [showPosts, setShowPosts] = useState(true);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showPopupUnfollow, setShowPopupUnfollow] = useState(false);
  const [showPopupFollow, setShowPopupFollow] = useState(false);
  const [showUnfollowConfirmation, setShowUnfollowConfirmation] =
    useState(false);

  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );

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
        // If already followed, show confirmation popup
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
      const friend = friends.map((id) => console.log(id._id));
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

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const togglePosts = () => {
    setShowPosts(true);
    setShowFollowing(false);
  };

  const toggleFollowing = () => {
    setShowPosts(false);
    setShowFollowing(true);
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
          <div
            className={`profil-container ${
              showPosts
                ? "profile-container-posts-view"
                : "profile-container-friends-view"
            }`}
          >
            <div className="cover-img">
              <div className="post-img-banner">
                <button
                  className="img-button"
                  onClick={() => setImagePopupOpenBanner(true)}
                >
                  <img
                    src={
                      user.coverPicture ? PF + user.coverPicture : defaultcover
                    }
                    alt="banner"
                  />
                </button>
              </div>
            </div>
            {imagePopupOpenbanner && (
              <div
                className="image-popup-profil"
                onClick={() => setImagePopupOpenBanner(false)}
              >
                <div className="popup-banner">
                  <img
                    className="popup-img-banner"
                    src={
                      user.coverPicture ? PF + user.coverPicture : defaultcover
                    }
                    alt=""
                  />
                </div>
              </div>
            )}
            <div className="profil-user">
              <div className="profil-info">
                <div className="profilePic">
                  <div className="post-img-profile">
                    <button
                      className="img-button-profile"
                      onClick={() => setImagePopupOpenProfile(true)}
                    >
                      <img
                        src={
                          user.profilePicture
                            ? PF + user.profilePicture
                            : defaultcover
                        }
                        alt="post-profile"
                      />
                    </button>
                  </div>
                </div>
                {imagePopupOpenprofile && (
                  <div
                    className="image-popup-profil"
                    onClick={() => setImagePopupOpenProfile(false)}
                  >
                    <div className="popup-profil">
                      <img
                        className="popup-img-profil"
                        src={
                          user.profilePicture
                            ? PF + user.profilePicture
                            : defaultcover
                        }
                        alt=""
                      />
                    </div>
                  </div>
                )}
                <div className="profil-bio">
                  <h2>{user && user.displayname}</h2>
                  <h4>
                    <Link to={`/friend/${username}`}>
                      <button>
                        {user.followers ? user.followers.length : "Loading"}{" "}
                        Follower
                      </button>
                    </Link>
                  </h4>
                </div>
              </div>
              <div className="profiluser-button">
                {user.username === currentUser.username ? (
                  <button
                    className="edit-profile-button"
                    onClick={openUpdateModal}
                  >
                    <Icon icon="bxs:edit" width={20} height={20} />
                    Edit Profile
                  </button>
                ) : (
                  <button className="follow-button" onClick={handleFollow}>
                    {followed ? (
                      <div className="following-profile">
                        <div className="followed-profile">
                          <Icon
                            icon="bi:person-check-fill"
                            width={20}
                            height={20}
                          />
                          Following
                        </div>
                        <div className="message-profile">
                          <Icon
                            icon="ion:chatbox-ellipses-outline"
                            width={20}
                            height={20}
                          />
                        </div>
                        <div className="share-profile">
                          <Icon
                            icon="basil:share-outline"
                            width={20}
                            height={20}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="follow-profile">
                        <Icon
                          icon="bi:person-plus-fill"
                          width={20}
                          height={20}
                        />
                        Follow
                      </div>
                    )}
                  </button>
                )}
              </div>
            </div>
            {showPosts && (
              <Posts username={username} className="posts-profile" />
            )}
          </div>
          <div className="rightProfile-Container">
            <div className="rightProfileBar">
              <div className="search-profile">
                <input
                  className="input-profile"
                  type="text"
                  placeholder="Search on Your profile"
                />
              </div>
              <div className="intro">
                <h2>Intro</h2>
                <h3>
                  <Icon icon="ep:info-filled" width={25} height={25} />
                  Joined
                  <span>{moment(user.createdAt).format("DD MMMM YYYY")}</span>
                </h3>
                <h3>
                  <Icon
                    icon="fluent:location-16-filled"
                    width={25}
                    height={25}
                  />
                  From
                  <span>{user?.city || "Earth"}</span>
                </h3>
                <h4>
                  {user?.desc ||
                    "This is your biodata, You can update it on the edit profile."}
                </h4>
              </div>
              <div className="friends-rec">
                {friends && friends.length === 0 ? (
                  <span className="friendlist-empty">
                    {user.username === currentUser.username
                      ? "You haven't followed anyone yet."
                      : `This user hasn't followed anyone yet.`}
                  </span>
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
                          <img
                            className="rightBarImgProfile"
                            src={
                              friend.profilePicture
                                ? PF + friend.profilePicture
                                : defaultprofile
                            }
                            alt=""
                          />
                          <div className={`statusDot ${"grayDot"}`} />
                        </div>
                        <div className="rightBarNameProfile">
                          <span>{friend.displayname}</span>
                          <p>{friend && truncateText(friend.desc, 20)}</p>
                        </div>
                      </Link>
                      <button
                        className="rightBarButtonProfile"
                        onClick={handleMessage}
                      >
                        Chat
                      </button>
                    </div>
                  ))
                ) : (
                  "Loading"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Sidebar toggleSettings={toggleSettings} toggleLogout={toggleLogout} />
      {showUnfollowConfirmation && (
        <div className="popup-follow-container">
          <div className="popup-follow">
            <p>
              Are you sure you want to unfollow {user && user.displayname} ?
            </p>
            <button
              onClick={handleUnfollowConfirmation}
              style={{ marginRight: "30px" }}
            >
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
