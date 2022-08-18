import { Outlet } from "react-router-dom";
import { NavBar, SideBar } from "../";
// import SideBar from "../Sidebar/SideBar";

const Layout = () => {
  return (
    <div>
      <Outlet />
      <NavBar />
      <SideBar />
    </div>
  );
};

export default Layout;
