import React, { useState, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';
import './Employee.css';
import EditCandidatePopup from '../../Component/popup/EditCandidatePopup';
import API from '../../util/api';
import AddLeavePopup from '../../Component/popup/AddLeavePopup';

const Employee = () => {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch employees from backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await API.get('/employee');
        setEmployees(response.data.employees || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employees:', error);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleEditCandidate = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSaveEmployee = (formData) => {
    const newEmployee = {
      id: String(employees.length + 1).padStart(2, '0'),
      name: formData.fullName,
      email: formData.emailAddress,
      phone: formData.phoneNumber,
      position: formData.position,
      department: formData.department || '--',
      status: 'New',
      experience: formData.experience,
      dateOfJoining: new Date().toLocaleDateString(),
    };

    setEmployees([...employees, newEmployee]);
    setShowPopup(false);
  };

  if (loading) {
    return <div className="content-area">Loading employees...</div>;
  }
console.log("employee data:",employees)
  return (
    <div className="content-area">
      {/* Filters */}
      <div className="filter-container">
        <div className="filter-group-can">
          <div className="select-container">
            <select className="select-with-border">
              <option>Position</option>
              <option>Designer</option>
              <option>Developer</option>
              <option>HR</option>
            </select>
            <div className="select-arrow">
              <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 
                     4a1 1 0 01-1.414 0l-4-4a1 1 0 
                     010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="spacer"></div>
      </div>

      {/* Table */}
      <div className="card-container">
        <table className="employees-table">
          <thead>
            <tr className="table-header">
              <th className="table-header-cell">Sr no.</th>
              <th className="table-header-cell">Employee Name</th>
              <th className="table-header-cell">Email Address</th>
              <th className="table-header-cell">Phone Number</th>
              <th className="table-header-cell">Position</th>
              <th className="table-header-cell">Department</th>
              <th className="table-header-cell">Date Of Joining</th>
              <th className="table-header-cell">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={emp._id || emp.id} className="table-row">
                <td className="table-cell">{index + 1}</td>
                <td className="table-cell">{emp.fullName || emp.name}</td>
                <td className="table-cell">{emp.email}</td>
                <td className="table-cell">{emp.phoneNumber || emp.phone}</td>
                <td className="table-cell">{emp.position}</td>
                <td className="table-cell">{emp.department}</td>
                <td className="table-cell">
                  {emp.createdAt
                    ? new Date(emp.createdAt).toLocaleDateString()
                    : emp.dateOfJoining}
                </td>
                <td className="table-cell">
                  <div className="action-menu-wrapper">
                    <button
                      className="action-button"
                      onClick={() =>
                        setOpenDropdownId(
                          openDropdownId === emp._id ? null : emp._id
                        )
                      }
                    >
                      <MoreVertical size={18} />
                    </button>
                    {openDropdownId === emp._id && (
                      <div className="dropdown-menu">
                        <button
                          className="dropdown-item"
                          onClick={handleEditCandidate}
                        >
                          Edit
                        </button>
                        <button className="dropdown-item">Delete</button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <EditCandidatePopup
          onClose={handleClosePopup}
          onSave={handleSaveEmployee}
        />
      )}
    </div>
  );
};

export default Employee;
