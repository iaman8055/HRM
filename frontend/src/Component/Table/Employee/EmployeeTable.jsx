import { MoreVertical } from "lucide-react";

const EmployeeTable = ({
  employees,
  openDropdownId,
  setOpenDropdownId,
  handleEditCandidate,
  handleDelete,
}) => {
  return (
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
          {employees.length > 0 ? (
            employees.map((emp, index) => (
              <tr key={emp._id || emp.id} className="table-row">
                <td className="table-cell">{index + 1}</td>
                <td className="table-cell">{emp.fullName || emp.name}</td>
                <td className="table-cell">{emp.email}</td>
                <td className="table-cell">{emp.phoneNumber || emp.phone}</td>
                <td className="table-cell">{emp.position}</td>
                <td className="table-cell">{emp.department}</td>
                <td className="table-cell">
                  {emp.dateofjoining
                    ? new Date(emp.dateofjoining).toLocaleDateString()
                    : "--"}
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
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
