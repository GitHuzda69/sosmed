import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext.js";
import { Icon } from "@iconify/react";
import "./FriendsList.css";
import Sidebar from "../../component/Leftbar/Leftbar";
import Settings from "../../component/Settings/Settings";
import Logout from "../../component/Logout/Logout";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";
import { useLocation, Link } from "react-router-dom";

import defaultprofile from "../../assets/profile/default_avatar.png";
import defaultcover from "../../assets/profile/default_banner.jpg";

const FriendList = ({ relationships }) => {
  const { currentUser } = useContext(AuthContext);
  const [popupPosition, setPopupPosition] = useState({
    visible: false,
    top: 0,
    left: 0,
  });

  const {
    isLoading,
    error,
    data: friendData,
  } = useQuery(["friend"], () =>
    makeRequest.get("/friends").then((res) => {
      return res.data;
    })
  );

  const [settingOpen, setSettingOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const isFriendListPage = true;

  const toggleSettings = () => {
    setSettingOpen(!settingOpen);
  };
  const toggleLogout = () => {
    setLogoutOpen(!logoutOpen);
  };
  return (
    <div className="friendlist-main">
      <div className="friendlist-container">
        <div className="friendlist-header">
          <h2 style={{ flex: 1 }}>Following Lists</h2>
          <button className="button-info">
            <Icon
              icon="fluent:person-alert-20-filled"
              color="black"
              width={25}
              height={25}
            />
          </button>
        </div>
        <div className="friendlist">
          {error ? (
            `Something went wrong`
          ) : isLoading ? (
            "Loading"
          ) : friendData.length === 0 ? (
            <span className="friendlist-empty">
              You didn't follow anyone yet. You can find someone in FYP pages.
            </span>
          ) : (
            friendData.map((friend) => (
              <div className="friend" key={friend.userid}>
                <Link
                  to={`/profile/${friend.userid}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  className="profileavatar"
                >
                  <img
                    className="friend-cover"
                    src={
                      friend && friend.coverpic
                        ? "/data/" + friend.coverpic
                        : defaultcover
                    }
                    alt={friend.displayname}
                  />
                  <div className="friend-avatar">
                    <img
                      src={
                        friend && friend.profilepic
                          ? "/data/" + friend.profilepic
                          : defaultprofile
                      }
                      alt={friend.displayname}
                      className="avatar"
                    />
                  </div>
                </Link>
                <div className="friend-info-details">
                  <h3>{friend.displayname}</h3>
                  <button className="button-popup">
                    <Icon icon="tabler:dots" width={20} height={20} />
                  </button>
                  <div className="friend-follower">
                    <h3>234</h3>
                    <h4>Following</h4>
                    <h3>4334</h3>
                    <h4>Followers</h4>
                  </div>
                </div>
                <div className="friend-desc">
                  <p>{friend.biodata}</p>
                </div>
              </div>
            ))
          )}
        </div>
        {popupPosition.visible && (
          <div
            className="popup"
            style={{
              top: `${popupPosition.top}px`,
              left: `${popupPosition.left}px`,
            }}
          >
            <button className="icon-button">
              <Icon icon="heroicons-solid:chat" width={25} height={25} />
              Messages
            </button>
            <button className="icon-button">
              <Icon icon="bi:person-dash-fill" width={20} height={20} />
              Unfriend
            </button>
            <button className="icon-button" style={{ color: "red" }}>
              <Icon icon="bi:person-x-fill" width={20} height={20} />
              Block
            </button>
          </div>
        )}
      </div>
      <Sidebar
        toggleSettings={toggleSettings}
        toggleLogout={toggleLogout}
        isFriendListPage={isFriendListPage}
      />
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
    </div>
  );
};

export default FriendList;
