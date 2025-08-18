import { useState, useEffect } from "react";
import "./Employee.css";
import EditCandidatePopup from "../../Component/popup/Employee/EditCandidatePopup";
import { deleteEmployee, fetchEmployees, updateEmployee } from "../../util/redux/employee/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import EmployeeTable from "../../Component/Table/Employee/EmployeeTable";

const Employee = () => {
  const dispatch = useDispatch();
  const { list: employees, loading, error } = useSelector(
    (state) => state.employees
  );

  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [positionFilter, setPositionFilter] = useState("");

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
    setOpenDropdownId(null);
  };

  const handleEditCandidate = (emp) => {
    setSelectedEmployee(emp);
    setShowPopup(true);
    setOpenDropdownId(null);
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
      dateofjoining: formData.dateOfJoining,
    };
    dispatch(updateEmployee({ id: selectedEmployee._id, data: updatedData }));
    setShowPopup(false);
  };

  if (loading) return <div className="content-area-e">Loading employees...</div>;
  if (error) return <div className="content-area-e">Error: {error}</div>;

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
          </div>
        </div>
        <div className="spacer"></div>
      </div>

      <EmployeeTable
        employees={filteredEmployees}
        openDropdownId={openDropdownId}
        setOpenDropdownId={setOpenDropdownId}
        handleEditCandidate={handleEditCandidate}
        handleDelete={handleDelete}
      />

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
