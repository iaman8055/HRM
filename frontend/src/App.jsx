import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Topbar from "./Component/Topbar/Topbar";
import Sidebar from "./Component/Sidebar/Sidebar";
import Candidate from "./pages/Candidate/Candidate";
import Attendance from "./pages/Attendane/Attendance";
import Leaves from "./pages/Leaves/Leaves";
import Employee from "./pages/Employee/Employee";
import Login from "./pages/LogIn/Login";
import Signup from "./pages/SignUp/Signup";
import ProtectedRoute from "./Component/ProtectedRoute";
import Layout from "./Layout"; // ✅ import Layout with Outlet

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes with layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Candidate />} />
            <Route path="/employees" element={<Employee />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/leaves" element={<Leaves />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
