import React, { useEffect, useState } from "react";
import "./Leaves.css";
import AddLeavePopup from "../../Component/popup/Leave/AddLeavePopup";
import { useDispatch, useSelector } from "react-redux";
import { addLeave, fetchLeaves, updateLeaveStatus } from "../../util/redux/leave/leaveSlice";
import LeaveTable from "../../Component/Table/Leave/LeaveTable";
import LeaveCalendar from "../../Component/Calendar/LeaveCalender";


const LeaveManagementSystem = () => {
  const dispatch = useDispatch();
  const { leaves, loading } = useSelector((state) => state.leave);

  const [showPopUp, setShowPopup] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
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

  if (loading) return <div className="content-area-a">Loading...</div>;

  const filteredLeaves = leaves.filter(
    (l) => statusFilter ? l.status.toLowerCase() === statusFilter.toLowerCase() : true
  );

  return (
    <div className="leave-management-wrapper">
      {/* Filters */}
      <div className="filter-container">
        <div className="filter-group">
          <div className="select-container">
            <select
              className="select-can"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
        <div className="spacer"></div>
        <button className="add-button" onClick={handleAddLeave}>Add Leave</button>
      </div>

      <div className="leave-management-grid">
        <LeaveTable leaves={filteredLeaves} updateStatus={updateStatus} />
        <LeaveCalendar
          leaves={filteredLeaves}
          currentMonth={currentMonth}
          currentYear={currentYear}
          setCurrentMonth={setCurrentMonth}
          setCurrentYear={setCurrentYear}
        />
      </div>

      {showPopUp && (
        <AddLeavePopup onClose={handleClosePopup} onSave={handleSaveLeave} />
      )}
    </div>
  );
};

export default LeaveManagementSystem;
