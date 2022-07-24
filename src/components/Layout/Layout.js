import { Outlet } from "react-router-dom";
import { NavBar, SideBar } from "../";
// import SideBar from "../Sidebar/SideBar";

const Layout = () => {
  return (
    <div>
      <SideBar />
      <NavBar />
      <div className="">{<Outlet />}</div>
    </div>
  );
};

export default Layout;
