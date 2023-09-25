import React, { useState } from "react";
import { Icon } from "@iconify/react";

import "./fyp-switch.css";
import { Link } from "react-router-dom";

const FypSwitch = () => {
  return (
    <div className="fyp-switch">
      <Link
        className="link-fyp"
        style={{
          gap: "10px",
        }}
        to="/fyp"
      >
        <Icon icon="fluent:sparkle-48-filled" width={25} height={25} />
        For You
      </Link>
      <Link
        className="link-following"
        to="/"
        style={{
          gap: "10px",
        }}
      >
        <Icon icon="ic:round-people" width={25} height={25} />
        Following
      </Link>
    </div>
  );
};

export default FypSwitch;
