import { useState, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import "./Employee.css";
import EditCandidatePopup from "../../Component/popup/Employee/EditCandidatePopup";
import { deleteEmployee, fetchEmployees, updateEmployee } from "../../util/redux/employee/employeeSlice";
import { useDispatch, useSelector } from "react-redux";

const Employee = () => {
  const dispatch = useDispatch();
  const { list: employees, loading, error } = useSelector(
    (state) => state.employees
  );

  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // ✅ Filter state
  const [positionFilter, setPositionFilter] = useState("");

  // Fetch employees on mount
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
  };

  const handleEditCandidate = (emp) => {
    setSelectedEmployee(emp);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedEmployee(null);
  };

  const handleSaveEmployee = (formData) => {
    const updatedData = {
      name: formData.fullName,
      email: formData.emailAddress,
      phone: formData.phoneNumber,
      position: formData.position,
      department: formData.department,
      status: "New",
      experience: formData.experience,
      dateOfJoining: new Date().toLocaleDateString(),
    };
    dispatch(updateEmployee({ id: selectedEmployee._id, data: updatedData }));
    setShowPopup(false);
  };

  if (loading) return <div className="content-area-e">Loading employees...</div>;
  if (error) return <div className="content-area-e">Error: {error}</div>;

  // ✅ Filter employees based on position
  const filteredEmployees = employees.filter(emp =>
    positionFilter ? emp.position.toLowerCase() === positionFilter.toLowerCase() : true
  );

  return (
    <div className="content-area-e">
      {/* Filters */}
      <div className="filter-container">
        <div className="filter-group-can">
          <div className="select-container">
            <select
              className="select-with-border"
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
            >
              <option value="">All Positions</option>
              <option value="Full Time">Full Time</option>
              <option value="Intern">Intern</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
              <option value="Team Lead">Team Lead</option>
            </select>
            <div className="select-arrow">
              <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 
                     4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
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
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp, index) => (
                <tr key={emp._id || emp.id} className="table-row">
                  <td className="table-cell">{index + 1}</td>
                  <td className="table-cell">{emp.fullName || emp.name}</td>
                  <td className="table-cell">{emp.email}</td>
                  <td className="table-cell">{emp.phoneNumber || emp.phone}</td>
                  <td className="table-cell">{emp.position}</td>
                  <td className="table-cell">{emp.department}</td>
                  <td className="table-cell">
                    {emp.createdAt
                      ? new Date(emp.dateofjoining).toLocaleDateString()
                      : emp.dateofjoining}
                  </td>
                  <td className="table-cell">
                    <div className="action-menu-wrapper">
                      <button
                        className="action-button"
                        onClick={() =>
                          setOpenDropdownId(openDropdownId === emp._id ? null : emp._id)
                        }
                      >
                        <MoreVertical size={18} />
                      </button>
                      {openDropdownId === emp._id && (
                        <div className="dropdown-menu">
                          <button
                            className="dropdown-item"
                            onClick={() => handleEditCandidate(emp)}
                          >
                            Edit
                          </button>
                          <button
                            className="dropdown-item"
                            onClick={() => handleDelete(emp._id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <p>No employees found.</p>
            )}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <EditCandidatePopup
          employee={selectedEmployee}   
          onClose={handleClosePopup}
          onSave={handleSaveEmployee}
        />
      )}
    </div>
  );
};

export default Employee;
