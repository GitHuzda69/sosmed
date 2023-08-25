import React from "react";
import "./Leftbar.css";
import avatar from "../../assets/profil.jpg";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Sidebar = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <Link to="/">
        <button>
          <Icon icon="ic:round-home" width="40" height="40" />
        </button>
      </Link>
      <Link to="/settings">
        <button>
          <Icon icon="clarity:settings-solid" width="40" height="40" />
        </button>
      </Link>
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
      <Link to="/login">
        <button>
          <Icon icon="material-symbols:logout" width="40" height="40" />
        </button>
      </Link>
      <Link
        to={"/profile/${post.userId}"}
        style={{ textDecoration: "none", color: "inherit" }}
        className="profileavatar"
      ><div className="leftBarUser">
        <img className="profile2" src={avatar} alt="" />
        </div>
      </Link>
        <span>{currentUser.name}</span>
    </div>
  );
};

export default Sidebar;
