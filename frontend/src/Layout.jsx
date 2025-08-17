import { Outlet } from "react-router-dom";
import Sidebar from "./Component/Sidebar/Sidebar";
import Topbar from "./Component/Topbar/Topbar";

const Layout = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
