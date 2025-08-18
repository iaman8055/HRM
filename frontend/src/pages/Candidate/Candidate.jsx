import { useState, useEffect } from "react";
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
import CandidateTable from "../../Component/Table/Candidate/CandidateTable";

const Candidate = () => {
  const dispatch = useDispatch();
  const { list: candidates, loading, error } = useSelector((state) => state.candidates);

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
      case "new": return "status-dropdown status-new";
      case "selected": return "status-dropdown status-selected";
      case "rejected": return "status-dropdown status-rejected";
      case "scheduled": return "status-dropdown status-scheduled";
      case "ongoing": return "status-dropdown status-ongoing";
      default: return "status-dropdown status-new";
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

  const handleClosePopup = () => setShowPopup(false);

  // Filter candidates
  const filteredCandidates = candidates.filter((candidate) => {
    const statusMatch = statusFilter ? candidate.status.toLowerCase() === statusFilter.toLowerCase() : true;
    const positionMatch = positionFilter ? candidate.position.toLowerCase() === positionFilter.toLowerCase() : true;
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
          </div>
        </div>

        <div className="spacer"></div>
        <button className="add-button" onClick={() => setShowPopup(true)}>
          Add Candidate
        </button>
      </div>

      {/* Candidate Table */}
      <CandidateTable
        candidates={filteredCandidates}
        loading={loading}
        error={error}
        openDropdownId={openDropdownId}
        setOpenDropdownId={setOpenDropdownId}
        getStatusClass={getStatusClass}
        handleStatusChange={handleStatusChange}
        handleDownloadResume={handleDownloadResume}
        handleDeleteCandidate={handleDeleteCandidate}
      />

      {showPopup && (
        <AddCandidatePopup onClose={handleClosePopup} onSave={handleSaveCandidate} />
      )}
    </div>
  );
};

export default Candidate;
