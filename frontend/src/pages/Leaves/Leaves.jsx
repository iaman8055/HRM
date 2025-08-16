import React, { useState } from 'react';
import './Leaves.css';
import AddLeavePopup from '../../Component/popup/AddLeavePopup';

const LeaveManagementSystem = () => {
  const [leaveData, setLeaveData] = useState([
  
  ]);

  const [showPopUp,setShowPopup]=useState(false)

  const [currentMonth, setCurrentMonth] = useState(8); // September
  const [currentYear, setCurrentYear] = useState(2024);

  const monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];

  const dayNames = ['S','M','T','W','T','F','S'];

  const updateStatus = (leaveId,newStatus) => {
    setLeaveData(prev => prev.map(l => l.id === leaveId ? {...l,status:newStatus} : l));
  };
  
  const handleAddLeave = () => {
    setShowPopup(true);
  };
  const handleClosePopup=()=>{
    setShowPopup(false)
  }

  const changeMonth = (dir) => {
    if(dir>0){
      if(currentMonth===11){ setCurrentMonth(0); setCurrentYear(currentYear+1); }
      else setCurrentMonth(currentMonth+1);
    }else{
      if(currentMonth===0){ setCurrentMonth(11); setCurrentYear(currentYear-1); }
      else setCurrentMonth(currentMonth-1);
    }
  };

  const getLeaveCountForDate = (day) => {
    const dayString = `${day}/${(currentMonth+1).toString().padStart(2,'0')}/${currentYear.toString().slice(-2)}`;
    const dayStringAlt = `${day.toString().padStart(2,'0')}/${(currentMonth+1).toString().padStart(2,'0')}/${currentYear.toString().slice(-2)}`;
    return leaveData.filter(l => l.date===dayString || l.date===dayStringAlt).length;
  };

  const renderCalendarDays = () => {
    const firstDay = new Date(currentYear,currentMonth,1).getDay();
    const daysInMonth = new Date(currentYear,currentMonth+1,0).getDate();
    const days = [];

    dayNames.forEach((d,i)=>{ days.push(<div key={`h-${i}`} className="calendar-day-header">{d}</div>) });

    for(let i=0;i<firstDay;i++) days.push(<div key={`e-${i}`} className="calendar-day"></div>);

    for(let day=1;day<=daysInMonth;day++){
      const leaveCount = getLeaveCountForDate(day);
      days.push(
        <div key={day} className={`calendar-day ${leaveCount>0?'has-leaves':''}`} data-leave-count={leaveCount>0?leaveCount:''}>
          {day}
          {leaveCount>0 && <span className="leave-count-badge">{leaveCount}</span>}
        </div>
      );
    }
    return days;
  };

  const approvedLeaves = leaveData.filter(l=>l.status==='approved');

  return (
    <div className="leave-management-wrapper">
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
        <button className="add-button" onClick={handleAddLeave}>
          Add Leave
        </button>
      </div>
      <div className="leave-management-grid">
        {/* Applied Leaves Table */}
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
            {leaveData.map(leave=>(
              <div key={leave.id} className="leave-row">
                <div><img src={leave.profilePic} alt={leave.name} className="leave-profile-pic"/></div>
                <div>
                  <div className="leave-name">{leave.name}</div>
                  <div className="leave-position">{leave.position}</div>
                </div>
                <div>{leave.date}</div>
                <div>{leave.reason}</div>
                <div>
                  <select value={leave.status} onChange={e=>updateStatus(leave.id,e.target.value)}
                    className={`leave-status-select leave-status-${leave.status}`}>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div>📄</div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div className="calendar-card">
          <div className="calendar-card-header">Leave Calendar</div>
          <div className="calendar-content">
            <div className="calendar-header">
              <button className="calendar-button" onClick={()=>changeMonth(-1)}>‹</button>
              <h3>{monthNames[currentMonth]}, {currentYear}</h3>
              <button className="calendar-button" onClick={()=>changeMonth(1)}>›</button>
            </div>
            <div className="calendar-grid">{renderCalendarDays()}</div>

            <div className="approved-leaves-list">
              <h4>Approved Leaves</h4>
              {approvedLeaves.map(l=>(
                <div key={l.id} className="approved-leave-item">
                  <img src={l.profilePic} alt={l.name}/>
                  <div className="approved-leave-info">
                    <div className="approved-leave-name">{l.name}</div>
                    <div className="approved-leave-position">{l.position}</div>
                  </div>
                  <div className="approved-leave-date">{l.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showPopUp &&(
        <AddLeavePopup
         onClose={handleClosePopup} 
          />
      )}
    </div>
  );
};

export default LeaveManagementSystem;
