import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Logout = ({ onClose }) => {
  return (
    <div className="popup-logout-container">
      <div className="logout-popup">
        <h3>Signing Out</h3>
        <p>Are you sure want to sign out?</p>
        <div className="logout-button">
          <Link to="/login">
            <button className="logout-button-logout">Yes, Sign Out</button>
          </Link>
          <button onClick={onClose} className="logout-button-close">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
