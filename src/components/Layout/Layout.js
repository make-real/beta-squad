import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { NavBar, SideBar } from "../";
import SideNavbar from "../Navs/SideNavbar";
import TopNavbar from "../Navs/TopNavbar";
import { useEffect } from "react";
// import SideBar from "../Sidebar/SideBar";
import { useState } from "react";
import Subscription from "../Navbar/Subscription";
import { requestNotificationPermission } from "../../util/helpers";

const Layout = ({ selectedSpaceId }) => {
  const fullSidebar = useSelector((state) => state.screen.fullSidebar);
  const userInfo = useSelector((state) => state?.userInfo?.userInfo);
  const [ShowSubscription, setShowSubscription] = useState(false);
  const subscriptionError = useSelector((state) => state?.subscription?.subscriptionError);
    // console.log(subscriptionError);
    requestNotificationPermission();


  useEffect(() => {
    if (subscriptionError) {
      setShowSubscription(true);
    } else {
        setShowSubscription(false); 
    }
  }, [subscriptionError,]);

  return (
    <div className=" ">
      {ShowSubscription && (
        <div className="fixed  z-[160] bg-[#FB397F] text-white text-sm p-[7px] w-full top-0">
          <Subscription />
        </div>
      )}
      <div className="flex min-h-screen no-scrollbar ">
        {/* <NavBar selectedSpaceId={selectedSpaceId} /> */}
        {/* <SideBar /> */}
        <div className="z-[159]">
          <SideNavbar ShowSubscription={ShowSubscription} />
        </div>
        <div className="w-full flex flex-col h-screen">
          <div
            className={`w-full fixed z-[150] ${
              ShowSubscription ? "top-[34px]" : "top-0"
            } ${fullSidebar ? "pl-[225px]" : "pl-[78px]"}`}
          >
            <TopNavbar />
          </div>
          <div
            className={`h-full ${fullSidebar ? "pl-[225px]" : "pl-[78px]"} ${
              ShowSubscription ? "pt-[102px]" : "pt-[70px]"
            }`}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
