import React, { useRef, useState } from 'react';
import '../Candidate/AddCandidatePopup.css';
import { Calendar } from "lucide-react";
import CalendarPicker from '../Calendar/CalendarPopup';

const EditCandidatePopup = ({employee, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: employee?.fullName || '',
    emailAddress: employee?.email || '',
    phoneNumber: employee?.phoneNumber || '',
    department: employee?.department || '',
    position: employee?.position || '',
    dateOfJoining: employee?.dateofjoining 
      ? new Date(employee.dateofjoining).toISOString().split("T")[0]
      : '',
    agreeToTerms: false,
  });
const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
const handleDateSelect = (date) => {
    const formatted = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    setFormData({ ...formData, dateOfJoining: formatted });
    setShowCalendar(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <p>Edit Employee Details</p>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name*"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="emailAddress"
                placeholder="Email Address*"
                value={formData.emailAddress}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number*"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="department"
                placeholder="Department*"
                value={formData.department}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                name="position"
                placeholder="Position*"
                value={formData.position}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group" ref={calendarRef}>
              <input
                type="text"
                name="dateOfJoining"
                placeholder="Date of Joining*"
                value={formData.dateOfJoining}
                onChange={handleInputChange}
                required
                className="form-input"
                onClick={() => setShowCalendar(!showCalendar)}

              />
                <div
                className="calendar-icon-e"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                <Calendar size={20} />
              </div>
              {showCalendar && (
                <CalendarPicker onDateSelect={handleDateSelect} />
              )}
            </div>
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              name="agreeToTerms"
              id="agree-terms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="agree-terms">
              I hereby declare that the above information is true to the best of my knowledge and belief
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCandidatePopup;
