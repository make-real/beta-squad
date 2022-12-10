import { Outlet } from "react-router-dom";
import { NavBar, SideBar } from "../";
import SideNavbar from "../Navs/SideNavbar";
import TopNavbar from "../Navs/TopNavbar";
// import SideBar from "../Sidebar/SideBar";

const Layout = ({ selectedSpaceId }) => {
  console.log(selectedSpaceId);
  return (
    <div className='flex min-h-screen'>
      {/* <NavBar selectedSpaceId={selectedSpaceId} /> */}
      {/* <SideBar /> */}
      <SideNavbar />
      <div className='w-full flex flex-col'>
        <TopNavbar selectedSpaceId={selectedSpaceId} />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
