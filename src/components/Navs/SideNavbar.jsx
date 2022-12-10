import React, { useEffect } from "react";
import { CloseMenuBtn, Plus } from "../../assets/icons";
import LogoIcon from "../../assets/logo.svg";
import BorderedPlusIcon from "../../assets/borderedplus.svg";
import SearchIcon from "../../assets/search.svg";
import SquadIcon from "../../assets/icon_component/Squad";
import { useState } from "react";
import { useDispatch } from "react-redux";
import FolderIcon from "../../assets/icon_component/Folder";
import { useNavigate } from "react-router-dom";
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
import { ModalSearchSpace, ModalSpaceCreate } from "../Sidebar";
import CreateSquadModal from "../Home/Projects/Modals/CreateSquadModal";

const SideNavbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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

    console.log('############### SIDEBAR ################')
    console.log(selectedWorkspace)
    console.log('###############################')


    const [members, setMembers] = useState([]);

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

                dispatch(setSelectedWorkSpaceId(data.workspaces[0]?._id));
            } catch (error) {
                console.log(error);
            }
        };

        getWorkSpaceData();
    }, [dispatch, workspaces?.length]);

    useEffect(() => {
        const getSpaceData = async () => {
            try {
                const { data } = await get_space_data(selectedWorkspace);

                dispatch(addSpace(data.spaces));

                dispatch(setSelectedSpaceId(data.spaces[0]?._id));
                dispatch(setSelectedSpaceObject(data.spaces[0]));
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
                    className={`flex items-center justify-between ${
                        showFullBar
                            ? "pl-[25px] pr-[10px]"
                            : "pl-[25px] pr-[25px]"
                    }`}
                >
                    {showFullBar && (
                        <div className="flex items-center gap-4">
                            <img
                                src={LogoIcon}
                                alt=""
                                className="w-[28px] h-[28px]"
                            />
                            <h1 className="text-[#C4CEFE] text-[20px]">
                                TaskM
                            </h1>
                        </div>
                    )}
                    <div
                        className="w-max"
                        onClick={() => setShowFullBar(!showFullBar)}
                    >
                        <CloseMenuBtn className="text-white w-[28px] h-[28px] cursor-pointer" />
                    </div>
                </div>
                {/* Workspace */}
                <div className="mt-[32px] flex flex-col gap-3">
                    {workspaces.map((workSpace) => {
                        return (
                            <div
                                className={`flex items-center gap-3 cursor-pointer py-[10px] ${
                                    selectedWorkspace === workSpace?._id
                                        ? "bg-[#6576FF10]"
                                        : ""
                                } ${
                                    showFullBar
                                        ? "pl-[25px]"
                                        : "pl-[25px] pr-[25px]"
                                }`}
                                onClick={() => {
                                    dispatch(
                                        setSelectedWorkSpaceId(workSpace?._id)
                                    );
                                }}
                            >
                                {workSpace.logo ? (
                                    <div className="w-[32px] h-[32px] ">
                                        <img
                                            src={workSpace.logo}
                                            alt=""
                                            className="w-full h-full bg-white  border border-[#5951F4] rounded-full"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-10 h-10 bg-[#2C3782] flex items-center justify-center cursor-pointer rounded-[5px] shadow-xl hover:bg-[#4D6378] text-gray-300 font-bold border">
                                        {workSpace.name.charAt(0)}
                                    </div>
                                )}
                                {showFullBar && (
                                    <p className="text-[14px] text-white">
                                        {workSpace?.name}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
                {/* Squad */}
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
                                    onClick={() => setSpaceSearchModal(true)}
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
                    <div className="mt-[20px] flex flex-col gap-[20px]">
                        {allSpaces.map((space) => {
                            return (
                                <div
                                    className={`flex items-center gap-3 cursor-pointer  ${
                                        showFullBar
                                            ? "pl-[25px]"
                                            : "pl-[25px] pr-[25px]"
                                    }`}
                                    onClick={() => {
                                        dispatch(setSelectedSpaceId(space._id));
                                        dispatch(setSelectedSpaceObject(space));
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
                {/* Chats */}
                <div className="mt-[50px]">
                    {showFullBar && (
                        <div className="flex items-center justify-between pl-[25px] pr-[10px]">
                            <h2 className="text-[#6576FF] opacity-80">Chats</h2>
                            <div className="flex items-center gap-2">
                                <img
                                    src={SearchIcon}
                                    alt="search"
                                    className="cursor-pointer"
                                />
                                <img
                                    src={BorderedPlusIcon}
                                    alt="add"
                                    className="cursor-pointer"
                                />
                            </div>
                        </div>
                    )}
                    {/* Chats List */}
                    <div className="mt-[15px] flex flex-col gap-[15px]">
                        {members.map((member) => {
                            return (
                                <div
                                    className={`flex items-center cursor-pointer gap-[10px] ${
                                        showFullBar
                                            ? "pl-[25px]"
                                            : "pl-[25px] pr-[25px]"
                                    }`}
                                    onClick={() => openChat(member._id)}
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

            {/* {createSpaceModal && (
                <ModalSpaceCreate setCreateSpaceModal={setCreateSpaceModal} />
            )} */}

            {showCreateSquadModal && (
                <CreateSquadModal
                    setShowCreateSquadModal={setShowCreateSquadModal}
                />
            )}
        </>
    );
};

export default SideNavbar;
