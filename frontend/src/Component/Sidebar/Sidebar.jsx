import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'
import logo from '../../assets/images/Logo_Small.svg'
import candidate from '../../assets/images/Candidate_Icon.svg'
import Attendance from '../../assets/images/Attendance_Icon.svg'
import leaves from '../../assets/images/leaves_Icon.svg'
import logout from '../../assets/images/logout_Icon.svg'
import LogoutPopup from '../popup/Logout/LogoutPopup'

const Sidebar = () => {
   const [showLogout, setShowLogout] = useState(false);

  const handleLogoutClick = () => {
    setShowLogout(true);
  };


  return (
    <div className='sidebar-main'>
      <div className='logo-search'>
        <img src={logo} alt="Logo" />
        <input type='text' placeholder='Search' />
      </div>
      <div className='navigation'>
        <p className='heading'>Recruitment</p>
        <Link to='/' className='side-nav'>
          <img src={candidate} alt="Candidates" />
          <p className='text'>Candidates</p>
        </Link>

        <p className='heading'>Organisation</p>
        <Link to='/employees' className='side-nav'>
          <img src={candidate} alt="Employees" />
          <p className='text'>Employees</p>
        </Link>
        <Link to='/attendance' className='side-nav'>
          <img src={Attendance} alt="Attendance" />
          <p className='text'>Attendance</p>
        </Link>
        <Link to='/leaves' className='side-nav'>
          <img src={leaves} alt="Leaves" />
          <p className='text'>Leaves</p>
        </Link>

        <p className='heading'>Others</p>
        <div className='side-nav' onClick={handleLogoutClick}>
          <img src={logout} alt="Logout" />
          <p className='text'>Logout</p>
        </div>
      </div>
            {showLogout && <LogoutPopup 
            onClose={()=>{setShowLogout(false)}}

             />}

    </div>
  )
}

export default Sidebar
