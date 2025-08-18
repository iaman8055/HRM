import { MoreVertical } from "lucide-react";

const CandidateTable = ({
  candidates,
  loading,
  error,
  openDropdownId,
  setOpenDropdownId,
  getStatusClass,
  handleStatusChange,
  handleDownloadResume,
  handleDeleteCandidate,
}) => {
  return (
    <div className="card-container">
      <table className="candidates-table">
        <thead>
          <tr className="table-header-can">
            <th className="table-header-cell">Sr no.</th>
            <th className="table-header-cell">Candidates Name</th>
            <th className="table-header-cell">Email Address</th>
            <th className="table-header-cell">Phone Number</th>
            <th className="table-header-cell">Position</th>
            <th className="table-header-cell">Status</th>
            <th className="table-header-cell">Experience</th>
            <th className="table-header-cell">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                Loading candidates...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="8" style={{ color: "red", textAlign: "center" }}>
                {error}
              </td>
            </tr>
          ) : candidates.length > 0 ? (
            candidates.map((candidate, index) => (
              <tr key={candidate._id} className="table-row">
                <td className="table-cell">{index + 1}</td>
                <td className="table-cell">{candidate.fullName}</td>
                <td className="table-cell">{candidate.email}</td>
                <td className="table-cell">{candidate.phoneNumber}</td>
                <td className="table-cell">{candidate.position}</td>
                <td className="table-cell">
                  <div className="status-dropdown-container">
                    <select
                      className={getStatusClass(candidate.status)}
                      value={candidate.status.toLowerCase()}
                      onChange={(e) =>
                        handleStatusChange(candidate._id, e.target.value)
                      }
                    >
                      <option value="new">New</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="selected">Selected</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </td>
                <td className="table-cell">{candidate.experience}</td>
                <td className="table-cell">
                  <div className="action-menu-wrapper">
                    <button
                      className="action-button"
                      onClick={() =>
                        setOpenDropdownId(
                          openDropdownId === candidate._id
                            ? null
                            : candidate._id
                        )
                      }
                    >
                      <MoreVertical size={18} />
                    </button>
                    {openDropdownId === candidate._id && (
                      <div className="dropdown-menu">
                        <button
                          className="dropdown-item"
                          onClick={() => handleDownloadResume(candidate._id)}
                        >
                          Download Resume
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={() => handleDeleteCandidate(candidate._id)}
                        >
                          Delete Candidate
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
                No candidates found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateTable;
