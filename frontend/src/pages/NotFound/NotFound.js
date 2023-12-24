import React from "react";
import { Icon } from "@iconify/react";

import "./NotFound.css";

import notfound from "../../assets/error.png";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <img src={notfound} alt="" />
      <Link to="/" className="notfound-link">
        <button>Back To Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
