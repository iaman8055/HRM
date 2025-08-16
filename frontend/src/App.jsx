import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Topbar from './Component/Topbar/Topbar'
import Sidebar from './Component/Sidebar/Sidebar'
import Candidate from './pages/Candidate/Candidate'
import Attendance from './pages/Attendane/Attendance'
import Leaves from './pages/Leaves/Leaves'
import Employee from './pages/Employee/Employee'

const App = () => {
  return (
    <Router>
      <div className='app-layout'>
        <Sidebar />
        <div className='main-content'>
          <Topbar/>
          <div className='page-content'>
            <Routes>
              <Route path='/candidates' element={<Candidate />} />
              <Route path='/employees' element={<Employee />} />
              <Route path='/attendance' element={<Attendance />} />
              <Route path='/leaves' element={<Leaves />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
