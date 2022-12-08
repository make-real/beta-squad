import { Outlet } from "react-router-dom";
import { NavBar, SideBar } from "../";
import SideNavbar from "../Navs/SideNavbar";
import TopNavbar from "../Navs/TopNavbar";
// import SideBar from "../Sidebar/SideBar";

const Layout = ({ selectedSpaceId }) => {
    return (
        <div className="flex">
            {/* <NavBar selectedSpaceId={selectedSpaceId} /> */}
            <SideNavbar />
            <div className="w-full">
                <TopNavbar />
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
