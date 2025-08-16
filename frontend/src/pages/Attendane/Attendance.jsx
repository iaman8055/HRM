import { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import EditCandidatePopup from '../../Component/popup/EditCandidatePopup';
import './Attendance.css'

const Attendance = () => {
  const [candidates, setCandidates] = useState([
    { id: '01', name: 'Jane Copper',   position: 'Designer Intern',    department: 'Designer',task:'Dashboard Home page Alignment',
 status: 'Present' },
    { id: '02', name: 'Janney Wilson',  position: 'Senior Developer',    department: 'Designer',task:'Dashboard Login page design, Dashboard Home page design',
 status: 'Present' },
    { id: '03', name: 'Guy Hawkins',  position: 'Human Resource Intern',    department: 'Designer',task:'--',
 status: 'Present' },
    { id: '04', name: 'Arlene McCoy',  position: 'Full Time Designer',    department: 'Designer',task:'Dashboard login page integration',
 status: 'Present', },
    { id: '05', name: 'Leslie Alexander', position: 'Full Time Developer',    department: 'Designer',task:'4 scheduled interview, Sorting of resumes',
 status: 'Present' },
  ]);
  
  const [showPopup, setShowPopup] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Present': return 'status present';
      case 'Absent': return 'status absent';
      default: return 'status-dropdown present';
    }
  };
  
  const handleStatusChange = (id, newStatus) => {
    setCandidates(candidates.map(candidate => 
      candidate.id === id ? { ...candidate, status: newStatus } : candidate
    ));
  };

  const handleEditCandidate = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSaveCandidate = (formData) => {
    // Generate a new ID (simple implementation for demo)
    const newId = String(candidates.length + 1).padStart(2, '0');
    
    // Create a new candidate object
    const newCandidate = {
      id: newId,
      name: formData.fullName,
      email: formData.emailAddress,
      phone: formData.phoneNumber,
      position: formData.position,
      status: 'Present', 
      experience: formData.experience
    };
    
    // Add the new candidate to the list
    setCandidates([...candidates, newCandidate]);
    
    // Close the popup
    setShowPopup(false);
  };

  return (
    <div className="content-area">
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
              <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
         
        </div>
        <div className="spacer"></div>
        
      </div>

      {/* Table */}
      <div className='card-container'>
        <table className="candidates-table">
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
            {candidates.map((candidate) => (
              <tr key={candidate.id} className="table-row">
                <td className="table-cell">{candidate.id}</td>
                <td className="table-cell">{candidate.name}</td>
                <td className="table-cell">{candidate.position}</td>
                <td className="table-cell">{candidate.department}</td>
                                <td className="table-cell">{candidate.task}</td>
                <td className="table-cell">
                  <div className="status-dropdown-container">
                    <select 
                      className={getStatusClass(candidate.status)} 
                      value={candidate.status}
                      onChange={(e) => handleStatusChange(candidate.id, e.target.value)}
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </select>
                    <div className="dropdown-arrow">
                      <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </td>
                <td className="table-cell">
                  <div className="action-menu-wrapper">
                     <button
                       className="action-button"
                       onClick={() =>
                         setOpenDropdownId(openDropdownId === candidate.id ? null : candidate.id)
                       }
                     >
                       <MoreVertical size={18} />
                     </button>
                     {openDropdownId === candidate.id && (
                       <div className="dropdown-menu">
                         <button className="dropdown-item" onClick={handleEditCandidate}>Edit</button>
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
        <EditCandidatePopup
          onClose={handleClosePopup} 
          onSave={handleSaveCandidate} 
        />
      )}
    </div>
  );
};

export default Attendance;