import { useState, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import AddCandidatePopup from "../../Component/popup/Candidate/AddCandidatePopup";
import "./Candidate.css";
import API from "../../util/api";
import { useDispatch, useSelector } from "react-redux";
import {
  addCandidate,
  deleteCandidate,
  fetchCandidates,
  updateCandidateStatus,
} from "../../util/redux/candidate/candidateSlice";

const Candidate = () => {
  const dispatch = useDispatch();
  const { list: candidates, loading, error } = useSelector(
    (state) => state.candidates
  );

  const [showPopup, setShowPopup] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");

  useEffect(() => {
    dispatch(fetchCandidates());
  }, [dispatch]);

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "new":
        return "status-dropdown status-new";
      case "selected":
        return "status-dropdown status-selected";
      case "rejected":
        return "status-dropdown status-rejected";
      case "scheduled":
        return "status-dropdown status-scheduled";
      case "ongoing":
        return "status-dropdown status-ongoing";
      default:
        return "status-dropdown status-new";
    }
  };

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateCandidateStatus({ id, newStatus }));
  };

  const handleSaveCandidate = (formData) => {
    dispatch(addCandidate(formData));
    setShowPopup(false);
  };

  const handleDeleteCandidate = (id) => {
    dispatch(deleteCandidate(id));
  };

  const handleDownloadResume = (id) => {
    API.get(`/candidate/${id}`)
      .then((res) => {
        const resumeUrl = res.data.candidate.resumeUrl;
        if (resumeUrl) {
          const link = document.createElement("a");
          link.href = resumeUrl;
          link.download = resumeUrl.split("/").pop();
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          console.error("Resume URL not found for candidate");
        }
      })
      .catch((err) => {
        console.error("Error fetching candidate resume:", err);
      });
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Filter candidates based on selected status and position
  const filteredCandidates = candidates.filter((candidate) => {
    const statusMatch = statusFilter
      ? candidate.status.toLowerCase() === statusFilter.toLowerCase()
      : true;
    const positionMatch = positionFilter
      ? candidate.position.toLowerCase() === positionFilter.toLowerCase()
      : true;
    return statusMatch && positionMatch;
  });

  return (
    <div className="content-area-c">
      {/* Filters */}
      <div className="filter-container">
        <div className="filter-group">
          <div className="select-container">
            <select
              className="select-can"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="new">New</option>
              <option value="selected">Selected</option>
              <option value="rejected">Rejected</option>
              <option value="scheduled">Scheduled</option>
              <option value="ongoing">Ongoing</option>
            </select>
            <div className="select-arrow">
              <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div className="select-container">
            <select
              className="select-with-border"
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
            >
              <option value="">All Positions</option>
              <option value="Designer">Designer</option>
              <option value="Developer">Developer</option>
              <option value="HR">HR</option>
            </select>
            <div className="select-arrow">
              <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
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
        <button className="add-button" onClick={() => setShowPopup(true)}>
          Add Candidate
        </button>
      </div>

      {/* Table */}
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
              <p>Loading candidates...</p>
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : filteredCandidates.length > 0 ? (
              filteredCandidates.map((candidate, index) => (
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
                            openDropdownId === candidate._id ? null : candidate._id
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
              <p>No candidates found.</p>
            )}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <AddCandidatePopup
          onClose={handleClosePopup}
          onSave={handleSaveCandidate}
        />
      )}
    </div>
  );
};

export default Candidate;
