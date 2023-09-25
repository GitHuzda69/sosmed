import React, { useState, useContext } from "react";
import "./Leftbar.css";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";
import Settings from "../Settings/Settings";

import defaultprofile from "../../assets/profile/default_avatar.png";
import logo from "../../assets/Logo_BNW.jpg";

const Sidebar = ({ toggleSettings, toggleLogout }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="sidebar">
      <div className="content-sidebar">
        <img className="sidebar-logo" src={logo} alt="BNW logo" />
        <Link to="/">
          <button>
            <Icon
              icon="octicon:home-fill-24"
              width="35"
              height="35"
              color="white"
            />
          </button>
        </Link>
        <button>
          <Icon icon="cil:bell" width="35" height="35" color="white" />
        </button>
        <Link to="/messages">
          <button>
            <Icon icon="bx:chat" width="35" height="35" color="white" />
          </button>
        </Link>
        <Link to="/friend">
          <button>
            <Icon icon="ic:round-people" width="35" height="35" color="white" />
          </button>
        </Link>
        <button onClick={toggleSettings}>
          <Icon
            icon="solar:settings-outline"
            width="35"
            height="35"
            color="white"
          />
        </button>
        <button onClick={toggleLogout}>
          <Icon icon="tabler:logout" width="35" height="35" color="white" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
