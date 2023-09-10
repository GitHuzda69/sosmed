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
        <Sidebar toggleSettings={toggleSettings} toggleLogout={toggleLogout} />
        <SearchBar />
        <Rightbar />
        <Upload />
        <Posts />
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
    </QueryClientProvider>
  );
}

export default Home;
