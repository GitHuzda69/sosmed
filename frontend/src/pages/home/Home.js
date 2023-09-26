import React, { useState } from "react";
import Sidebar from "../../component/Leftbar/Leftbar.js";
import Rightbar from "../../component/rightbar/Rightbar.js";
import SearchBar from "../../component/search/Search";
import Settings from "../../component/Settings/Settings.js";
import "./Home.css";
import "../../component/Settings/Settings.css";
import "../../component/Logout/Logout.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Posts from "../../component/posts/Posts";
import Upload from "../../component/Upload/Upload.js";
import Logout from "../../component/Logout/Logout.js";
import FypSwitch from "../../component/fyp-button/fyp-switch.js";
import HomeProfile from "../../component/home-profile/home-profile.js";

const queryClient = new QueryClient();

function Home() {
  const [settingOpen, setSettingOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const toggleSettings = () => {
    setSettingOpen(!settingOpen);
  };

  const toggleLogout = () => {
    setLogoutOpen(!logoutOpen);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="home">
        <div className="leftbar">
          <Sidebar
            toggleSettings={toggleSettings}
            toggleLogout={toggleLogout}
          />
        </div>
        <div className="main-content">
          <div className="topbar">
            <FypSwitch />
            <SearchBar />
          </div>
          <div className="home-content">
            <Upload />
            <Posts />
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
    </QueryClientProvider>
  );
}

export default Home;
