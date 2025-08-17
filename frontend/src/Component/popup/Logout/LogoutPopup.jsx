import React from "react";
import "./LogoutPopup.css"
import { useNavigate } from "react-router-dom";
const LogoutPopup = ({ onClose}) => {
    const navigate=useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("tokenExpiry")
        navigate("/login")
    }
  return (
    <div className="logout-popup-overlay">
      <div className="logout-popup-container">
        <div className="logout-popup-header">
          Log Out
        </div>
        <div className="logout-popup-body">
          Are you sure you want to log out?
        </div>
        <div className="logout-popup-actions">
          <button
            className="logout-cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="logout-confirm-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
