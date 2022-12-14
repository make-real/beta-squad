import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { NavBar, SideBar } from "../";
import SideNavbar from "../Navs/SideNavbar";
import TopNavbar from "../Navs/TopNavbar";
// import SideBar from "../Sidebar/SideBar";

const Layout = ({ selectedSpaceId }) => {
    const fullSidebar = useSelector((state) => state.screen.fullSidebar);
    return (
        <div className="flex min-h-screen">
            {/* <NavBar selectedSpaceId={selectedSpaceId} /> */}
            {/* <SideBar /> */}
            <div className="z-[159]">
                <SideNavbar />
            </div>
            <div className="w-full flex flex-col">
                <div
                    className={`w-full fixed z-[150] top-0 ${
                        fullSidebar ? "pl-[225px]" : "pl-[78px]"
                    }`}
                >
                    <TopNavbar />
                </div>
                <div
                    className={`h-full ${
                        fullSidebar ? "pl-[225px]" : "pl-[78px]"
                    } mt-[70px]`}
                >
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
