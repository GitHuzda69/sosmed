import React, { useState, useRef, useEffect } from "react";
import profilimage from "../../assets/profil.jpg";
import "./notif.css";
import Sidebar from "../../component/Leftbar/Leftbar";
import Rightbar from "../../component/rightbar/Rightbar";
import HomeProfile from "../../component/home-profile/home-profile.js";
import Settings from "../../component/Settings/Settings";
import Logout from "../../component/Logout/Logout";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

function Notif() {
  const [settingOpen, setSettingOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const toggleSettings = () => {
    setSettingOpen(!settingOpen);
  };

  const toggleLogout = () => {
    setLogoutOpen(!logoutOpen);
  };

  return (
    <div className="main-notif">
      <h1>Notifications</h1>
      <div className="all-notif">ec</div>
      <HomeProfile />
      <Rightbar />
      <Sidebar toggleSettings={toggleSettings} toggleLogout={toggleLogout} />
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
}

export default Notif;
