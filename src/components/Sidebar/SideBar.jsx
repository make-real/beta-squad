import {
    ArrowLeft,
    ArrowRight,
    Bell,
    CloseMenuBtn,
    DotsDouble,
    Eye,
    OpenMenuBtn,
    OverWatch,
    Plus,
    Search,
    SMS,
    SpaceLogo,
    SpaceLogoLock,
    Task,
} from "../../assets/icons";
import {
    UserSettingsDropDown,
    NotificationBell,
    NotificationSMS,
    ModalWorkSpaceCreate,
    ModalSpaceCreate,
    ModalSearchSpace,
} from ".";
import {
    addWorkSpace,
    setSelectedWorkSpaceId,
} from "../../store/slice/workspace";
import {
    addSpace,
    setSelectedSpaceId,
    setSelectedSpaceObject,
} from "../../store/slice/space";
import { get_space_members } from "../../api/space";
import {
    get_space_data,
    get_workspace_data,
    get_workspace_member,
} from "../../api/workSpace";
import { useStyleContext } from "../../context/StyleContext";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";
import asserts from "../../assets";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Avatar from "../Avatar";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { margin, setMargin } = useStyleContext();
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
            <section className={`fixed top-0 bottom-0 bg-gray-800 flex`}>
                {/* 🟨🟨🟨 always visible sidebar 🟨🟨🟨 */}
                <div className="flex flex-col items-center bg-[#293c4f] w-[50px] pt-2  ">
                    {margin ? (
                        <>
                            <div className="space-y-1">
                                {workspaces?.map((workSpace) => (
                                    <Tippy
                                        key={workSpace?._id}
                                        placement="right"
                                        content={workSpace?.name}
                                        className="bg-gray-600/70 text-[10px] w-40"
                                    >
                                        {/* if selected ==> bg-sideBarTextColor  |  hover:bg-[#4D6378]*/}
                                        <div
                                            className={`relative ml-1.5 mr-1 p-1.5 rounded-[5px] cursor-pointer duration-200 
                      ${
                          selectedWorkspace === workSpace?._id
                              ? "before:content-[''] before:absolute before:top-[50%] before:left-0 before:translate-y-[-50%] before:bg-white before:w-[2px] before:h-5 before:rounded-md"
                              : ""
                      }`}
                                            onClick={() =>
                                                dispatch(
                                                    setSelectedWorkSpaceId(
                                                        workSpace?._id
                                                    )
                                                )
                                            }
                                        >
                                            {workSpace.logo ? (
                                                <img
                                                    src={workSpace.logo}
                                                    alt="searchIcon"
                                                    className="rounded-[4px]"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 bg-[#1f2e3d] flex items-center justify-center cursor-pointer rounded-[5px] shadow-xl hover:bg-[#4D6378] text-gray-300 font-bold">
                                                    {workSpace.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                    </Tippy>
                                ))}
                            </div>

                            {/* ➕➕➕ Creating New Work-Space ➕➕➕ by opening Modal ➕➕➕ */}
                            <div
                                onClick={() => setNewWorkSpace(true)}
                                className="w-10 h-10 mt-2 bg-[#1f2e3d] flex items-center justify-center cursor-pointer rounded-[5px] shadow-xl hover:bg-[#4D6378] group"
                            >
                                <Plus className="text-white duration-200 group-hover:text-purple-300 hover: " />
                            </div>
                        </>
                    ) : (
                        <>
                            <OpenMenuBtn
                                width={28}
                                height={28}
                                onClick={() => setMargin(true)}
                                className="cursor-pointer text-gray-400 hover:text-gray-50"
                            />

                            {/* sidebar mene open command, but css disturb me :( */}
                            {/* onClick={() => { setUserMenu((pre) => ({ isOpen: !pre.isOpen, sideBar: true })) }} */}

                            <div className="mt-3 mb-2">
                                <img
                                    alt="userImage"
                                    src={
                                        userImg
                                            ? userImg
                                            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                    }
                                    className="w-6 h-6 rounded-full cursor-pointer"
                                />
                            </div>

                            <div className="w-10 h-10 mt-2 rounded-md hover:bg-[#3a4b5e] cursor-pointer flex justify-center items-center">
                                <Search />
                            </div>

                            <div className="w-10 h-10 mt-2 rounded-md hover:bg-[#3a4b5e] cursor-pointer flex justify-center items-center">
                                <Task />
                            </div>

                            <div className="w-10 h-10 mt-2 rounded-md hover:bg-[#3a4b5e] cursor-pointer flex justify-center items-center">
                                <OverWatch />
                            </div>
                        </>
                    )}
                </div>

                {/* 🟨🟨🟨 toggling sidebar 🟨🟨🟨 */}
                <div
                    className={`${
                        !margin ? "hidden" : "w-[275px]"
                    } bg-[#202F3E] duration-200`}
                >
                    <div className="flex items-center justify-between bg-[#162432] pr-3 pl-5">
                        <div className="flex items-center space-x-4 py-2 relative">
                            <Dropdown
                                position="bottom left"
                                width={230}
                                button={
                                    <div className="cursor-pointer">
                                        <Avatar user={user} />
                                    </div>
                                }
                                menu={() => (
                                    <UserSettingsDropDown
                                        userMenu={userMenu}
                                        setUserMenu={setUserMenu}
                                    />
                                )}
                            />
                            <Dropdown
                                position="bottom left"
                                width={500}
                                button={
                                    <div className=" cursor-pointer flex justify-center items-center">
                                        <SMS className="text-[#1F2E3D] hover:text-gray-200" />
                                    </div>
                                }
                                menu={() => (
                                    <NotificationSMS
                                        userNotificationSMS={
                                            userNotificationSMS
                                        }
                                    />
                                )}
                            />
                            <Dropdown
                                position="bottom left"
                                width={450}
                                button={
                                    <div className=" cursor-pointer flex justify-center items-center">
                                        <Bell className="text-[#1F2E3D] hover:text-gray-200" />
                                    </div>
                                }
                                menu={() => (
                                    <NotificationBell
                                        userNotificationBell={
                                            userNotificationBell
                                        }
                                    />
                                )}
                            />
                        </div>

                        {/* <p className="capitalize text-gray-500 text-sm">make real</p> */}

                        <div
                            className="cursor-pointer"
                            onClick={() => {
                                setMargin(false);
                                setUserMenu(false);
                                setUserNotificationBell(false);
                                setUserNotificationSMS(false);
                            }}
                        >
                            <CloseMenuBtn
                                width={24}
                                height={24}
                                className="text-gray-400 hover:text-gray-50"
                            />
                        </div>
                    </div>

                    {/* <div className="flex items-center w-full m-3 space-x-4">
            <div className="w-[60%] hover:bg-[#344453] duration-200 flex items-center space-x-3 p-2 mt-[2px] cursor-pointer rounded-lg mr-2 ">
              <Search />{" "}
              <p className="text-sideBarTextColor font-bold">Search...</p>
            </div>

            <div className="w-[20%] flex justify-between">
              <ArrowLeft className="cursor-pointer" />
              <ArrowRight className="cursor-pointer" />
            </div>
          </div> */}

                    {/* <div className="flex items-center px-2.5 py-1 m-2 hover:bg-[#344453] space-x-3 cursor-pointer rounded-lg">
            <Task />
            <p className="uppercase text-sideBarTextColor font-bold line-through text-sm">
              My Tasks
            </p>
          </div>
          <div className="flex items-center px-2.5 py-1 m-2 hover:bg-[#344453] space-x-3 cursor-pointer rounded-lg">
            <OverWatch />
            <p className="uppercase text-sideBarTextColor font-bold line-through text-sm">
              OverWatch
            </p>
          </div> */}

                    <div className="overflow-y-auto h-full">
                        <div className="flex w-full items-center m-3 justify-between pr-4">
                            {/* 🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎 */}
                            <div
                                className="hover:bg-[#344453] duration-200 flex items-center space-x-3 p-2 cursor-pointer rounded-lg mr-2 w-full active:bg-slate-900"
                                onClick={() => setSpaceSearchModal(true)}
                            >
                                <p className="text-sideBarTextColor font-bold w-full text-sm">
                                    YOUR SPACES
                                </p>
                                <Search />
                            </div>

                            <div
                                className="flex items-center justify-center cursor-pointer p-2 hover:bg-[#344453] rounded-lg duration-200 active:bg-slate-900"
                                onClick={() => setCreateSpaceModal(true)}
                            >
                                <Plus className="cursor-pointer text-gray-600 w-5 h-5 p-1 rounded-full bg-sideBarTextColor" />
                            </div>
                        </div>

                        {/* 🟨🟨🟨 Folder Creation 🟨🟨🟨 */}
                        {/* <div className="hover:bg-[#344453] duration-200 flex items-center p-2 cursor-pointer rounded-lg mr-2 ml-6 w-fit">
            <Folder className="text-[#3f5266] text-sm" />
            <p className="text-[#3f5266] font-bold ml-2 text-sm">
              Create Folder
            </p>
          </div> */}

                        {/* 🟨🟨🟨 User Space Join List 🟨🟨🟨 */}
                        <div className="ml-3">
                            {allSpaces?.map((space) => (
                                <div
                                    key={space._id}
                                    className="flex pr-2 items-center group"
                                    onClick={() => {
                                        dispatch(setSelectedSpaceId(space._id));
                                        dispatch(setSelectedSpaceObject(space));
                                        navigate("/projects");
                                    }}
                                >
                                    {/* <DotsDouble className="w-5 h-5 invisible group-hover:visible cursor-grab" /> */}

                                    <div
                                        className={`w-full flex items-center px-2.5 py-2 mb-2 hover:bg-[#344453] space-x-3 cursor-pointer rounded-lg ${
                                            selectedSpace === space._id
                                                ? "bg-gray-600"
                                                : ""
                                        } `}
                                    >
                                        {space.privacy.includes("private") ? (
                                            <SpaceLogoLock
                                                color={space.color || "#57BEC7"}
                                            />
                                        ) : (
                                            <SpaceLogo
                                                color={space.color || "#57BEC7"}
                                            />
                                        )}
                                        <p className="text-sm text-sideBarTextColor font-bold">
                                            {space.name}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex w-full items-center m-3 justify-between pr-4">
                            <div className="hover:bg-[#344453] duration-200 flex items-center space-x-3 p-2 cursor-pointer rounded-lg mr-2 w-full ">
                                <p className="text-sideBarTextColor font-bold w-full text-sm">
                                    CHATS
                                </p>{" "}
                                <Search />
                            </div>

                            <div className="flex items-center justify-center cursor-pointer p-2 hover:bg-[#344453] rounded-lg duration-200">
                                <Plus className="cursor-pointer text-gray-600 w-5 h-5 p-1 rounded-full bg-sideBarTextColor active:bg-slate-900" />
                            </div>
                        </div>

                        {/* 🟨🟨🟨 User Logo List 🟨🟨🟨 */}
                        <div>
                            {members.map((item) => (
                                <div
                                    onClick={() => openChat(item._id)}
                                    className="flex items-center justify-between p-2.5 mr-2 ml-3.5 hover:bg-[#344453] cursor-pointer rounded-lg group"
                                >
                                    <div className="flex items-center space-x-3">
                                        <Avatar user={item} />
                                        <p className="capitalize text-sideBarTextColor font-bold text-sm">
                                            {item.fullName}
                                        </p>
                                    </div>
                                    {/* <Eye className="invisible group-hover:visible" /> */}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            {newWorkSpace && (
                <ModalWorkSpaceCreate setNewWorkSpace={setNewWorkSpace} />
            )}

            {spaceSearchModal && (
                <ModalSearchSpace
                    allSpace={allSpaces}
                    setSpaceSearchModal={setSpaceSearchModal}
                    setCreateSpaceModal={setCreateSpaceModal}
                />
            )}

            {createSpaceModal && (
                <ModalSpaceCreate setCreateSpaceModal={setCreateSpaceModal} />
            )}
        </>
    );
};

export default SideBar;
