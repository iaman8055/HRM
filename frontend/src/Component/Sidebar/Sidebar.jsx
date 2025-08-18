import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import logo from "../../assets/images/Logo_Small.svg";
import candidate from "../../assets/images/Candidate_Icon.svg";
import Attendance from "../../assets/images/Attendance_Icon.svg";
import leaves from "../../assets/images/leaves_Icon.svg";
import logout from "../../assets/images/logout_Icon.svg";
import LogoutPopup from "../popup/Logout/LogoutPopup";
import { Menu, X } from "lucide-react"; // For hamburger & close icons

const Sidebar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogoutClick = () => {
    setShowLogout(true);
  };

  return (
    <>
      {/* Hamburger Icon (Visible only on small screens) */}
      <div className="hamburger" onClick={() => setIsOpen(true)}>
        <Menu size={28} />
      </div>

      {/* Sidebar */}
      <div className={`sidebar-main ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <img src={logo} alt="Logo" />
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="logo-search">
          <input type="text" placeholder="Search" />
        </div>

        <div className="navigation">
          <p className="heading">Recruitment</p>
          <Link to="/" className="side-nav" onClick={() => setIsOpen(false)}>
            <img src={candidate} alt="Candidates" />
            <p className="text">Candidates</p>
          </Link>

          <p className="heading">Organisation</p>
          <Link
            to="/employees"
            className="side-nav"
            onClick={() => setIsOpen(false)}
          >
            <img src={candidate} alt="Employees" />
            <p className="text">Employees</p>
          </Link>
          <Link
            to="/attendance"
            className="side-nav"
            onClick={() => setIsOpen(false)}
          >
            <img src={Attendance} alt="Attendance" />
            <p className="text">Attendance</p>
          </Link>
          <Link
            to="/leaves"
            className="side-nav"
            onClick={() => setIsOpen(false)}
          >
            <img src={leaves} alt="Leaves" />
            <p className="text">Leaves</p>
          </Link>

          <p className="heading">Others</p>
          <div className="side-nav" onClick={handleLogoutClick}>
            <img src={logout} alt="Logout" />
            <p className="text">Logout</p>
          </div>
        </div>
      </div>

      {showLogout && (
        <LogoutPopup onClose={() => setShowLogout(false)} />
      )}
    </>
  );
};

export default Sidebar;
