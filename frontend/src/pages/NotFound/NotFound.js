import React from "react";
import { Icon } from "@iconify/react";

import "./NotFound.css";

import notfound from "../../assets/error.png";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <img src={notfound} alt="" />
    </div>
  );
};

export default NotFound;
