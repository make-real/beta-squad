import React, { useState } from "react";
import { Link, useLocation, useNavigate,  } from "react-router-dom";
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
import avatar from "../../assets/profile_circle.svg";
import { setSelectedWorkSpaceId } from "../../store/slice/workspace";
import {
  setSelectedSpaceId,
  setSelectedSpaceObject,
} from "../../store/slice/space";
import BellIcon from "../../assets/icon_component/NotificationIcon";
import { get_notifications } from "../../api/notification";
import { useRef } from "react";
import Search from "./search";

const TopNav = () => {
  const [jwt, setJwt] = useState(null);
  useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
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
        <img
          src={LogoIcon}
          className="h-[28px] w-[28px] lg:w-[35px] lg:h-[35px] xl:h-[35px] xl:w-[35px]"
          alt="logo"
        />
        <h1 className="text-[#0D1282] text-[18px] xl:text-[20px]  lg:text-[20px] font-semibold">
          Squad
        </h1>
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
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [userInfo, setUserInfo] = useState(user);
  useEffect(() => {
    setUserInfo(user);
  }, []);

  const selectedWorkspaceId = useSelector(
    (state) => state.workspace.selectedWorkspace
  );

  const [showDropDownMenu, setShowDropDownMenu] = useState(false);
  const workspaces = useSelector((state) => state.workspace.workspaces);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notifications, setNotifications] = useState({
    seen: null,
    unseen: null,
    all: null,
    count1: 0,
    count2: 0,
  });

  const members = useSelector((state) => state.workspace.workspaceMembers);
  const selectedmembers = members?.find(
    (member) => member?.email === userInfo?.email
  );
  const userMenuDropDownRef = useRef();
  const notificationDropDownRef = useRef();

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
        count2: unseenNotifications?.length,
      });
    } catch (err) {
      setNotifications({
        seen: null,
        unseen: null,
        all: null,
        count1: 0,
        count2: 0,
      });
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



  return (
    <>
      <div
        className={`relative py-[15px] pl-[19px] pr-[66px] flex items-center w-full justify-between`}
      >
        <Search />

        <div className="flex items-center h-full">
          <div className="relative">
            <img
              onClick={() => setShowNotificationModal(!showNotificationModal)}
              className="w-[22px] cursor-pointer"
              src={NotificationIcon}
              alt="notification"
            />
            {notifications.count2 ? (
              <span className="w-[8px] h-[8px] rounded-full absolute -top-[6px] left-4 bg-red-500"></span>
            ) : (
              <></>
            )}

            {/* Notifications Dropdown Menu */}
            <div
              ref={notificationDropDownRef}
              className={`z-[999] origin-top-right scale-0 pointer-events-none ${
                showNotificationModal ? "scale-100 pointer-events-auto" : ""
              } transition-transform absolute top-[30px] -right-[15px] w-[425px] h-[480px] bg-white normal-shadow border rounded-[16px] pt-[10px] px-[16px] pb-[20px] flex flex-col`}
            >
           <h2 className="text-xl font-semibold">
           Notification
           </h2>
              {/* Content */}
              <div className="mt-[10px] h-full overflow-hidden">
                <div className="flex flex-col gap-[4px] overflow-y-scroll h-full">
                  {notifications?.unseen?.map((notification) => {
                    return (
                      <div className="relative w-full pl-[16px] pr-[36px] py-[13px] flex items-center justify-between bg-[#f7f7f7] rounded-[10px]">
                        <div className="flex items-center gap-[17px]">
                          <div className="w-[50px] h-[50px] flex items-center justify-center bg-white rounded-full shrink-0">
                           <BellIcon style={{ fill: "#FB397F" }} />
                          </div>
                          <p className="text-[#031124]">
                            {notification?.message}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  {notifications?.seen?.map((notification) => {
                    return (
                      <div className="relative w-full pl-[16px] pr-[36px] py-[13px] flex items-center justify-between bg-[#f7f7f7] rounded-[10px]">
                        <div className="flex items-center gap-[17px]">
                          <div className="w-[50px] h-[50px] flex items-center justify-center bg-white rounded-full shrink-0">
                           <BellIcon style={{ fill: "black" }} />
                          </div>
                          <p className="text-[#031124]">
                            {notification?.message}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
               
              </div>
            </div>
          </div>

          <div className="mx-[26px] h-full w-[2px] bg-[#031124] opacity-10"></div>
          <div
            onClick={() => setShowDropDownMenu(!showDropDownMenu)}
            className="flex gap-4 cursor-pointer"
          >
            <div className="">
              <h1 className="text-[14px] font-semibold">
                {userInfo?.fullName}
              </h1>
              <p className="text-[12px] text-end text-gray-400">
                {selectedmembers?.designation}
              </p>
            </div>
            <img
              src={userInfo?.avatar ? userInfo?.avatar : avatar}
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

   
    </>
  );
};



export default TopNav;
