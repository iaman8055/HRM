const LeaveCalendar = ({
  leaves,
  currentMonth,
  currentYear,
  setCurrentMonth,
  setCurrentYear
}) => {
  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];
  const dayNames = ["S","M","T","W","T","F","S"];

  const approvedLeaves = leaves.filter((l) => l.status === "approved");

  const changeMonth = (dir) => {
    if (dir > 0) {
      if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1);}
      else setCurrentMonth(currentMonth + 1);
    } else {
      if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1);}
      else setCurrentMonth(currentMonth - 1);
    }
  };

  const getLeaveCountForDate = (day) => {
    return leaves.filter(
      (l) =>
        l.status === "approved" &&
        new Date(l.date).getDate() === day &&
        new Date(l.date).getMonth() === currentMonth &&
        new Date(l.date).getFullYear() === currentYear
    ).length;
  };

  const renderCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const days = [];

    dayNames.forEach((d, i) => days.push(<div key={`h-${i}`} className="calendar-day-header">{d}</div>));
    for (let i = 0; i < firstDay; i++) days.push(<div key={`e-${i}`} className="calendar-day"></div>);

    for (let day = 1; day <= daysInMonth; day++) {
      const leaveCount = getLeaveCountForDate(day);
      days.push(
        <div key={day} className={`calendar-day ${leaveCount > 0 ? "has-leaves" : ""}`} data-leave-count={leaveCount || ""}>
          {day}{leaveCount > 0 && <span className="leave-count-badge">{leaveCount}</span>}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="calendar-card">
      <div className="calendar-card-header">Leave Calendar</div>
      <div className="calendar-content">
        <div className="calendar-header">
          <button className="calendar-button" onClick={() => changeMonth(-1)}>‹</button>
          <h3>{monthNames[currentMonth]}, {currentYear}</h3>
          <button className="calendar-button" onClick={() => changeMonth(1)}>›</button>
        </div>
        <div className="calendar-grid">{renderCalendarDays()}</div>

        <div className="approved-leaves-list">
          <h4>Approved Leaves</h4>
          {approvedLeaves.map((l) => (
            <div key={l._id} className="approved-leave-item">
              <img src={l.profilePic} alt={l.fullName} />
              <div className="approved-leave-info">
                <div className="approved-leave-name">{l.fullName}</div>
                <div className="approved-leave-position">{l.position}</div>
              </div>
              <div className="approved-leave-date">{new Date(l.date).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaveCalendar;
