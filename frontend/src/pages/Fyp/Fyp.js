import React, { useState } from "react";
import Sidebar from "../../component/Leftbar/Leftbar.js";
import Rightbar from "../../component/rightbar/Rightbar.js";
import SearchBar from "../../component/search/Search";
import Settings from "../../component/Settings/Settings.js";
import "./Fyp.css";
import "../../component/Settings/Settings.css";
import "../../component/Logout/Logout.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Post from "../../component/post/Post.js";
import Upload from "../../component/Upload/Upload.js";
import Logout from "../../component/Logout/Logout.js";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";
import FypSwitch from "../../component/fyp-button/fyp-switch.js";
import HomeProfile from "../../component/home-profile/home-profile.js";

const queryClient = new QueryClient();

const Fyp = (post, className) => {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts/fyp?userid=" + userId).then((res) => {
      return res.data;
    })
  );
  const userId = post.userid;
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
        <div className="leftbar-fyp">
          <Sidebar
            toggleSettings={toggleSettings}
            toggleLogout={toggleLogout}
          />
        </div>
        <div className="main-content">
          <div className="topbar-fyp">
            <FypSwitch />
            <SearchBar />
          </div>
          <div className="home-content">
            <Upload />
            <div className={`posts ${className}`}>
              {error
                ? `Please login again to continue`
                : isLoading
                ? "loading"
                : data.map((post) => <Post post={post} key={post.id} />)}
            </div>
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
};

export default Fyp;
