import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoIcon from "../../assets/logo.svg";
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

const TopNav = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [jwt, setJwt] = useState(null);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const jwt = JSON.parse(localStorage.getItem("jwt"));
        setUserInfo(userInfo);
        setJwt(jwt);
    }, []);

    return (
        <div className="bg-white py-[15px] px-[50px] shadow-md min-h-[70px] max-h-[70px] w-full flex">
            {jwt ? (
                <LoggedInTopNav userInfo={userInfo} />
            ) : (
                <NotLoggedInTopNav />
            )}
        </div>
    );
};

const LoggedInTopNav = ({ userInfo }) => {
    const selectedWorkspaceId = useSelector(
        (state) => state.workspace.selectedWorkspace
    );
    const [showDropDownMenu, setShowDropDownMenu] = useState(false);
    const workspaces = useSelector((state) => state.workspace.workspaces);
    const [showNotificationModal, setShowNotificationModal] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogOut = async () => {
        setShowDropDownMenu(false);
        try {
            await userLogOut();
        } catch (error) {
            console.log(error);
        }

        localStorage.clear();
        navigate("/");
    };

    return (
        <>
            <div className="relative flex justify-end w-full">
                <img
                    onClick={() => setShowNotificationModal(true)}
                    className="w-[18px] cursor-pointer"
                    src={NotificationIcon}
                    alt="notification"
                />
                <div className="mx-[35px] h-full w-[2px] bg-[#031124] opacity-10"></div>
                <div className="flex gap-4">
                    <div className="">
                        <h1 className="text-[14px] font-semibold">
                            {userInfo?.fullName}
                        </h1>
                        <p className="text-[12px] text-end text-gray-400">
                            @{userInfo?.username}
                        </p>
                    </div>
                    <img
                        src={userInfo?.avatar}
                        alt=""
                        className="w-[35px] h-[35px] rounded-full"
                    />
                    <img
                        className="w-[15px] cursor-pointer"
                        src={ArrowDown}
                        alt="dropdown menu"
                        onClick={() => setShowDropDownMenu(!showDropDownMenu)}
                    />
                </div>

                {/* DropDown Menu */}
                <div
                    className={`z-[999] origin-top-right scale-0 pointer-events-none ${
                        showDropDownMenu ? "scale-100 pointer-events-auto" : ""
                    } transition-transform absolute top-[50px] w-[230px] min-h-[200px] bg-white normal-shadow border rounded-[20px] pt-[20px] pb-[10px]`}
                >
                    <h2 className="px-[20px] text-[#818892] text-[16px]">
                        Workspaces
                    </h2>
                    <div className="mt-[15px] flex flex-col">
                        {workspaces?.length === 0 ? (
                            <p className="px-[20px] text-[14px] text-gray-400 text-center">
                                No workspaces yet
                            </p>
                        ) : (
                            workspaces?.map((workspace) => {
                                return (
                                    <div
                                        onClick={() => {
                                            dispatch(
                                                setSelectedWorkSpaceId(
                                                    workspace?._id
                                                )
                                            );
                                            dispatch(setSelectedSpaceId(null));
                                            dispatch(
                                                setSelectedSpaceObject(null)
                                            );
                                            navigate("/projects");
                                            setShowDropDownMenu(false);
                                        }}
                                        className={`${
                                            selectedWorkspaceId ===
                                            workspace._id
                                                ? "bg-gray-100"
                                                : ""
                                        } flex items-center gap-3 py-[10px] px-[20px] cursor-pointer`}
                                    >
                                        {workspace?.logo ? (
                                            <img
                                                src="https://images.vexels.com/media/users/3/224136/isolated/preview/3254497f70189b201e55780274dc1035-abstract-person-blue-logo.png"
                                                alt=""
                                                className="border border-[#5951F4] w-[22px] h-[22px] bg-white rounded-full"
                                            />
                                        ) : (
                                            <div className="w-[22px] h-[22px] bg-[#2C3782] flex items-center justify-center cursor-pointer rounded-full shadow-xl hover:bg-[#4D6378] text-white border font-medium text-[14px]">
                                                {workspace?.name.charAt(0)}
                                            </div>
                                        )}
                                        <p className="text-[14px]">
                                            {workspace.name}
                                        </p>
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
                            <img
                                className="w-[17px]"
                                src={ProfileIcon}
                                alt="Profile"
                            />
                            <h2 className="text-[14px]">Profile</h2>
                        </Link>
                        <div
                            className="cursor-pointer hover:bg-gray-100 flex items-center gap-3 px-[20px] py-[10px]"
                            onClick={handleLogOut}
                        >
                            <img
                                className="w-[17px]"
                                src={LogoutIcon}
                                alt="Profile"
                            />
                            <h2 className="text-[14px]">Logout</h2>
                        </div>
                    </div>
                </div>
            </div>

            {showNotificationModal && (
                <NotificationsModal
                    setShowNotificationModal={setShowNotificationModal}
                />
            )}
        </>
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
    console.log(location.pathname === "/register");
    console.log(currentPage);
    return (
        <div className="flex justify-between w-full">
            <div className="flex items-center gap-2">
                <img src={LogoIcon} alt="logo" />
                <h1 className="text-[#6576FF] text-[20px]">TaskM</h1>
            </div>
            <Link
                to={`${currentPage === "register" ? "/" : "/register"}`}
                className="bg-[#6576FF] px-[30px] py-[10px] text-white rounded-md font-normal text-sm cursor-pointer"
            >
                {currentPage === "register" ? "Login" : "Register"}
            </Link>
        </div>
    );
};

export default TopNav;
