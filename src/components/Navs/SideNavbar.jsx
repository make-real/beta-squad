import React, { useEffect } from "react";
import { CloseMenuBtn, Plus } from "../../assets/icons";
import LogoIcon from "../../assets/logo.svg";
import BorderedPlusIcon from "../../assets/borderedplus.svg";
import SearchIcon from "../../assets/search.svg";
import SquadIcon from "../../assets/icon_component/Squad";
import { useState } from "react";
import { useDispatch } from "react-redux";
import FolderIcon from "../../assets/icon_component/Folder";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
    get_space_data,
    get_workspace_data,
    get_workspace_member,
} from "../../api/workSpace";
import {
    addWorkSpace,
    setSelectedWorkSpaceId,
} from "../../store/slice/workspace";
import {
    addSpace,
    setSelectedSpaceId,
    setSelectedSpaceObject,
} from "../../store/slice/space";
import { useSelector } from "react-redux";
import BriefCaseIcon from "../../assets/briefcase.svg";
import { ModalSearchSpace, ModalSpaceCreate } from "../Sidebar";
import CreateSquadModal from "../Home/Projects/Modals/CreateSquadModal";
import CreateWorkspaceModal from "../ManageWorkspace/Modals/CreateWorkspaceModal";

const SideNavbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentWorkspace = useSelector(
        (state) => state.workspace.currentWorkspace
    );
    const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] =
        useState(false);
    const [showFullBar, setShowFullBar] = useState(true);
    const [showCreateSquadModal, setShowCreateSquadModal] = useState(false);
    const [newWorkSpace, setNewWorkSpace] = useState(false);
    const [createSpaceModal, setCreateSpaceModal] = useState(false);
    const [spaceSearchModal, setSpaceSearchModal] = useState(false);
    const [userNotificationSMS, setUserNotificationSMS] = useState(false);
    const [userNotificationBell, setUserNotificationBell] = useState(false);
    const [userMenu, setUserMenu] = useState({ isOpen: false, sideBar: false });
    const { selectedSpace, allSpaces } = useSelector((state) => state.space);
    const { workspaces, selectedWorkspace } = useSelector(
        (state) => state.workspace
    );
    const [selectedChat, setSelectedChat] = useState(null);

    const [members, setMembers] = useState([]);

    const location = useLocation();

    const params = useParams();

    const manageWorkspacePage =
        location.pathname === "/settings/manage-workspace";
    const profilePage = location.pathname === "/settings/profile";
    const defaultPage = location.pathname.startsWith("/projects");

    useEffect(() => {
        if (selectedWorkspace) {
            getSpaceMember();
        }
    }, [selectedWorkspace]);

    const getSpaceMember = async () => {
        try {
            const { data } = await get_workspace_member(selectedWorkspace);
            setMembers(data?.teamMembers);
        } catch (error) {
            console.log(error);
        }
    };

    const user = JSON.parse(localStorage.getItem("userInfo"));
    const userImg = JSON.parse(localStorage.getItem("userInfo"))?.avatar;

    useEffect(() => {
        const getWorkSpaceData = async () => {
            try {
                const { data } = await get_workspace_data();

                dispatch(addWorkSpace(data.workspaces));

                if (!currentWorkspace) {
                    dispatch(setSelectedWorkSpaceId(data.workspaces[0]?._id));
                }
            } catch (error) {
                console.log(error);
            }
        };

        getWorkSpaceData();
    }, [dispatch, workspaces?.length]);

    useEffect(() => {
        const getSpaceData = async () => {
            try {
                const { data } = await get_space_data(
                    params.id ?? selectedWorkspace
                );

                dispatch(addSpace(data.spaces));

                // dispatch(setSelectedSpaceId(data.spaces[0]?._id));
                // dispatch(setSelectedSpaceObject(data.spaces[0]));
            } catch (error) {
                console.log("space selection ==> ", error);
            }
        };

        getSpaceData();
    }, [dispatch, selectedWorkspace]);

    const openChat = (id) => {
        navigate("single-chat/" + id);
    };

    return (
        <>
            <div
                className={`${
                    showFullBar
                        ? "min-w-[225px] w-[225px]"
                        : "w-max items-center"
                } bg-[#2C3782] pt-[20px] flex flex-col`}
            >
                <div
                    className={`flex items-center justify-between mb-[32px] ${
                        showFullBar
                            ? "pl-[25px] pr-[10px]"
                            : "pl-[25px] pr-[25px]"
                    }`}
                >
                    {showFullBar && (
                        <Link to="/" className="flex items-center gap-4">
                            <img
                                src={LogoIcon}
                                alt=""
                                className="w-[28px] h-[28px]"
                            />
                            <h1 className="text-[#C4CEFE] text-[20px]">
                                TaskM
                            </h1>
                        </Link>
                    )}
                    <div
                        className="w-max"
                        onClick={() => setShowFullBar(!showFullBar)}
                    >
                        <CloseMenuBtn className="text-white w-[28px] h-[28px] cursor-pointer" />
                    </div>
                </div>
                {/* Manage Workspace Sidebar */}
                {manageWorkspacePage && (
                    <>
                        <div
                            className={`mb-[15px] bg-[#6576FF20] flex items-center cursor-pointer py-[12px] justify-between 
                                    } 
                                ${
                                    showFullBar
                                        ? "pl-[25px] pr-[10px]"
                                        : "pl-[25px] pr-[25px]"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    className="w-[25px] h-[25px]"
                                    src={BriefCaseIcon}
                                    alt=""
                                />

                                {showFullBar && (
                                    <p className="text-[14px] text-[#C4CEFE] font-semibold">
                                        Workspaces
                                    </p>
                                )}
                            </div>
                            {showFullBar && (
                                <img
                                    onClick={() =>
                                        setShowCreateWorkspaceModal(true)
                                    }
                                    src={BorderedPlusIcon}
                                    alt=""
                                />
                            )}
                        </div>

                        {workspaces?.map((workspace) => (
                            <div className="flex flex-col gap-3">
                                <div
                                    className={`flex items-center gap-3 cursor-pointer py-[12px] 
                                    } 
                                ${
                                    showFullBar
                                        ? "pl-[25px]"
                                        : "pl-[25px] pr-[25px]"
                                }`}
                                >
                                    {workspace?.logo ? (
                                        <div className="w-[25px] h-[25px] ">
                                            <img
                                                src={workspace?.logo}
                                                alt=""
                                                className="w-full h-full bg-white  border border-[#5951F4] rounded-full"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-[25px] h-[25px] bg-[#2C3782] flex items-center justify-center cursor-pointer rounded-full shadow-xl hover:bg-[#4D6378] text-gray-300 border font-medium text-[14px]">
                                            {workspace?.name.charAt(0)}
                                        </div>
                                    )}
                                    {showFullBar && (
                                        <p className="text-[14px] text-white">
                                            {workspace?.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {/* Profile Sidebar */}
                {profilePage && (
                    <div
                        className={`mb-[15px] bg-[#6576FF20] flex items-center cursor-pointer py-[12px] justify-between 
                                    } 
                                ${
                                    showFullBar
                                        ? "pl-[25px] pr-[10px]"
                                        : "pl-[25px] pr-[25px]"
                                }`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-[30px] h-[30px] flex items-center justify-center bg-[#2C3782] rounded-full">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        opacity="0.4"
                                        d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M17.08 14.1499C14.29 12.2899 9.73996 12.2899 6.92996 14.1499C5.65996 14.9999 4.95996 16.1499 4.95996 17.3799C4.95996 18.6099 5.65996 19.7499 6.91996 20.5899C8.31996 21.5299 10.16 21.9999 12 21.9999C13.84 21.9999 15.68 21.5299 17.08 20.5899C18.34 19.7399 19.04 18.5999 19.04 17.3599C19.03 16.1299 18.34 14.9899 17.08 14.1499Z"
                                        fill="white"
                                    />
                                </svg>
                            </div>

                            {showFullBar && (
                                <p className="text-[14px] text-[#FFFFFF] font-semibold">
                                    Profile
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* Default Project Sidebar */}
                {/* Workspace */}
                {defaultPage && (
                    <div className="flex flex-col gap-3">
                        <div
                            onClick={() => {
                                dispatch(setSelectedSpaceId(null));
                                dispatch(setSelectedSpaceObject(null));
                                navigate("/projects");
                                setSelectedChat(null);
                            }}
                            className={`flex items-center gap-3 cursor-pointer py-[10px] ${
                                selectedChat
                                    ? ""
                                    : selectedSpace
                                    ? ""
                                    : "bg-[#6576FF10]"
                            } 
                                ${
                                    showFullBar
                                        ? "pl-[25px]"
                                        : "pl-[25px] pr-[25px]"
                                }`}
                        >
                            {currentWorkspace?.logo ? (
                                <div className="w-[32px] h-[32px] ">
                                    <img
                                        src={currentWorkspace?.logo}
                                        alt=""
                                        className="w-full h-full bg-white  border border-[#5951F4] rounded-full"
                                    />
                                </div>
                            ) : (
                                <div className="w-[25px] h-[25px] bg-[#2C3782] flex items-center justify-center cursor-pointer rounded-full shadow-xl hover:bg-[#4D6378] text-gray-300 border font-medium text-[14px]">
                                    {currentWorkspace?.name.charAt(0)}
                                </div>
                            )}
                            {showFullBar && (
                                <p className="text-[14px] text-white">
                                    {currentWorkspace?.name}
                                </p>
                            )}
                        </div>
                    </div>
                )}
                {/* Squad */}
                {defaultPage && (
                    <div className="mt-[24px]">
                        {showFullBar && (
                            <div
                                className={`flex items-center justify-between pl-[25px] pr-[10px]`}
                            >
                                <h2 className="text-[#6576FF] opacity-80">
                                    Your Squad
                                </h2>
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-max"
                                        onClick={() =>
                                            setSpaceSearchModal(true)
                                        }
                                    >
                                        <img
                                            src={SearchIcon}
                                            alt="search"
                                            className="cursor-pointer"
                                        />
                                    </div>
                                    <div
                                        className="w-max"
                                        onClick={() =>
                                            setShowCreateSquadModal(true)
                                        }
                                    >
                                        <img
                                            src={BorderedPlusIcon}
                                            alt=""
                                            className="cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Squads List */}
                        <div className="mt-[20px] flex flex-col">
                            {allSpaces.map((space) => {
                                return (
                                    <div
                                        className={`flex items-center gap-3 cursor-pointer py-[10px] ${
                                            selectedSpace === space._id
                                                ? "bg-[#6576FF10]"
                                                : ""
                                        }  ${
                                            showFullBar
                                                ? "pl-[25px]"
                                                : "pl-[25px] pr-[25px]"
                                        }`}
                                        onClick={() => {
                                            dispatch(
                                                setSelectedSpaceId(space._id)
                                            );
                                            dispatch(
                                                setSelectedSpaceObject(space)
                                            );
                                            setSelectedChat(null);
                                            navigate("/projects");
                                        }}
                                    >
                                        <FolderIcon
                                            style={{ fill: space.color }}
                                            className={`w-[20px] h-[20px]`}
                                        />
                                        {showFullBar && (
                                            <p className="text-[14px] text-[#C4CEFE]">
                                                {space.name}
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
                {/* Chats */}
                {defaultPage && (
                    <div className="mt-[50px]">
                        {showFullBar && (
                            <div className="flex items-center justify-between pl-[25px] pr-[10px]">
                                <h2 className="text-[#6576FF] opacity-80">
                                    Chats
                                </h2>
                                <div className="flex items-center gap-2">
                                    <img
                                        src={SearchIcon}
                                        alt="search"
                                        className="cursor-pointer"
                                    />
                                </div>
                            </div>
                        )}
                        {/* Chats List */}
                        <div className="mt-[15px] flex flex-col">
                            {members.map((member) => {
                                return (
                                    <div
                                        className={`flex items-center cursor-pointer py-[10px] gap-[10px] ${
                                            selectedChat?._id === member?._id
                                                ? "bg-[#6576FF10]"
                                                : ""
                                        } ${
                                            showFullBar
                                                ? "pl-[25px]"
                                                : "pl-[25px] pr-[25px]"
                                        }`}
                                        onClick={() => {
                                            // openChat(member._id)
                                            dispatch(setSelectedSpaceId(null));
                                            dispatch(
                                                setSelectedSpaceObject(null)
                                            );
                                            setSelectedChat(member);
                                            navigate(
                                                `/projects/chat/${member?._id}`
                                            );
                                        }}
                                    >
                                        <img
                                            src={member.avatar}
                                            className="w-[28px] h-[28px] rounded-full border object-cover"
                                            alt=""
                                        />
                                        {showFullBar && (
                                            <p className="text-[#C4CEFE] text-[14px]">
                                                {member.fullName}
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
                {/* Footer Copyright */}
                <p
                    className={`text-[#C4CEFE] ${
                        showFullBar ? "text-[12px] pl-[25px]" : "text-[22px]"
                    } mt-auto mb-[16px]`}
                >
                    &copy;
                    {showFullBar && (
                        <span className="ml-[10px]">Taskmanager 2022</span>
                    )}
                </p>
            </div>

            {spaceSearchModal && (
                <ModalSearchSpace
                    allSpace={allSpaces}
                    setSpaceSearchModal={setSpaceSearchModal}
                    setCreateSpaceModal={setCreateSpaceModal}
                />
            )}

            {showCreateWorkspaceModal && (
                <CreateWorkspaceModal
                    setShowCreateWorkspaceModal={setShowCreateWorkspaceModal}
                />
            )}

            {showCreateSquadModal && (
                <CreateSquadModal
                    setShowCreateSquadModal={setShowCreateSquadModal}
                />
            )}
        </>
    );
};

export default SideNavbar;
