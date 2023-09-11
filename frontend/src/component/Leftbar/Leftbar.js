import React, { useState, useContext } from "react";
import "./Leftbar.css";
import avatar from "../../assets/profil.jpg";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";
import Settings from "../Settings/Settings";

const Sidebar = ({ toggleSettings, toggleLogout }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="sidebar">
      <div className="content-sidebar">
        <Link to="/">
          <button>
            <Icon icon="ic:round-home" width="40" height="40" />
          </button>
        </Link>
        <button onClick={toggleSettings}>
          <Icon icon="clarity:settings-solid" width="40" height="40" />
        </button>
        <button>
          <Icon icon="bi:instagram" width="40" height="40" />
        </button>
        <button>
          <Icon icon="ic:baseline-facebook" width="40" height="40" />
        </button>
        <button>
          <Icon icon="mdi:twitter" width="40" height="40" />
        </button>
        <Link to="/messages">
          <button>
            <Icon icon="ant-design:message-filled" width="40" height="40" />
          </button>
        </Link>
        <Link to="/friend">
          <button>
            <Icon
              icon="fluent:people-community-20-filled"
              width="40"
              height="40"
            />
          </button>
        </Link>
        <button onClick={toggleLogout}>
          <Icon icon="material-symbols:logout" width="40" height="40" />
        </button>
      </div>
      <div className="sidebar-user">
        <Link
          to={`/profile/${currentUser.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
          className="profileavatar"
        >
          <div className="leftBarUser">
            <img
              className="profile2"
              src={currentUser.profilepic}
              alt="keren"
            />
          </div>
        </Link>
        <span>{currentUser.username}</span>
      </div>
    </div>
  );
};

export default Sidebar;
