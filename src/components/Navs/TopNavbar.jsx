import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import LogoIcon from "../../assets/squad_logo.png";
import NotificationIcon from "../../assets/notification.svg";
import ArrowDown from "../../assets/arrowdown.svg";
import SettingsIcon from "../../assets/setting.svg";
import LogoutIcon from "../../assets/logout.svg";
import ProfileIcon from "../../assets/profile.svg";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { userLogOut } from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
import { setSelectedWorkSpaceId } from "../../store/slice/workspace";
import {
  setSelectedSpaceId,
  setSelectedSpaceObject,
} from "../../store/slice/space";
import NotificationsModal from "../Modals/NotificationsModal";
import LeftArrow from "../../assets/left_arrow.svg";
import VerticalDots from "../../assets/vertical_dots.svg";
import HorizontalDots from "../../assets/horizontal_dots.svg";
import BellIcon from "../../assets/icon_component/NotificationIcon";
import { toggleFullSidebar } from "../../store/slice/screen";
import { get_notifications } from "../../api/notification";
import { useRef } from "react";
import { getAvatarUrl } from "../../util/getAvatarUrl";
import FolderIcon from "../../assets/icon_component/Folder";
import TaskListIcon from "../../assets/icon_component/TaskListIcon";
import PrivateFolder from "../../assets/icon_component/PrivateFolder";
import { BsSearch } from "react-icons/bs";
import Search from "./search";
const userId = JSON.parse(localStorage.getItem("userId"));



const TopNav = () => {
  // const [userInfo, setUserInfo] = useState(null);
  const [jwt, setJwt] = useState(null);

  useEffect(() => {
    // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    // setUserInfo(userInfo);
    setJwt(jwt);
  }, []);

  return (
    <div className="bg-white border-b-[0.5px] min-h-[50px] lg:min-h-[70px] max-h-[70px] w-full flex">
      {jwt ? <LoggedInTopNav /> : <NotLoggedInTopNav />}
    </div>
  );
};

const NotLoggedInTopNav = () => {
  const location = useLocation();
  const currentPage =
    location.pathname === "/login"
      ? "login"
      : location.pathname === "/register"
      ? "register"
      : "login";
  return (
    <div className="flex justify-between w-full py-[15px] px-[50px]">
      <div className="flex items-center gap-2">
        <img src={LogoIcon} className="h-[28px] w-[28px] lg:w-[35px] lg:h-[35px] xl:h-[35px] xl:w-[35px]" alt="logo"  />
        <h1 className="text-[#0D1282] text-[18px] xl:text-[20px]  lg:text-[20px] font-semibold">Squad</h1>
      </div>
      <Link
        to={`${currentPage === "register" ? "/" : "/register"}`}
        className="bg-[#0D1282] px-[26px] py-[8px] lg:py-[10px] xl:py-[10px] text-white rounded-md font-normal text-xs cursor-pointer"
      >
        {currentPage === "register" ? "Login" : "Register"}
      </Link>
    </div>
  );
};

