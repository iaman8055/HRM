import React, { useState, useRef, useEffect } from "react";
import { Calendar } from "lucide-react";
import "./AddLeavePopup.css";
import CalendarPicker from "../Calendar/CalendarPopup";
import API from "../../../util/api";

const AddLeavePopup = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    employeeId: "",
    fullName: "",
    designation: "",
    date: "",
    documents: "",
    reason: "",
  });

  const [showCalendar, setShowCalendar] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const calendarRef = useRef(null);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await API.get("/employee/status");
        const data = await res.data.employeeData;
        console.log("data:", data);
        setEmployees(data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };
    fetchEmployees();
  }, []);
const suggestionRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      calendarRef.current && !calendarRef.current.contains(event.target)
    ) {
      setShowCalendar(false);
    }
    if (
      suggestionRef.current &&
      !suggestionRef.current.contains(event.target)
    ) {
      setShowSuggestions(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "fullName") {
      if (value.trim() === "") {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }
      // filter employees
      const filtered = employees.filter((emp) =>
        emp.fullName.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    }
  };

  const handleSelectSuggestion = async (name) => {
    setFormData((prev) => ({ ...prev, fullName: name }));
    setShowSuggestions(false);

    try {
      const res = await API.get(
        `/employee/status/search?name=${encodeURIComponent(name)}`
      );
      const data = await res.data.employees[0];
      console.log("data:", data);
      if (data && data.department) {
        setFormData((prev) => ({ ...prev,employeeId: data._id,designation: data.department }));
      }
    } catch (err) {
      console.error("Error fetching employee details:", err);
    }
  };
  const handleFileUpload = (e) => {
    setFormData({
      ...formData,
      documents: e.target.files[0]
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  onSave(formData)
};


  const handleDateSelect = (date) => {
    const formatted = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    setFormData({ ...formData, date: formatted });
    setShowCalendar(false);
  };

  return (
    <div className="popup-overlay-leave">
      <div className="popup-container-leave">
        <div className="popup-header-leave">
          <p className="header-title-leave">Add New Leave</p>
          <button className="close-btn-leave" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="form-container-leave">
          <div className="form-row-leave">
            <div className="form-group-leave">
              <input
                type="search"
                name="fullName"
                placeholder="Full Name*"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="form-input-leave"
                onFocus={() => formData.fullName && setShowSuggestions(true)}
              />
              {showSuggestions && suggestions.length > 0 && (
                <ul className="suggestion-list-leave">
                  {suggestions.map((emp, idx) => (
                    <li
                      key={idx}
                      className="suggestion-item-leave"
                      onClick={() => handleSelectSuggestion(emp.fullName)}
                    >
                      {emp.fullName}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Designation input */}
            <div className="form-group-leave">
              <input
                type="text"
                name="department"
                placeholder="Designation*"
                value={formData.designation}
                onChange={handleInputChange}
                required
                className="form-input-leave" 
              />
            </div>
          </div>

          <div className="form-row-leave">
            <div className="form-group-leave" ref={calendarRef}>
              <input
                type="text"
                name="leaveDate"
                placeholder="Leave Date*"
                value={formData.date}
                readOnly
                required
                className="form-input-leave"
                onClick={() => setShowCalendar(!showCalendar)}
              />
              <div
                className="calendar-icon-leave"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                <Calendar size={20} />
              </div>
              {showCalendar && (
                <CalendarPicker onDateSelect={handleDateSelect} />
              )}
            </div>

            <div className="form-group-leave">
              <div className="file-upload-leave">
                <input
                  type="text"
                  placeholder="Documents"
                  readOnly
                  value={formData.documents}
                  className="form-input-leave"
                />
                <label className="upload-icon-leave">
                  📎
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="form-row-leave">
            <div className="form-group-leave">
              <input
                type="text"
                name="reason"
                placeholder="Reason*"
                value={formData.reason}
                onChange={handleInputChange}
                required
                className="form-input-leave"
              />
            </div>
          </div>
          <div className="form-actions-leave">
            <button
              type="submit"
              className="save-btn-leave"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLeavePopup;
