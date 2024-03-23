import React, { useEffect } from "react";  
import LogoIcon from "../../assets/logo.jpeg";
import CollapseIcon from "../../assets/collapse.jpeg";
import BorderedPlusIcon from "../../assets/borderedplus.svg";
import ChatIcon from "../../assets/ChatIcon.svg";
import ClockIcon from "../../assets/clock.svg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import FolderIcon from "../../assets/icon_component/Folder";
import PrivateFolderIcon from "../../assets/icon_component/PrivateFolder";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import avatar from "../../../src/assets/profile_circle.svg";
import {
  get_space_data,
  get_workspace_data,
  get_workspace_member,
} from "../../api/workSpace";
import {
  addWorkSpace,
  addWorkspaceMembers,
  setSelectedWorkSpaceId,
} from "../../store/slice/workspace";
import {
  addSpace,
  setSelectedSpaceId,
  setSelectedSpaceObject,
} from "../../store/slice/space";
import { useSelector } from "react-redux";
import BriefCaseIcon from "../../assets/briefcase.svg";
import { ModalSearchSpace, } from "../Sidebar";
import CreateSquadModal from "../Home/Projects/Modals/CreateSquadModal";
import CreateWorkspaceModal from "../ManageWorkspace/Modals/CreateWorkspaceModal";
import { toggleFullSidebar } from "../../store/slice/screen";
import { getAvatarUrl } from "../../util/getAvatarUrl";
import ComingSoonModal from "../Modals/ComingSoonModal";
import { useCommingSoonContext } from "../../context/FeatureContext";
import AddMemberModal from "../Home/WorkspaceMembers/Modals/AddMemberModal";
import { useUserInfoContext } from "../../context/UserInfoContext";

