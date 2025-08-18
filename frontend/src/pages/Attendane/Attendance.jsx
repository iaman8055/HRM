import { useState, useEffect } from "react";
import "./Attendance.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAttendance,
  updateEmployeeStatus,
} from "../../util/redux/attendance/attendanceSlice";
import AttendanceTable from "../../Component/Table/Attendance/AttendanceTable";

const Attendance = () => {
  const dispatch = useDispatch();
  const { employees, loading } = useSelector((state) => state.attendance);

  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    dispatch(fetchAttendance());
  }, [dispatch]);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "present":
        return "status present";
      case "absent":
        return "status absent";
      case "medical leave":
        return "status medical-leave";
      case "work from home":
        return "status wfh";
      default:
        return "status present";
    }
  };

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateEmployeeStatus({ id, status: newStatus.toLowerCase() }));
  };

  if (loading) return <div className="content-area-a">Loading...</div>;

  // Filter employees
  const filteredEmployees = employees.filter((emp) =>
    statusFilter
      ? emp.status.toLowerCase() === statusFilter.toLowerCase()
      : true
  );

  return (
    <div className="content-area-a">
      {/* Filters */}
      <div className="filter-container">
        <div className="filter-group">
          <div className="select-container">
            <select
              className="select-one"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="medical leave">Medical Leave</option>
              <option value="work from home">Work From Home</option>
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

      {/* Attendance Table */}
      <AttendanceTable
        employees={filteredEmployees}
        openDropdownId={openDropdownId}
        setOpenDropdownId={setOpenDropdownId}
        getStatusClass={getStatusClass}
        handleStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default Attendance;
