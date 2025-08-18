import { MoreVertical } from "lucide-react";

const AttendanceTable = ({
  employees,
  openDropdownId,
  setOpenDropdownId,
  getStatusClass,
  handleStatusChange,
}) => {
  return (
    <div className="card-container">
      <div className="table-wrapper">
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
            {employees.length > 0 ? (
              employees.map((employee, index) => (
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
                          handleStatusChange(employee._id, e.target.value)
                        }
                      >
                        <option value="present">Present</option>
                        <option value="absent">Absent</option>
                        <option value="medical leave">Medical Leave</option>
                        <option value="work from home">Work From Home</option>
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
                            openDropdownId === employee._id
                              ? null
                              : employee._id
                          )
                        }
                      >
                        <MoreVertical size={18} />
                      </button>
                      {openDropdownId === employee._id && (
                        <div className="dropdown-menu">
                          <button className="dropdown-item">Edit</button>
                          <button className="dropdown-item">Delete</button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;
