import { Outlet } from "react-router-dom";
import { NavBar, SideBar } from "../";
import TopNavbar from "../TopNavbar";
// import SideBar from "../Sidebar/SideBar";

const Layout = ({ selectedSpaceId }) => {
    
    return (
        <div className="flex">
            {/* <NavBar selectedSpaceId={selectedSpaceId} /> */}
            <SideBar />
            <div className="w-full">
                <TopNavbar />
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
