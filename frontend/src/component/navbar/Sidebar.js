import React from "react";
import "./Sidebar.css";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to='/home'>
      <button>
        <Icon icon="ic:round-home" width="40" height="40" />
      </button></Link>
      <Link to="/settings">
      <button>
      <Icon icon="clarity:settings-solid" width="40" height="40" />
      </button></Link>
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
      </button></Link>
      <Link to="/friend">
      <button>
        <Icon icon="fluent:people-community-20-filled" width="40" height="40" />
      </button></Link>
      <Link to='/'>
      <button>
      <Icon icon="material-symbols:logout" width="40" height="40"/>
      </button></Link>
    </div>
  );
};

export default Sidebar;
