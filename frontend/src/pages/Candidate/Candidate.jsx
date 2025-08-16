import { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import AddCandidatePopup from '../../Component/popup/AddCandidatePopup';
import './Candidate.css'
import { useEffect } from 'react';
import API from '../../util/api';

const Candidate = () => {
  const [candidates, setCandidates] = useState([]);
  
  const [showPopup, setShowPopup] = useState(false);
const [openDropdownId, setOpenDropdownId] = useState(null);
useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await API.get('/candidate');
        setCandidates(res.data.candidates);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };
    fetchCandidates();
  }, [candidates]);
  const getStatusClass = (status) => {
    switch (status) {
      case 'New': return 'status-dropdown status-new';
      case 'Selected': return 'status-dropdown status-selected';
      case 'Rejected': return 'status-dropdown status-rejected';
      default: return 'status-dropdown status-new';
    }
  };
  
  
  const handleStatusChange = (id, newStatus) => {
    console.log("id:",id)
    setCandidates(candidates.map(candidate => 
      candidate._id === id ? { ...candidate, status: newStatus } : candidate
    ));
  };

  const handleAddCandidate = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSaveCandidate = async (formData) => {
    try {
      const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('email', formData.emailAddress);
    data.append('phoneNumber', formData.phoneNumber);
    data.append('position', formData.position);
    data.append('status', 'New');
    data.append('experience', formData.experience);
    data.append('resumeUrl', formData.resume); 
      const res = await API.post('/candidate/add',data);
      setCandidates([...candidates, res.data.candidate]);
      setShowPopup(false);
    } catch (error) {
      console.error('Error saving candidate:', error);
    }
  };

  return (
    <div className="content-area">
      {/* Filters */}
      <div className="filter-container">
        <div className="filter-group">
          <div className="select-container">
            <select className="select-can">
              <option>Status</option>
              <option>New</option>
              <option>Selected</option>
              <option>Rejected</option>
            </select>
            <div className="select-arrow">
              <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="select-container">
            <select className="select-with-border">
              <option>Position</option>
              <option>Designer</option>
              <option>Developer</option>
              <option>HR</option>
            </select>
            <div className="select-arrow">
              <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        <div className="spacer"></div>
        <button className="add-button" onClick={handleAddCandidate}>
          Add Candidate
        </button>
      </div>

      {/* Table */}
      <div className='card-container'>
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
            {candidates.map((candidate,index) => (
              <tr key={candidate._id} className="table-row">
                <td className="table-cell">{index+1}</td>
                <td className="table-cell">{candidate.fullName}</td>
                <td className="table-cell">{candidate.email}</td>
                <td className="table-cell">{candidate.phoneNumber}</td>
                <td className="table-cell">{candidate.position}</td>
                <td className="table-cell">
                  <div className="status-dropdown-container">
                    <select 
                      className={getStatusClass(candidate.status)} 
                      value={candidate.status}
                      onChange={(e) => handleStatusChange(candidate._id, e.target.value)}
                    >
                      <option value="New">New</option>
                      <option value="Scheduled">Scheduled</option>
                       <option value="Ongoing">Ongoing</option>
                      <option value="Selected">Selected</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                    <div className="dropdown-arrow">
                      <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </td>
                <td className="table-cell">{candidate.experience}</td>
                <td className="table-cell">
                  <div className="action-menu-wrapper">
                     <button
                       className="action-button"
                       onClick={() =>
                         setOpenDropdownId(openDropdownId === candidate._id ? null : candidate._id)
                       }
                     >
                       <MoreVertical size={18} />
                     </button>
                     {openDropdownId === candidate._id && (
                       <div className="dropdown-menu">
                         <button className="dropdown-item">Download Resume</button>
                         <button className="dropdown-item">Delete Candidate</button>
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
        <AddCandidatePopup
          onClose={handleClosePopup} 
          onSave={handleSaveCandidate} 
        />
      )}
    </div>
  );
};

export default Candidate;