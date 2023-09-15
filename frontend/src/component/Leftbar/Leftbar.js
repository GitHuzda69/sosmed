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
            <Icon icon="octicon:home-fill-24" width="40" height="40" />
          </button>
        </Link>
        <Link to="/messages">
          <button>
            <Icon icon="jam:messages-f" width="40" height="40" />
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
        <button>
          <Icon icon="brandico:facebook-rect" width="38" height="38" />
        </button>
        <button>
          <Icon icon="ri:instagram-fill" width="42" height="42" />
        </button>
        <button>
          <Icon icon="mdi:twitter" width="40" height="40" />
        </button>
        <button onClick={toggleSettings}>
          <Icon icon="solar:settings-bold" width="40" height="40" />
        </button>
        <button onClick={toggleLogout}>
          <Icon icon="tabler:logout" width="40" height="40" />
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
              src={"/data/" + currentUser.profilepic}
              alt="keren"
            />
          </div>
        </Link>
        <span>{currentUser.displayname}</span>
      </div>
    </div>
  );
};

export default Sidebar;
