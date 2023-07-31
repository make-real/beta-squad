import React from "react";
import SearchIcon from "../../assets/search.svg";
import GridIcon from "../../assets/icon_component/Grid";
import RowVerticalIcon from "../../assets/icon_component/RowVertical";
import { useState } from "react";
import Projects from "./Projects/Projects";
import WorkspaceMembers from "./WorkspaceMembers/WorkspaceMembers";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { boxHexColorCodes } from "../../constant/data";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { spaceCreation } from "../../hooks/useFetch";
import { addNewSpace } from "../../store/slice/space";

import { add_workspace_member } from "../../api/workSpace";
import CrossIcon from "../../assets/cross.svg";
import InboxIcon from "../../assets/inbox.svg";
import { validateEmail } from "../../util/helpers";
import { useLocation } from "react-router-dom";

const WorkspaceScreen = ({ currentWorkspace }) => {
  const [selectedTab, setSelectedTab] = useState("projects");
  const [showType, setShowType] = useState("grid");
  const members = useSelector((state) => state.workspace.workspaceMembers);
  const { selectedSpace, allSpaces } = useSelector((state) => state.space);
  const { workspaces, selectedWorkspace } = useSelector(
    (state) => state.workspace
  );
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const location = useLocation();

  const Tabs = {
    projects: <Projects showType={showType} />,
    squad_members: <WorkspaceMembers showType={showType} />,
  };

  useEffect(() => {
    let tab = location.hash.slice(1);
    if (tab) {
      setSelectedTab(tab);
    }
  }, [location]);

  // const location = useLocation();

  // console.log(location.state);

  const isFirstTime =
    JSON.parse(localStorage.getItem("stepFinished")) === true
      ? false
      : (workspaces?.length === 1 && allSpaces?.length === 0) ||
        (allSpaces[0]?.name === "Onboarding" &&
          [...members.filter((m) => m._id !== userInfo._id)].length === 0);

  const showCreateSquadScreen =
    JSON.parse(localStorage.getItem("stepFinished")) === true
      ? false
      : allSpaces?.length === 0 ||
        (allSpaces[0]?.name === "Onboarding" && allSpaces.length === 1);
  const showAddMemberScreen =
    JSON.parse(localStorage.getItem("stepFinished")) === true
      ? false
      : [...members.filter((m) => m._id !== userInfo._id)].length === 0;

  return (
    <>
      {isFirstTime || showCreateSquadScreen || showAddMemberScreen ? (
        <FirstTimeScreen
          allSpaces={allSpaces}
          members={members}
          userInfo={userInfo}
        />
      ) : (
        <div className="relative bg-[#FFF] h-full flex flex-col no-scrollbar">
          <div className="w-full h-full flex flex-col bg-white rounded-[16px] px-[40px] pt-[30px] pb-[20px] overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {currentWorkspace?.logo ? (
                  <div className="mr-[12px] w-[32px] h-[32px] ">
                    <img
                      src={currentWorkspace.logo}
                      alt=""
                      className="w-[30px] h-[30px] border border-[#6576FF] rounded-full mr-[12px]"
                    />
                  </div>
                ) : (
                  <div className="mr-[12px] w-10 h-10 bg-[#2C3782] flex items-center justify-center cursor-pointer rounded-[5px] shadow-xl hover:bg-[#4D6378] text-gray-100 font-bold border">
                    {currentWorkspace?.name.charAt(0)}
                  </div>
                )}
                <h2 className="text-[20px] text-[#424D5B] font-semibold mr-[9px]">
                  {currentWorkspace?.name}
                </h2>
                <div className="w-[9px] h-[9px] bg-[#FF3659] rounded-full"></div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center gap-[12px]">
                  <img src={SearchIcon} alt="search" className="" />
                  <input
                    type="text"
                    placeholder="Search here"
                    className=" placeholder:text-[#99A6B9] border-none outline-none"
                  />
                </div>
                <div className="flex items-center gap-[22px]">
                  <div
                    className="cursor-pointer"
                    onClick={() => setShowType("grid")}
                  >
                    <GridIcon isSelected={showType === "grid"} />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => setShowType("stack")}
                  >
                    <RowVerticalIcon isSelected={showType === "stack"} />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-[30px] h-full flex flex-col overflow-hidden">
              <div className="flex items-center gap-[50px]">
                <a
                  href={`#projects`}
                  onClick={() => setSelectedTab("projects")}
                  className={`${
                    selectedTab === "projects"
                      ? "border-b-2 border-b-[#6576FF] text-[#031124]"
                      : "text-[#818892]"
                  } text-[19px] font-medium  pb-[10px] cursor-pointer`}
                >
                  Projects
                </a>
                <a
                  href={`#squad_members`}
                  onClick={() => setSelectedTab("squad_members")}
                  className={`${
                    selectedTab === "squad_members"
                      ? "border-b-2 border-b-[#6576FF] text-[#031124]"
                      : "text-[#818892]"
                  } text-[19px] font-medium  pb-[10px] cursor-pointer`}
                >
                  Squad Members
                </a>
              </div>
              <div className="w-full h-[1px] bg-[#ECECEC]"></div>
              {Tabs[selectedTab]}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkspaceScreen;

const FirstTimeScreen = ({ allSpaces, members, userInfo }) => {
  const showCreateSquadScreen =
    allSpaces?.length === 0 ||
    (allSpaces[0]?.name === "Onboarding" && allSpaces.length === 1);
  const showAddMemberScreen =
    [...members.filter((m) => m?._id !== userInfo._id)].length === 0;

  return showCreateSquadScreen ? (
    <CreateSquadModal />
  ) : (
    showAddMemberScreen && <AddMemberModal />
  );
};

const CreateSquadModal = () => {
  const currentWorkspace = useSelector(
    (state) => state.workspace.currentWorkspace
  );
  const [selectedColor, setSelectedColor] = useState("#C654FC");
  const [createNewSpace, setCreateNewSpace] = useState({
    workspaceId: currentWorkspace?._id,
    name: "",
    color: "",
    privacy: "",
    description: "",
  });
  const dispatch = useDispatch();

  const handleSpaceCreation = async (e) => {
    e.preventDefault();

    try {
      const { data } = await spaceCreation(createNewSpace);

      // display a notification for user
      toast.success(`${data?.space?.name} - space created successfully`, {
        autoClose: 3000,
      });

      // add this space into user allSpace [array]... & send back to parent component...
      dispatch(addNewSpace(data?.space));
    } catch (error) {
      // error for developer for deBugging...
      console.log(error.response.data);

      // error for user at notification...
      toast.error(error?.response?.data?.issue?.name, {
        autoClose: 3000,
      });
    }

    // reset all input fields...
    setCreateNewSpace({ name: "", color: "", privacy: "", description: "" });
  };

  const handleChange = (e, privacy) => {
    if (privacy) {
      setCreateNewSpace((prev) => ({
        ...prev,
        privacy: privacy,
      }));
      return;
    }
    setCreateNewSpace((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setCreateNewSpace((prev) => ({ ...prev, color: selectedColor }));
  }, [selectedColor]);

  return (
    <div className="flex items-center justify-center h-full bg-[#FFF]">
      <div className="h-full relative w-[614px] max-h-[762px] bg-white rounded-[16px] px-[60px] py-[40px] overflow-y-scroll no-scrollbar">
        <h1 className="text-[#031124] text-[30px] font-bold">
          Let's Create a Squad
        </h1>
        <p className="mt-[9px] text-[#818892] text-[14px] mr-[80px]">
          You have successfully created your workspace. Let’s create squad now.
        </p>
        <form onSubmit={handleSpaceCreation} className="mt-[40px]">
          <p className="text-[#818892] text-[14px] font-semibold">Squad Name</p>
          <input
            type="text"
            className="mt-[13px] bg-[#ECECEC60] w-full py-[14px] px-[16px] outline-none border-none placeholder:text-[#818892]"
            placeholder="eg. Development"
            value={createNewSpace.name}
            onChange={handleChange}
            name="name"
          />
          <p className="text-[#818892] text-[14px] font-semibold mt-[20px]">
            Add Purpose{" "}
            <span className="inline-block ml-[12px] font-light">
              (Optional)
            </span>
          </p>
          <input
            type="text"
            className="mt-[13px] bg-[#ECECEC60] w-full py-[14px] px-[16px] outline-none border-none placeholder:text-[#818892]"
            placeholder="eg. This squad is responsible for ..."
            value={createNewSpace.purpose}
            onChange={handleChange}
            name="description"
          />
          <p className="text-[#818892] text-[14px] font-semibold mt-[20px]">
            Squad color
          </p>
          <div className="flex items-center gap-[16px] mt-[10px]">
            {boxHexColorCodes.map((color) => {
              return (
                <div
                  onClick={() => {
                    setSelectedColor(color);
                  }}
                  style={{ backgroundColor: color }}
                  className={`relative rounded-[4px] cursor-pointer ${
                    selectedColor === color
                      ? `w-[22px] h-[22px] border-[2px] border-white`
                      : "w-[16px] h-[16px]"
                  }`}
                >
                  {selectedColor === color && (
                    <div
                      style={{
                        borderColor: selectedColor,
                      }}
                      className={`rounded_border`}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-[#818892] text-[14px] font-semibold mt-[35px]">
            Squad Privacy
          </p>
          <div className="mt-[15px]">
            <div className="flex items-center gap-[6px]">
              <input
                type="radio"
                name="privacy"
                id="squad_privacy_public"
                className="accent-[#6576FF]"
                onChange={() => handleChange(null, "public")}
              />
              <label
                htmlFor="squad_privacy_public"
                className="text-[14px] font-semibold text-[#424D5B]"
              >
                Public to Squad
              </label>
            </div>
            <p className="text-[#818892] text-[14px] ml-[20px] mt-[8px]">
              Squad is visible to members of your Squad. Only people added to
              the squad can edit it.
            </p>
          </div>
          <div className="mt-[15px]">
            <div className="flex items-center gap-[6px]">
              <input
                type="radio"
                name="privacy"
                id="squad_privacy_private"
                className="accent-[#6576FF]"
                onChange={() => handleChange(null, "private")}
              />
              <label
                htmlFor="squad_privacy_private"
                className="text-[14px] font-semibold text-[#424D5B]"
              >
                Private
              </label>
            </div>
            <p className="text-[#818892] text-[14px] ml-[20px] mt-[8px]">
              Squad is private. Only people added to the sapce can view it and
              edit it.
            </p>
          </div>
          <div className="flex items-center mt-[40px] gap-[30px]">
            <button className="bg-[#FFE7EB] flex-1 py-[20px] rounded-[8px] flex items-center justify-center cursor-pointer">
              <p className=" text-[14px] font-semibold text-[#FF3659]">
                Cancel
              </p>
            </button>
            <button
              type="submit"
              className="bg-[#6576FF] flex-1 py-[20px] rounded-[8px] flex items-center justify-center cursor-pointer"
            >
              <p className=" text-[14px] font-semibold text-white">Create</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AddMemberModal = () => {
  const currentWorkspace = useSelector(
    (state) => state.workspace.currentWorkspace
  );
  const [memberData, setMemberData] = useState({
    email: "",
    role: "",
  });

  const addMember = async (e) => {
    e.preventDefault();

    if (!validateEmail(memberData.email)) return;

    try {
      const { data } = await add_workspace_member(
        currentWorkspace._id,
        memberData.email
      );

      // display a notification for user
      toast.success(`Member added`, {
        autoClose: 3000,
      });
      window.location.reload();
      localStorage.setItem("stepFinished", true);
    } catch (error) {
      // error for developer for deBugging...
      // console.log(error.response.data);
      console.log(error);

      // error for user at notification...
      toast.error(error?.message, {
        autoClose: 3000,
      });
    }

    // reset all input fields...
    setMemberData({ name: "", color: "", privacy: "" });
  };

  const handleChange = (e) => {
    setMemberData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex items-center justify-center h-full bg-[#FFF]">
      <div className="relative w-[614px] h-auto overflow-y-scroll no-scrollbar bg-white rounded-[16px] px-[60px] py-[40px]">
        <div
          onClick={() => {
            window.location.reload();
            localStorage.setItem("stepFinished", true);
          }}
          className="w-max absolute top-[30px] right-[30px] cursor-pointer"
        >
          <img src={CrossIcon} alt="" />
        </div>
        <h1 className="text-[#031124] text-[30px] font-bold">Add Member</h1>
        <p className="mt-[9px] text-[#818892] text-[14px]">
          Enter email to add member to{" "}
          <span className="text-[#6576FF]">{currentWorkspace?.name}</span>
        </p>
        <form onSubmit={addMember} className="mt-[28px]">
          <p className="text-[14px] font-semibold text-[#424D5B]">Email</p>
          <div className="mt-[13px] w-full bg-[#ECECEC60] rounded-[8px] py-[16px] px-[20px] flex items-center gap-[10px]">
            <img src={InboxIcon} alt="" />
            <input
              className="w-full placeholder:text-[#818892] text-[14px] border-none outline-none bg-transparent"
              type="email"
              placeholder="Enter email address"
              onChange={handleChange}
              value={memberData.email}
              name="email"
            />
          </div>
          {/* <p className="text-[14px] font-semibold text-[#424D5B] mt-[20px]">
                        Member Type
                    </p>
                    <div className="mt-[13px] w-full bg-[#ECECEC60] rounded-[8px] py-[16px] px-[20px] flex items-center gap-[10px]">
                        <img src={TaguserIcon} alt="" />
                        <select
                            id=""
                            className="w-full bg-transparent text-[#818892] text-[14px] border-none outline-none"
                            onChange={handleChange}
                            name="role"
                        >
                            <option selected value="">
                                Select member type
                            </option>
                            {Object.values(WORKSPACE_ROLE).map((role) => (
                                <option
                                    selected={memberData.role === role}
                                    value={role}
                                >
                                    {role}
                                </option>
                            ))}
                        </select>
                    </div> */}
          <button className="mt-[40px] w-full py-[17px] rounded-[8px] bg-[#6576FF] text-white">
            Send Invitation
          </button>
        </form>
      </div>
    </div>
  );
};
