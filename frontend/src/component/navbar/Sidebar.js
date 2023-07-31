import React from "react";
import "./Sidebar.css";
import { Icon } from "@iconify/react";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <button>
        <Icon icon="ic:round-home" width="40" height="40" />
      </button>
      <button>
        <Icon icon="fa:gear" width="30" height="30" />
      </button>
      <button>
        <Icon icon="bi:instagram" width="30" height="30" />
      </button>
      <button>
        <Icon icon="ic:baseline-facebook" width="40" height="40" />
      </button>
      <button>
        <Icon icon="mdi:twitter" width="40" height="40" />
      </button>
      <button>
        <Icon icon="ant-design:message-filled" width="35" height="35" />
      </button>
      <button>
        <Icon icon="fluent:people-community-20-filled" width="35" height="35" />
      </button>
    </div>
  );
};

export default Sidebar;
