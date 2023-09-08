import React, { useState } from "react";
import Sidebar from "../../component/Leftbar/Leftbar.js";
import Rightbar from "../../component/rightbar/Rightbar.js";
import SearchBar from "../../component/search/Search";
import Settings from "../../component/Settings/Settings.js";
import "./Home.css";
import "../../component/Settings/Settings.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Posts from "../../component/posts/Posts";
import Upload from "../../component/Upload/Upload.js";

const queryClient = new QueryClient();

function Home() {
  const [settingOpen, setSettingOpen] = useState(false);

  const toggleSettings = () => {
    setSettingOpen(!settingOpen);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="home">
        <Sidebar toggleSettings={toggleSettings} />
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
      </div>
    </QueryClientProvider>
  );
}

export default Home;