const LoggedInTopNav = () => {
  const userInfo = useSelector((state) => state.userInfo.userInfo);
 

  const selectedWorkspaceId = useSelector(
    (state) => state.workspace.selectedWorkspace
  );
  const currentWorkspace = useSelector(
    (state) => state.workspace.currentWorkspace
  );
  const selectedSpaceId = useSelector((state) => state.space.selectedSpace);
  const selectedSpace = useSelector((state) => state.space.selectedSpaceObj);
  const [showDropDownMenu, setShowDropDownMenu] = useState(false);
  const workspaces = useSelector((state) => state.workspace.workspaces);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showNotificationBox, setShowNotificationBox] = useState(false);
  const [notifications, setNotifications] = useState({
    seen: null,
    unseen: null,
    all: null,
    count1: 0,
    count2: 0,
  });

  const isProjectScreen = useLocation().pathname.startsWith("/projects");
  const [selectedNotificationTab, setSelectedNotificationTab] = useState("all");
  const workspaceMembers = useSelector(
    (state) => state.workspace.workspaceMembers
  );
  const [selectedMember, setSelectedMember] = useState(null);

  const { participantID } = useParams();
  const members = useSelector((state) => state.workspace.workspaceMembers);
  const selectedmembers = members.find(member => member.email === userInfo.email)
  const isManageWorkspaceScreen =
    useLocation().pathname.search("manage-workspace") !== -1;
  const isProfileScreen = useLocation().pathname.search("profile") !== -1;
  const userMenuDropDownRef = useRef();
  const notificationDropDownRef = useRef();

  useEffect(() => {
    if (workspaceMembers) {
      setSelectedMember(
        workspaceMembers.find((value) => value._id === participantID)
      );
    }
  }, [workspaceMembers, participantID]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    setShowDropDownMenu(false);
    try {
      await userLogOut();
    } catch (error) {
      console.log(error);
    }

    dispatch(setSelectedWorkSpaceId(null));
    dispatch(setSelectedSpaceObject({}));
    dispatch(setSelectedSpaceId(null));
    dispatch(setSelectedSpaceObject({}));
    localStorage.clear();
    navigate("/");
  };

  const fetchNotification = async () => {
    try {
      const { data } = await get_notifications(10);
      const AllNotification = data?.notification;
      const seenNotifications = data.notifications.filter(
        (n) => n.seen === true
      );
      const unseenNotifications = data.notifications.filter(
        (n) => n.seen === false
      );
      setNotifications({
        all: AllNotification,
        seen: seenNotifications,
        unseen: unseenNotifications,
        count1: data.notifications?.length,
        count2:unseenNotifications?.length,
      });
    } catch (err) {
      
      setNotifications({ seen: null, unseen: null, all: null, count1: 0 , count2:0 });
    }
  };

  useEffect(() => {
    fetchNotification();
  }, []);

  const handleClickOutside = (ref, event, updateFn) => {
    if (ref.current && !ref.current.contains(event.target)) {
      updateFn(false);
    }
  };

  // Auto close user drop down menu


  useEffect(() => {
    document.addEventListener(
      "click",
      (e) => handleClickOutside(userMenuDropDownRef, e, setShowDropDownMenu),
      true
    );
    document.addEventListener(
      "keydown",
      (e) => handleClickOutside(userMenuDropDownRef, e, setShowDropDownMenu),
      true
    );
    return () => {
      document.removeEventListener(
        "click",
        (e) => handleClickOutside(userMenuDropDownRef, e, setShowDropDownMenu),
        true
      );
    };
  }, []);

 
  // Auto close notification drop down menu
  useEffect(() => {
    document.addEventListener(
      "click",
      (e) =>
        handleClickOutside(
          notificationDropDownRef,
          e,
          setShowNotificationModal
        ),
      true
    );
   
    return () => {
      document.removeEventListener(
        "click",
        (e) =>
          handleClickOutside(userMenuDropDownRef, e, setShowNotificationModal),
        true
      );
      document.removeEventListener(
        "keydown",
        (e) =>
          handleClickOutside(userMenuDropDownRef, e, setShowNotificationModal),
        true
      );
    

    };
  }, []);


  const NotificationTabs = {
    all: <AllNotification notifications={notifications.seen} />,
    unread: <UnreadNotification notifications={notifications.unseen} />,
  };


  return (
    <>
      <div
        className={`relative py-[15px] pl-[19px] pr-[66px] flex items-center w-full justify-between`}
      >
        
        <Search/>
       
        

        <div className="flex items-center h-full">
          <div className="relative">
            <img
              onClick={() => setShowNotificationModal(!showNotificationModal)}
              className="w-[22px] cursor-pointer"
              src={NotificationIcon}
              alt="notification"
            />

            {/* Notifications Dropdown Menu */}
            <div
              ref={notificationDropDownRef}
              className={`z-[999] origin-top-right scale-0 pointer-events-none ${
                showNotificationModal ? "scale-100 pointer-events-auto" : ""
              } transition-transform absolute top-[30px] -right-[15px] w-[425px] h-[480px] bg-white normal-shadow border rounded-[16px] pt-[34px] px-[16px] pb-[20px] flex flex-col`}
            >
              {/* Title */}
              <div className="flex items-center justify-between">
                <h1 className="text-[#031124] text-[20px] font-bold leading-[30px]">
                  Notifications
                  <span className="font-normal">
                    ({notifications.count1 ?? 0})
                  </span>
                </h1>
                {/* <div className="cursor-pointer">
                  <img src={VerticalDots} alt="" />
                </div> */}
              </div>
              {/* Tab */}
              <div className="mt-[8px] border-b border-b-[#ECECEC]">
                <ul className="flex items-center gap-[28px]">
                  <li
                    className={`text-[15px] font-medium cursor-pointer ${
                      selectedNotificationTab === "all"
                        ? "text-[#6576FF] border-b-2 border-[#6576FF]"
                        : "text-[#818892]"
                    }`}
                    onClick={() => setSelectedNotificationTab("all")}
                  >
                    All
                  </li>
                  <li
                    className={`text-[15px] font-medium cursor-pointer ${
                      selectedNotificationTab === "unread"
                        ? "text-[#6576FF] border-b-2 border-[#6576FF]"
                        : "text-[#818892]"
                    }`}
                    onClick={() => setSelectedNotificationTab("unread")}
                  >
                    Unread
                  </li>
                </ul>
              </div>
              <div className="mt-[16px] flex items-center justify-between">
                {/* <p className="text-[#818892] text-[15px] font-medium">
                  Earlier
                </p> */}
                {/* <p
                  onClick={() => {
                    setShowNotificationBox(true);
                    setShowNotificationModal(false);
                  }}
                  className="text-[#6576FF] text-[15px] cursor-pointer"
                >
                  See All
                </p> */}
              </div>
              {/* Content */}
              <div className="mt-[18px] h-full overflow-hidden">
                {NotificationTabs[selectedNotificationTab]}
              </div>
            </div>
          </div>

          <div className="mx-[26px] h-full w-[2px] bg-[#031124] opacity-10"></div>
          <div
          onClick={() => setShowDropDownMenu(!showDropDownMenu)}
          className="flex gap-4 cursor-pointer">
            <div className="">
              <h1 className="text-[14px] font-semibold">
                {userInfo?.fullName}
              </h1>
              <p className="text-[12px] text-end text-gray-400">
               {selectedmembers?.designation ? selectedmembers.designation :"User"}
              </p>
            </div>
            <img
              src={userInfo?.avatar ?? getAvatarUrl(userInfo?.fullName)}
              alt=""
              className="w-[35px] h-[35px] rounded-full"
            />
            <img
              className="w-[15px] cursor-pointer"
              src={ArrowDown}
              alt="dropdown menu"
              
            />
          </div>
          {/* User Dropdown Menu */}
          <div
            ref={userMenuDropDownRef}
            className={`z-[999] origin-top-right scale-0 pointer-events-none ${
              showDropDownMenu ? "scale-100 pointer-events-auto" : ""
            }  absolute top-[55px] w-[230px] min-h-[200px] bg-white normal-shadow border rounded-[20px] pt-[20px] pb-[10px]`}
          >
            <h2 className="px-[20px] text-[#818892] text-[16px]">Workspaces</h2>
            <div className="mt-[15px] flex flex-col">
              {workspaces?.length === 0 ? (
                <p className="px-[20px] text-[14px] text-gray-400 text-center">
                  No workspaces yet
                </p>
              ) : (
                workspaces?.map((workspace, idx) => {
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        dispatch(setSelectedWorkSpaceId(workspace?._id));
                        dispatch(setSelectedSpaceId(null));
                        dispatch(setSelectedSpaceObject(null));
                        navigate(`/projects/${workspace._id}`);
                        setShowDropDownMenu(false);
                      }}
                      className={`${
                        selectedWorkspaceId === workspace._id
                          ? "bg-gray-100"
                          : ""
                      } flex items-center gap-3 py-[10px] px-[20px] cursor-pointer`}
                    >
                      {workspace?.logo ? (
                        <img
                          src={workspace.logo}
                          alt=""
                          className="  w-[24px] h-[24px] bg-white rounded-full"
                        />
                      ) : (
                        <div className="w-[22px] h-[22px] bg-[#2C3782] flex items-center justify-center cursor-pointer rounded-full shadow-xl hover:bg-[#4D6378] text-white border font-medium text-[14px]">
                          {workspace?.name.charAt(0)}
                        </div>
                      )}
                      <p className="text-[14px]">{workspace.name}</p>
                    </div>
                  );
                })
              )}
            </div>
            <div className="w-[80%] mx-auto h-[1px] bg-gray-200 my-[15px]"></div>
            <div className="flex flex-col">
              <Link
                to="/settings/manage-workspace"
                className="cursor-pointer hover:bg-gray-100 flex items-center gap-3 px-[20px] py-[10px]"
                onClick={() => {
                  setShowDropDownMenu(false);
                }}
              >
                <img
                  className="w-[17px]"
                  src={SettingsIcon}
                  alt="Manage Workspace"
                />
                <h2 className="text-[14px]">Manage Workspace</h2>
              </Link>
              <Link
                to="/settings/profile"
                className="cursor-pointer hover:bg-gray-100 flex items-center gap-3 px-[20px] py-[10px]"
                onClick={() => {
                  setShowDropDownMenu(false);
                }}
              >
                <img className="w-[17px]" src={ProfileIcon} alt="Profile" />
                <h2 className="text-[14px]">Profile</h2>
              </Link>
              <div
                className="cursor-pointer hover:bg-gray-100 flex items-center gap-3 px-[20px] py-[10px]"
                onClick={handleLogOut}
              >
                <img className="w-[17px]" src={LogoutIcon} alt="Profile" />
                <h2 className="text-[14px]">Logout</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showNotificationBox && (
        <NotificationsModal
          setShowNotificationModal={setShowNotificationBox}
          notifications={notifications.all}
        />
      )}
    </>
  );
};

