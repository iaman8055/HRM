import { useState, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import EditemployeePopup from "../../Component/popup/Employee/EditCandidatePopup";
import "./Attendance.css";
import API from "../../util/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchAttendance, updateEmployeeStatus } from "../../util/redux/attendance/attendanceSlice";

const Attendance = () => {
  const [employee, setemployee] = useState([]);
 const dispatch = useDispatch();
  const { employees, loading } = useSelector((state) => state.attendance);

  const [showPopup, setShowPopup] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  useEffect(() => {
    dispatch(fetchAttendance());
  }, [dispatch]);

  const getStatusClass = (status) => {
    switch (status) {
      case "present":
        return "status present";
      case "absent":
        return "status absent";
      default:
        return "status-dropdown present";
    }
  };

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateEmployeeStatus({ id, status: newStatus.toLowerCase() }));
  };

  if (loading) return <div className="content-area-a">Loading...</div>;


  const handleEditemployee = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSaveemployee = (formData) => {
    const newId = String(employee.length + 1).padStart(2, "0");
    const newemployee = {
      id: newId,
      name: formData.fullName,
      email: formData.emailAddress,
      phone: formData.phoneNumber,
      position: formData.position,
      status: "Present",
      experience: formData.experience,
    };
    setemployee([...employee, newemployee]);
    setShowPopup(false);
  };

  return (
    <div className="content-area-a">
      {/* Filters */}
      <div className="filter-container">
        <div className="filter-group">
          <div className="select-container">
            <select className="select-one">
              <option>Present</option>
              <option>Absent</option>
              <option>Medical Leave</option>
              <option>Work From Home</option>
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
      </div>

      {/* Table */}
      <div className="card-container">
        <table className="employees-table">
          <thead>
            <tr className="table-header">
              <th className="table-header-cell">Sr no.</th>
              <th className="table-header-cell">Employee Name</th>
              <th className="table-header-cell">Position</th>
              <th className="table-header-cell">Department</th>
              <th className="table-header-cell">Task</th>
              <th className="table-header-cell">Status</th>
              <th className="table-header-cell">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee._id} className="table-row">
                <td className="table-cell">{index + 1}</td>
                <td className="table-cell">{employee.fullName}</td>
                <td className="table-cell">{employee.position}</td>
                <td className="table-cell">{employee.department}</td>
                <td className="table-cell">{employee.task || "--"}</td>
                <td className="table-cell">
                  <div className="status-dropdown-container">
                    <select
                      className={getStatusClass(employee.status)}
                      value={employee.status}
                      onChange={(e) =>
                        handleStatusChange(
                        employee._id,
                          e.target.value
                        )
                      }
                    >
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                    </select>
                    <div className="dropdown-arrow">
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
                </td>
                <td className="table-cell">
                  <div className="action-menu-wrapper">
                    <button
                      className="action-button"
                      onClick={() =>
                        setOpenDropdownId(
                          openDropdownId === (employee.id || employee._id)
                            ? null
                            : employee.id || employee._id
                        )
                      }
                    >
                      <MoreVertical size={18} />
                    </button>
                    {openDropdownId === (employee.id || employee._id) && (
                      <div className="dropdown-menu">
                        <button
                          className="dropdown-item"
                          onClick={handleEditemployee}
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
        <EditemployeePopup
          onClose={handleClosePopup}
          onSave={handleSaveemployee}
        />
      )}
    </div>
  );
};

export default Attendance;