const SideNavbar = ({ShowSubscription}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentWorkspace = useSelector(
    (state) => state.workspace.currentWorkspace
  );

  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] =
    useState(false);
  const fullSidebar = useSelector((state) => state.screen.fullSidebar);
  const [showCreateSquadModal, setShowCreateSquadModal] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const [createSpaceModal, setCreateSpaceModal] = useState(false);
  const [spaceSearchModal, setSpaceSearchModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const { selectedSpace, allSpaces } = useSelector((state) => state.space);
  const workspaces = useSelector((state) => state.workspace.workspaces);
  const selectedWorkspace = useSelector(
    (state) => state.workspace.selectedWorkspace
  );
  const [selectedChat, setSelectedChat] = useState(null);
  const { loginUserInfo } = useUserInfoContext();

  const members = useSelector((state) => state.workspace.workspaceMembers);
  
  const adminRoll = members?.filter((member) => member.role === "owner" || "admin");
  
  const showPlusButton = adminRoll.map(
    (admin) => admin?._id === loginUserInfo?._id
  );
 

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
      dispatch(addWorkspaceMembers(data?.teamMembers ?? []));
    } catch (error) {
      console.log(error);
    }
  };

  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const getWorkSpaceData = async () => {
      try {
        const { data } = await get_workspace_data();

        dispatch(addWorkSpace(data.workspaces));

        if (params.workspace_id) {
          dispatch(setSelectedWorkSpaceId(params.workspace_id));
        } else {
          if (!currentWorkspace) {
            dispatch(setSelectedWorkSpaceId(data.workspaces[0]?._id));
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    getWorkSpaceData();
  }, [dispatch]);


  useEffect(() => {
    const getSpaceData = async () => {
      try {
        const { data } = await get_space_data(
          params.workspace_id ?? selectedWorkspace
        );

        dispatch(addSpace(data.spaces));

        // dispatch(setSelectedSpaceId(data.spaces[0]?._id));
        // dispatch(setSelectedSpaceObject(data.spaces[0]));
      } catch (error) {
        console.log("space selection ==> ", error);
      }
    };

    getSpaceData();
  }, [selectedWorkspace, params.workspace_id, dispatch]);



  const isFirstTime =
    JSON.parse(localStorage.getItem("stepFinished")) === true
      ? false
      : (workspaces?.length === 1 && allSpaces?.length === 0) ||
        (allSpaces[0]?.name === "Onboarding" &&
          [...members.filter((m) => m?._id !== user?._id)].length === 0);

  const firstTimeSquad =
    JSON.parse(localStorage.getItem("stepFinished")) === true
      ? false
      : (allSpaces?.length === 0 || allSpaces[0]?.name === "Onboarding") &&
        allSpaces.length === 1;

  const firstTimeMember =
    JSON.parse(localStorage.getItem("stepFinished")) === true
      ? false
      : [...members.filter((m) => m?._id !== user?._id)].length === 0;

  const squadOnDrop = (e) => {
    e.preventDefault();
    e.target.classList.remove("border-b-2");
    e.target.classList.remove("border-[#6576FF]");

    const targetId = e.target.getAttribute("data-id");
    const draggedId = e.dataTransfer.getData("id");

    const newOrder = [...allSpaces];

    const targetIndex = newOrder.indexOf(
      newOrder.find((s) => s._id === targetId)
    );
    const draggedIndex = newOrder.indexOf(
      newOrder.find((s) => s._id === draggedId)
    );

    newOrder.splice(draggedIndex, 1);
    newOrder.splice(
      targetIndex,
      0,
      allSpaces.find((s) => s._id === draggedId)
    );
    dispatch(addSpace(newOrder));
  };

  //  active status

  useEffect(() => {
    function onlineHandler() {
      setIsOnline(true);
    }

    function offlineHandler() {
      setIsOnline(false);
    }

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);

  // #2C3782
  return (
    <>
      <div
        className={`${
          fullSidebar ? "min-w-[225px] w-[225px]" : "w-max items-center"
        } bg-[#FAFAFA] pt-[20px] flex flex-col fixed left-0 ${ShowSubscription? "top-[34px]":"top-0"} z-[50] h-screen overflow-y-scroll no-scrollbar`}
      >
        <div
          className={`flex items-center justify-between mb-[32px] ${
            fullSidebar ? "pl-[25px] pr-[10px]" : "pl-[25px] pr-[25px]"
          }`}
        >
          {fullSidebar && (
            <Link
              to={`/projects/${selectedWorkspace}`}
              className="flex items-center gap-4"
            >
              <img src={LogoIcon} alt="" className="w-[28px] h-[28px]" />
              <h1 className="text-[#0D1282] text-[20px] font-semibold">
                Squad
              </h1>
            </Link>
          )}

          <div
            className="w-max"
            onClick={() => {
              dispatch(toggleFullSidebar());
            }}
          >
            <img
              src={CollapseIcon}
              alt=""
              className={`text-[#0D1282] w-[28px] h-[28px] cursor-pointer transition-all duration-500 ${
                fullSidebar ? "" : "rotate-180"
              }`}
            />
            {/* <CloseMenuBtn
              className={`text-[#0D1282] w-[28px] h-[28px] cursor-pointer transition-all duration-500 ${
                fullSidebar ? "" : "rotate-180"
              }`}
            /> */}
          </div>
        </div>
        {/* Manage Workspace Sidebar */}
        {manageWorkspacePage && (
          <>
            <div
              className={`mb-[15px] bg-[#6576FF20] flex items-center cursor-pointer py-[12px] justify-between 
                                    } 
                                ${
                                  fullSidebar
                                    ? "pl-[25px] pr-[10px]"
                                    : "pl-[25px] pr-[25px]"
                                }`}
            >
              <div className="flex items-center gap-3">
                <img className="w-[25px] h-[25px]" src={BriefCaseIcon} alt="" />

                {fullSidebar && (
                  <p className="text-[14px] text-[#424D5B] font-semibold">
                    Workspaces
                  </p>
                )}
              </div>
              {/* {fullSidebar && (
                <img
                  onClick={() => setShowCreateWorkspaceModal(true)}
                  src={BorderedPlusIcon}
                  alt=""
                />
              )} */}
            </div>

            {workspaces?.map((workspace, idx) => (
              <Link
                key={idx}
                to={`/projects/${workspace._id}`}
                className="flex flex-col gap-3"
              >
                <div
                  className={`flex items-center gap-3 cursor-pointer py-[12px] 
                                    } 
                                ${
                                  fullSidebar
                                    ? "pl-[25px]"
                                    : "pl-[25px] pr-[25px]"
                                }`}
                >
                  {workspace?.logo ? (
                    <div className="w-[25px] h-[25px] ">
                      <img
                        src={workspace?.logo}
                        alt=""
                        className="w-full h-full bg-[#2C3782]  border border-[#5951F4] rounded-full"
                      />
                    </div>
                  ) : (
                    <div className="w-[25px] h-[25px] bg-[#2C3782] flex items-center justify-center cursor-pointer rounded-full shadow-xl  text-white border font-medium text-[14px]">
                      {workspace?.name.charAt(0)}
                    </div>
                  )}
                  {fullSidebar && (
                    <p className="text-[14px] text-[#424D5B]">
                      {workspace?.name}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </>
        )}

        {/* Profile Sidebar */}
        {profilePage && (
          <div
            className={`mb-[15px] bg-[#6576FF20] flex items-center cursor-pointer py-[12px] justify-between 
                                    } 
                                ${
                                  fullSidebar
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

              {fullSidebar && (
                <p className="text-[14px] text-[#0D1282] font-semibold">
                  Profile
                </p>
              )}
            </div>
          </div>
        )}

        {/* Default Project Sidebar */}
        {/* Workspace */}

        {defaultPage && (
          <div
            onClick={() => {
              dispatch(setSelectedSpaceId(null));
              dispatch(setSelectedSpaceObject(null));
              navigate(`/projects/${selectedWorkspace}`);
              setSelectedChat(null);
            }}
            className={` mb-0 flex items-center  gap-2  cursor-pointer py-[12px] justify-between ${
              selectedChat
                ? ""
                : selectedSpace
                ? "justify-between"
                : "bg-[#CBCCE1] "
            } 
                        ${
                          fullSidebar
                            ? "pl-[25px] pr-[25px]"
                            : "pl-[25px] pr-[25px]"
                        }`}
          >
            <div className="flex items-center gap-3">
              {currentWorkspace?.logo ? (
                <div className="w-[28px] h-[28px] ">
                  <img
                    src={currentWorkspace?.logo}
                    alt=""
                    className="w-full h-full bg-white    rounded-full"
                  />
                </div>
              ) : (
                <div className=" w-[30px] h-[25px] bg-[#2C3782] flex items-center justify-center cursor-pointer rounded-full shadow-xl hover:bg-[#4D6378] text-gray-300 border font-medium text-[14px]">
                  {currentWorkspace?.name.charAt(0)}
                </div>
              )}

              {fullSidebar && (
                <p className="text-[14px]  text-black">
                  {currentWorkspace?.name}
                </p>
              )}
            </div>

            {/* bug issue */}
            {showPlusButton[0] && (
              <div>
                {fullSidebar && (
                  <img
                    onClick={() => setShowCreateSquadModal(true)}
                    src={BorderedPlusIcon}
                    alt=""
                  />
                )}
              </div>
            )}
          </div>
        )}
        {/* {defaultPage && (
          <div className="flex justify-between  items-center w-full ">
            <div
              onClick={() => {
                dispatch(setSelectedSpaceId(null));
                dispatch(setSelectedSpaceObject(null));
                navigate(`/projects/${selectedWorkspace}`);
                setSelectedChat(null);
              }}
              className={` bg-[#6576FF20] flex items-center  gap-2  cursor-pointer py-[12px] justify-between ${
                selectedChat
                  ? ""
                  : selectedSpace
                  ? "justify-between"
                  : "bg-[#CBCCE1] "
              } 
                                ${
                                  fullSidebar
                                    ? "pl-[25px] pr-[25px]"
                                    : "pl-[25px] pr-[25px]"
                                }`}
            >
              <div className="flex gap-2 items-center">
                {currentWorkspace?.logo ? (
                  <div className="w-[28px] h-[28px] ">
                    <img
                      src={currentWorkspace?.logo}
                      alt=""
                      className="w-full h-full bg-white    rounded-full"
                    />
                  </div>
                ) : (
                  <div className=" w-[30px] h-[25px] bg-[#2C3782] flex items-center justify-center cursor-pointer rounded-full shadow-xl hover:bg-[#4D6378] text-gray-300 border font-medium text-[14px]">
                    {currentWorkspace?.name.charAt(0)}
                  </div>
                )}
                {fullSidebar && (
                  <p className="text-[14px]  text-black">
                    {currentWorkspace?.name}
                  </p>
                )}
              </div>
              <div>
                {fullSidebar && (
                  <div
                    className="w-max    text-end"
                    onClick={() => setShowCreateSquadModal(true)}
                  >
                    <img
                      src={BorderedPlusIcon}
                      alt=""
                      className="cursor-pointer text-[#0D1282] "
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )} */}
        {/* Squad */}
        {defaultPage && (
          <div className="">
            {/* {fullSidebar && (
              <div
                className={`flex items-center justify-between pl-[17px] pr-[10px]`}
              >
             <div className="flex gap-2 pl-[17px]">
             <img
                      src={Squad}
                      alt=""
                      className="cursor-pointer text-[#0D1282] "
                    />
                <h2 className="text-[#0D1282] font-normal leading-[36px]">My  Squad</h2>
             </div>
                <div className="flex items-center gap-2">
               
                  <div
                    className="w-max"
                    onClick={() => setShowCreateSquadModal(true)}
                  >
                    <img
                      src={BorderedPlusIcon}
                      alt=""
                      className="cursor-pointer text-[#0D1282] "
                    />
                  </div>
                </div>
              </div>
            )} */}
            {!fullSidebar && (
              <h1 className="text-[#0D1282] text-center">Squad</h1>
            )}
            {/* Squads List */}
            {(!isFirstTime || !firstTimeSquad) && (
              <div className="mt-[10px] flex flex-col">
                {allSpaces.map((space, idx) => {
                  if (space.name === "Onboarding") return;
                  return (
                    <div
                      key={idx}
                      draggable={true}
                      onDragStart={(e) => {
                        e.dataTransfer.setData(
                          "id",
                          e.target.getAttribute("data-id")
                        );
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                      }}
                      onDragLeave={(e) => {
                        e.target.classList.remove("border-b-2");
                        e.target.classList.remove("border-[#6576FF]");
                      }}
                      onDragEnter={(e) => {
                        e.target.classList.add("border-b-2");
                        e.target.classList.add("border-[#6576FF]");
                      }}
                      onDrop={squadOnDrop}
                      data-id={space._id}
                      className={`flex items-center gap-3 cursor-pointer py-[10px] rounded-lg mx-2 ${
                        selectedSpace === space._id ? "bg-[#CBCCE1]" : ""
                      }  ${fullSidebar ? "pl-[25px]" : "pl-[25px] pr-[25px]"}`}
                      onClick={() => {
                        dispatch(setSelectedSpaceId(space._id));
                        dispatch(setSelectedSpaceObject(space));
                        setSelectedChat(null);
                        navigate(
                          `/projects/${selectedWorkspace}/squad/${space._id}`
                        );
                      }}
                    >
                      {space.privacy === "public" ? (
                        <FolderIcon
                          style={{
                            fill: space.color,
                          }}
                          className={`w-[20px] h-[20px] pointer-events-none`}
                        />
                      ) : (
                        <PrivateFolderIcon
                          style={{
                            fill: space.color,
                          }}
                          className={`w-[20px] h-[20px] pointer-events-none`}
                        />
                      )}
                      {fullSidebar && (
                        <p className="text-[14px] text-[#000] pointer-events-none">
                          {space.name}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Task List */}
        {/* {defaultPage && fullSidebar && (
          <div className="mt-[10px] flex flex-col">
            <div
              className={`flex items-center cursor-pointer py-[10px] gap-[10px] ${
                selectedChat === userId ? "bg-[#6576FF10]" : ""
              } ${fullSidebar ? "pl-[25px]" : "pl-[25px] pr-[25px]"}`}
              onClick={() => {
                dispatch(setSelectedSpaceId(null));
                dispatch(setSelectedSpaceObject(null));
                setSelectedChat(userId);
                // navigate(`/projects/${selectedWorkspace}/chat/${userId}`);
                setShowModal(!showModal);
              }}
            >
              <img
                src={images.taskListIcon}
                className="w-[28px] h-[28px] rounded-full border object-none bg-white"
                alt=""
              />
              {fullSidebar && (
                <p className="text-[#0D1282] text-[14px]">My Task List</p>
              )}
            </div>
          </div>
        )} */}
        {/* modal */}
        {/* {showModal && <ComingSoonModal setShowModal={setShowModal} />} */}

        {/* Chats */}
        {/* {!isFirstTime || !firstTimeMember
          ? defaultPage && (
              <div className="mt-[44px]">
                {fullSidebar && (
                  <div className="flex items-center justify-between pl-[17px] pr-[24px]">
                    <div className="flex gap-2 pl-[13px]">
                      <img
                        src={ChatIcon}
                        alt="search"
                        className="cursor-pointer"
                      />
                      <h2 className="text-[#0D1282]">Chart</h2>
                    </div>
                    <div
                      className="flex items-center gap-2"
                      onClick={() => {
                        setShowAddMemberModal(!showAddMemberModal);
                      }}
                    > */}
                      {/* bug issue */}

                     {/* {
                      showPlusButton[0] && (
                        <img
                        src={BorderedPlusIcon}
                        alt=""
                        className="cursor-pointer text-[#0D1282] "
                      />
                      )
                     }
                    </div>
                  </div>
                )} */}
                {/* {!fullSidebar && (
                  <h1 className="text-[#0D1282] text-center">Chart</h1>
                )} */}


                {/* Chats List */}
                {/* <div className="mt-[10px] flex flex-col">
                  {members.map((member, idx) =>
                    member?._id !== userId ? (
                      <div
                        key={idx}
                        className={`flex items-center cursor-pointer py-[10px] gap-[10px] mx-2 rounded-lg ${
                          selectedChat?._id === member?._id
                            ? "bg-[#CBCCE1]"
                            : ""
                        } ${fullSidebar ? "pl-[25px]" : "pl-[25px] pr-[25px]"}`}
                        onClick={() => {
                         
                          dispatch(setSelectedSpaceId(null));
                          dispatch(setSelectedSpaceObject(null));
                          setSelectedChat(member);
                          navigate(
                            `/projects/${selectedWorkspace}/chat/${member?._id}`
                          );
                        }}
                      >
                        {isOnline ? (
                          <>
                            <div className="relative">
                              
                              <img
                                src={
                                  member?.avatar ? member?.avatar:
                                  avatar
                                }
                                className="w-[28px] h-[28px] rounded-full border object-cover"
                                alt=""
                              />
                            </div>
                           
                            {fullSidebar && (
                              <p className="text-[#000] flex items-center gap-1 text-[14px]">
                                {member.fullName}
                              </p>
                            )}
                          </>
                        ) : (
                          <>
                            <img
                              src={
                                member?.avatar ? member?.avatar:
                                avatar
                              }
                              className="w-[28px] h-[28px] rounded-full border object-cover"
                              alt=""
                            />
                            {fullSidebar && (
                              <p className="text-[#000] flex items-center gap-[4px] text-[14px]">
                                {member.fullName}{" "}
                                <img
                                  src={ClockIcon}
                                  alt=""
                                  className="w-[16px] h-[16px]"
                                />{" "}
                                <span className="text-[8px]">10min</span>
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            )
          : null} */}
        {/* Footer Copyright */}
        <p
          className={`text-[#0D1282] text-center ${
            fullSidebar ? "text-[12px] pl-[25px]" : "text-[22px]"
          } mt-auto mb-[16px] align-middle`}
        >
          &copy;
          {fullSidebar && (
            <span className=" pl-2 text-center">makereal.io 2023</span>
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
        <CreateSquadModal setShowCreateSquadModal={setShowCreateSquadModal} />
      )}
      {showAddMemberModal && (
        <AddMemberModal setShowAddMemberModal={setShowAddMemberModal} />
      )}
    </>
  );
};

export default SideNavbar;