const AllNotification = ({ notifications }) => {
  return (
    <div className="flex flex-col gap-[4px] overflow-y-scroll h-full">
      {notifications?.map((notification) => {
        return (
          <div className="relative w-full pl-[16px] pr-[36px] py-[13px] flex items-center justify-between bg-[#C4FFF5] rounded-[10px]">
            <div className="flex items-center gap-[17px]">
              <div className="w-[50px] h-[50px] flex items-center justify-center bg-white rounded-full shrink-0">
                <BellIcon style={{ fill: "#13E5C0" }} />
              </div>
              <p className="text-[#031124]">{notification.message}</p>
            </div>
            {/* <div className="w-[24px] h-[24px] shrink-0 rounded-full bg-white flex items-center justify-center absolute right-[6px] top-[7px] cursor-pointer">
                            <img src={HorizontalDots} alt="" />
                        </div> */}
          </div>
        );
      })}
      {/* <div className="relative w-full pl-[16px] pr-[36px] py-[13px] flex items-center justify-between bg-[#C4FFF5] rounded-[10px]">
                <div className="flex items-center gap-[17px]">
                    <div className="w-[50px] h-[50px] flex items-center justify-center bg-white rounded-full shrink-0">
                        <BellIcon style={{ fill: "#13E5C0" }} />
                    </div>
                    <p className="text-[#031124]">
                        The Deadline for UI Design is knocking at the door. Do
                        it now. ( Deadline 18.12.2022)
                    </p>
                </div>
            </div>
            <div className="relative w-full pl-[16px] pr-[36px] py-[13px] flex items-center justify-between bg-[#FFEBF2] rounded-[10px]">
                <div className="flex items-center gap-[17px]">
                    <div className="w-[50px] h-[50px] flex items-center justify-center bg-white rounded-full shrink-0">
                        <BellIcon style={{ fill: "#FB397F" }} />
                    </div>
                    <p className="text-[#031124]">
                        The Deadline for UI Design is knocking at the door. Do
                        it now. ( Deadline 18.12.2022)
                    </p>
                </div>
                <div className="w-[24px] h-[24px] shrink-0 rounded-full bg-white flex items-center justify-center absolute right-[6px] top-[7px] cursor-pointer">
                    <img src={HorizontalDots} alt="" />
                </div>
            </div>
            <div className="relative w-full pl-[16px] pr-[36px] py-[13px] flex items-center justify-between bg-[#F2FAFF] rounded-[10px]">
                <div className="flex items-center gap-[14px]">
                    <img
                        src="https://thumbs.dreamstime.com/b/nice-to-talk-smart-person-indoor-shot-attractive-interesting-caucasian-guy-smiling-broadly-nice-to-112345489.jpg"
                        alt=""
                        className="w-[50px] h-[50px] object-cover rounded-full"
                    />
                    <p className="text-[#031124]">
                        Mahbub Rahman added you to Make Real as a UI/UX
                        designer.
                    </p>
                </div>
            </div> */}
    </div>
  );
};
const UnreadNotification = ({ notifications }) => {
  return (
    <div className="flex flex-col gap-[4px] overflow-y-scroll h-full">
      {notifications?.map((notification) => {
        return (
          <div className="relative w-full pl-[16px] pr-[36px] py-[13px] flex items-center justify-between bg-[#FFEBF2] rounded-[10px]">
            <div className="flex items-center gap-[17px]">
              <div className="w-[50px] h-[50px] flex items-center justify-center bg-white rounded-full shrink-0">
                <BellIcon style={{ fill: "#FB397F" }} />
              </div>
              <p className="text-[#031124]">{notification.message}</p>
            </div>
            {/* <div className="w-[24px] h-[24px] shrink-0 rounded-full bg-white flex items-center justify-center absolute right-[6px] top-[7px] cursor-pointer">
                            <img src={HorizontalDots} alt="" />
                        </div> */}
          </div>
        );
      })}
      {/* <div className="relative w-full pl-[16px] pr-[36px] py-[13px] flex items-center justify-between bg-[#F2FAFF] rounded-[10px]">
                <div className="flex items-center gap-[14px]">
                    <img
                        src="https://thumbs.dreamstime.com/b/nice-to-talk-smart-person-indoor-shot-attractive-interesting-caucasian-guy-smiling-broadly-nice-to-112345489.jpg"
                        alt=""
                        className="w-[50px] h-[50px] object-cover rounded-full"
                    />
                    <p className="text-[#031124]">
                        Mahbub Rahman added you to Make Real as a UI/UX
                        designer.
                    </p>
                </div>
            </div>
            <div className="relative w-full pl-[16px] pr-[36px] py-[13px] flex items-center justify-between bg-[#FFEBF2] rounded-[10px]">
                <div className="flex items-center gap-[17px]">
                    <div className="w-[50px] h-[50px] flex items-center justify-center bg-white rounded-full shrink-0">
                        <BellIcon style={{ fill: "#FB397F" }} />
                    </div>
                    <p className="text-[#031124]">
                        The Deadline for UI Design is knocking at the door. Do
                        it now. ( Deadline 18.12.2022)
                    </p>
                </div>
                <div className="w-[24px] h-[24px] shrink-0 rounded-full bg-white flex items-center justify-center absolute right-[6px] top-[7px] cursor-pointer">
                    <img src={HorizontalDots} alt="" />
                </div>
            </div>
            <div className="relative w-full pl-[16px] pr-[36px] py-[13px] flex items-center justify-between bg-[#C4FFF5] rounded-[10px]">
                <div className="flex items-center gap-[17px]">
                    <div className="w-[50px] h-[50px] flex items-center justify-center bg-white rounded-full shrink-0">
                        <BellIcon style={{ fill: "#13E5C0" }} />
                    </div>
                    <p className="text-[#031124]">
                        The Deadline for UI Design is knocking at the door. Do
                        it now. ( Deadline 18.12.2022)
                    </p>
                </div>
            </div> */}
    </div>
  );
};

export default TopNav;
