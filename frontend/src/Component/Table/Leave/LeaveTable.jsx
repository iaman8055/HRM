const LeaveTable = ({ leaves, updateStatus }) => {
  return (
    <div className="leave-card">
      <div className="leave-card-header">Applied Leaves</div>
      <div className="leave-table-wrapper">
        <div className="leave-table-header">
          <div>Profile</div>
          <div>Name</div>
          <div>Date</div>
          <div>Reason</div>
          <div>Status</div>
          <div>Docs</div>
        </div>
        {leaves.length > 0 ? (
          leaves.map((leave) => (
            <div key={leave._id} className="leave-row">
              <div>
                <img
                  src={leave.profilePic}
                  alt={leave.fullName}
                  className="leave-profile-pic"
                />
              </div>
              <div>
                <div className="leave-name">{leave.fullName}</div>
                <div className="leave-position">{leave.position}</div>
              </div>
              <div>{new Date(leave.date).toLocaleDateString()}</div>
              <div>{leave.reason}</div>
              <div>
                <select
                  value={leave.status}
                  onChange={(e) => updateStatus(leave._id, e.target.value)}
                  className={`leave-status-select leave-status-${leave.status}`}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div>📄</div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center", padding: "10px" }}>No leaves found.</div>
        )}
      </div>
    </div>
  );
};

export default LeaveTable;
