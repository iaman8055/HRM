import React, { useState, useRef, useEffect } from "react";
import { Calendar } from "lucide-react";
import "./AddLeavePopup.css";
import CalendarPicker from "./CalendarPopup";

const AddLeavePopup = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    department: "",
    dateOfJoining: "",
    documents: "",
    reason: "",
  });

  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleDateSelect = (date) => {
    const formatted = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    setFormData({ ...formData, dateOfJoining: formatted });
    setShowCalendar(false);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <p className="header-title">Add New Leave</p>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="form-container">
          <div className="form-row">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name*"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="form-input"
            />
            <input
              type="text"
              name="department"
              placeholder="Designation*"
              value={formData.department}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group" ref={calendarRef}>
              <input
                type="text"
                name="leaveDate"
                placeholder="Leave Date*"
                value={formData.dateOfJoining}
                readOnly
                required
                className="form-input"
                onClick={() => setShowCalendar(!showCalendar)}
              />
              <div
                className="calendar-icon"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                <Calendar size={20} />
              </div>
              {showCalendar && (
                <CalendarPicker onDateSelect={handleDateSelect} />
              )}
            </div>

            <div className="form-group">
              <div className="file-upload">
                <input
                  type="text"
                  placeholder="Documents"
                  readOnly
                  value={formData.documents}
                  className="form-input"
                />
                <label className="upload-icon">
                  📎
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const fileName = e.target.files[0]?.name || "";
                      setFormData({ ...formData, documents: fileName });
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group" >
              <input
                type="text"
                name="reason"
                placeholder="Reason*"
                value={formData.reason}
                onChange={handleInputChange}
                required
                className="form-input"
              />
             
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="save-btn" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLeavePopup;
