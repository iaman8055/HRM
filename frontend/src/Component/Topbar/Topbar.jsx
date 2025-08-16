import React from 'react'
import './Topbar.css'
import message from "../../assets/images/Message_Icon.svg"
import nortification from "../../assets/images/Nortification.svg"
import profile from "../../assets/images/ProfilePic.png"
import { RiArrowDropDownLine } from "react-icons/ri";
import { useLocation } from 'react-router-dom'

const Topbar = () => {
   const location = useLocation()

  const routeTitles = {
    '/candidates': 'Candidates',
    '/employees': 'Employees',
    '/attendance': 'Attendance',
    '/leaves': 'Leaves',
  }

  const title = routeTitles[location.pathname] || 'Dashboard'
  return (
    <div className='Topbar-main'>
        <div className='main-content-topbar'>
                <p className='left'>{title}</p>
                <div className='right'>
                    <img src={message}/>
                    <img src={nortification}/>
                    <img src={profile}/>
                </div>
        </div>
    </div>
  )
}

export default Topbar