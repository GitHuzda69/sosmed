import React from "react";
import { Link } from "react-router-dom";
import { makeRequest } from "../../axios.js";

const Logout = ({ onClose }) => {
  const handleLogout = async () => {
    await makeRequest.post("http://localhost:8800/api/auth/logout")
      localStorage.removeItem("user");
    }
    return (
    <div className="popup-logout-container">
      <div className="logout-popup">
        <h3>Signing Out</h3>
        <p>Are you sure want to sign out?</p>
        <div className="logout-button">
          <Link to="/login">
          <button className="logout-button-logout" onClick={handleLogout}>
            Yes, Sign Out
          </button></Link>
          <button onClick={onClose} className="logout-button-close">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
