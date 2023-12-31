import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./connect.css";
import { Icon } from "@iconify/react";
import AuthContext from "../../context/authContext";
import Sidebar from "../../component/Leftbar/Leftbar";
import HomeProfile from "../../component/home-profile/home-profile";
import Rightbar from "../../component/rightbar/Rightbar";
import Navbar from "../../component/navbar/navbar";
import Settings from "../../component/Settings/Settings";
import Logout from "../../component/Logout/Logout";
import { makeRequest } from "../../fetch";

const Connect = () => {
  const [settingOpen, setSettingOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user: currentUser } = useContext(AuthContext);
  const [isShowRightBar, setIsShowRightBar] = useState(true);
  const [isUploadVisible, setIsUploadVisible] = useState(false);
  const navigate = useNavigate();

  const isConnectPage = true;

  const handleFacebook = async () => {
    try {
      const res = await makeRequest("auth/facebook", "GET");
      window.close();
      window.open(res);
    } catch (err) {
      console.error(err);
    }
  };

  const disconnectFacebook = async () => {
    try {
      await makeRequest(`auth/facebook?email=${currentUser.email}`, "DELETE");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleSettings = () => {
    setSettingOpen(!settingOpen);
  };

  const toggleLogout = () => {
    setLogoutOpen(!logoutOpen);
  };

  const setDarkMode = (isDarkMode) => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  };

  useEffect(() => {
    const storedDarkModeStatus = localStorage.getItem("isDarkMode") === "true";
    setIsDarkMode(storedDarkModeStatus);

    setDarkMode(storedDarkModeStatus);
  }, []);

  const toggleDarkMode = () => {
    const newDarkModeStatus = !isDarkMode;
    setIsDarkMode(newDarkModeStatus);
    localStorage.setItem("isDarkMode", newDarkModeStatus.toString());
    setDarkMode(newDarkModeStatus);
  };

  useEffect(() => {
    const storedDarkModeStatus = localStorage.getItem("isDarkMode") === "true";
    setIsDarkMode(storedDarkModeStatus);
    setDarkMode(storedDarkModeStatus);

    const storedIsShowRightBar = localStorage.getItem("isShowRightBar");
    if (storedIsShowRightBar !== null) {
      setIsShowRightBar(JSON.parse(storedIsShowRightBar));
    }
  }, []);

  const toggleUpload = () => {
    navigate("/", { state: { updateUploadVisibility: !isUploadVisible } });
    setIsUploadVisible(!isUploadVisible);
  };
  useEffect(() => {
    setIsUploadVisible(!isUploadVisible);
  }, [navigate]);

  return (
    <div className={isDarkMode ? "dark-mode" : "app"}>
      <div className={isShowRightBar ? "connect-container" : "connect-container-norightbar"}>
        <h1>Connected Account</h1>
        <div className="connecth2">
          <Icon icon="iconamoon:information-circle-light" width={30} height={30} />
          <h2>These are the social accounts you connected to your SMD account to log in. You can always connect and disconnect the access here.</h2>
        </div>
        <div className="connect-content">
          <Icon icon="fa6-brands:x-twitter" width={40} height={40} />
          <div className="connect-name">
            <h2>Connect to X/Twitter</h2>
          </div>
          <button className="connect-button">Connect</button>
        </div>
        <div className="connect-content">
          <Icon icon="entypo-social:facebook" width={40} height={40} />
          <div className="connect-name">
            <h2> {currentUser.facebook && currentUser.facebook ? "Connected to Facebook" : "Connect to Facebook"}</h2>
            {currentUser && currentUser.facebook && <h3>{currentUser.facebook}</h3>}
          </div>
          {currentUser && currentUser.facebook ? (
            <button className="disconnect-button" onClick={disconnectFacebook}>
              Disconnect
            </button>
          ) : (
            <button className="connect-button" onClick={handleFacebook}>
              Connect
            </button>
          )}
        </div>
        <div className="connect-content">
          <Icon icon="streamline:instagram-solid" width={40} height={40} />
          <div className="connect-name">
            <h2>Connect to Instagram</h2>
          </div>
          <button className="connect-button">Connect</button>
        </div>
        <div className="connect-content">
          <Icon icon="gg:google" width={40} height={40} />
          <div className="connect-name">
            <h2>Connect to Google</h2>
          </div>
          <button className="connect-button">Connect</button>
        </div>
        <button className="disconnect-all-button">Disconnect all</button>
        {!isShowRightBar && <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} toggleLogout={toggleLogout} />}
        {isShowRightBar && (
          <div className="side-content">
            <HomeProfile />
            <Rightbar />
          </div>
        )}
        <Sidebar
          isDarkMode={isDarkMode}
          toggleUpload={toggleUpload}
          toggleSettings={toggleSettings}
          toggleLogout={toggleLogout}
          isConnectPage={isConnectPage}
          isShowRightBar={isShowRightBar}
          setIsShowRightBar={setIsShowRightBar}
        />
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
      </div>
    </div>
  );
};

export default Connect;
