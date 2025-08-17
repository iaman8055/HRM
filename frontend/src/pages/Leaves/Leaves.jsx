import React, { useEffect, useState } from "react";
import "./Leaves.css";
import AddLeavePopup from "../../Component/popup/Leave/AddLeavePopup";
import API from "../../util/api";
import { useDispatch, useSelector } from "react-redux";
import { addLeave, fetchLeaves, updateLeaveStatus } from "../../util/redux/leave/leaveSlice";

const LeaveManagementSystem = () => {
const dispatch = useDispatch();
  const { leaves, loading } = useSelector((state) => state.leave);
  const [showPopUp, setShowPopup] = useState(false);
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  useEffect(() => {
    dispatch(fetchLeaves());
  }, [dispatch]);

  const updateStatus = (leaveId, status) => {
    dispatch(updateLeaveStatus({ leaveId, status }));
  };

  const handleAddLeave = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  const handleSaveLeave = (formData) => {
    dispatch(addLeave(formData));
    setShowPopup(false);
  };

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];
  const dayNames = ["S","M","T","W","T","F","S"];

  const changeMonth = (dir) => {
    if (dir > 0) {
      if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1);}
      else setCurrentMonth(currentMonth + 1);
    } else {
      if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1);}
      else setCurrentMonth(currentMonth - 1);
    }
  };

  const getLeaveCountForDate = (day) => {
    return leaves.filter(
      (l) =>
        l.status === "approved" &&
        new Date(l.date).getDate() === day &&
        new Date(l.date).getMonth() === currentMonth &&
        new Date(l.date).getFullYear() === currentYear
    ).length;
  };

  const renderCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const days = [];

    dayNames.forEach((d, i) => days.push(<div key={`h-${i}`} className="calendar-day-header">{d}</div>));
    for (let i = 0; i < firstDay; i++) days.push(<div key={`e-${i}`} className="calendar-day"></div>);

    for (let day = 1; day <= daysInMonth; day++) {
      const leaveCount = getLeaveCountForDate(day);
      days.push(
        <div key={day} className={`calendar-day ${leaveCount > 0 ? "has-leaves" : ""}`} data-leave-count={leaveCount || ""}>
          {day}{leaveCount > 0 && <span className="leave-count-badge">{leaveCount}</span>}
        </div>
      );
    }
    return days;
  };

  if (loading) return <div className="content-area-a">Loading...</div>;

  const approvedLeaves = leaves.filter((l) => l.status === "approved");

  return (
    <div className="leave-management-wrapper">
      <div className="filter-container">
        <div className="filter-group">
          <div className="select-container">
            <select className="select-can">
              <option>Status</option>
              <option>New</option>
              <option>Selected</option>
              <option>Rejected</option>
            </select>
            <div className="select-arrow">
              <svg
                width="12"
                height="12"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="select-container">
            <select className="select-with-border">
              <option>Position</option>
              <option>Designer</option>
              <option>Developer</option>
              <option>HR</option>
            </select>
            <div className="select-arrow">
              <svg
                width="12"
                height="12"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="spacer"></div>
        <button className="add-button" onClick={handleAddLeave}>
          Add Leave
        </button>
      </div>
      <div className="leave-management-grid">
        {/* Applied Leaves Table */}
        <div className="leave-card">
          <div className="leave-card-header">Applied Leaves</div>
          <div className="leave-table-wrapper">
            <div className="leave-table-header">
              <div>Profile</div>
              <div>Name</div>
              <div>Date</div>
              <div>Reason</div>
              <div>Status</div>
              <div>Docs</div>
            </div>
            {leaves.map((leave) => (
              <div key={leave._id} className="leave-row">
                <div>
                  <img
                    src={leave.profilePic}
                    alt={leave.fullName}
                    className="leave-profile-pic"
                  />
                </div>
                <div>
                  <div className="leave-name">{leave.fullName}</div>
                  <div className="leave-position">{leave.position}</div>
                </div>
                <div>{new Date(leave.date).toLocaleDateString()}</div>
                <div>{leave.reason}</div>
                <div>
                  <select
                    value={leave.status}
                    onChange={(e) => updateStatus(leave._id, e.target.value)}
                    className={`leave-status-select leave-status-${leave.status}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div>📄</div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div className="calendar-card">
          <div className="calendar-card-header">Leave Calendar</div>
          <div className="calendar-content">
            <div className="calendar-header">
              <button
                className="calendar-button"
                onClick={() => changeMonth(-1)}
              >
                ‹
              </button>
              <h3>
                {monthNames[currentMonth]}, {currentYear}
              </h3>
              <button
                className="calendar-button"
                onClick={() => changeMonth(1)}
              >
                ›
              </button>
            </div>
            <div className="calendar-grid">{renderCalendarDays()}</div>

            <div className="approved-leaves-list">
              <h4>Approved Leaves</h4>
              {approvedLeaves.map((l) => (
                <div key={l._id} className="approved-leave-item">
                  <img src={l.profilePic} alt={l.fullName} />
                  <div className="approved-leave-info">
                    <div className="approved-leave-name">{l.fullName}</div>
                    <div className="approved-leave-position">{l.position}</div>
                  </div>
                  <div className="approved-leave-date">{new Date(l.date).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showPopUp && (
        <AddLeavePopup onClose={handleClosePopup} onSave={handleSaveLeave} />
      )}
    </div>
  );
};

export default LeaveManagementSystem;
