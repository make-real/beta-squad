import React from "react";

import { useState } from "react";
import { useSelector } from "react-redux";
import EditDeleteMenu from "../DropDown/EditDeleteMenu";
import { useEffect } from "react";
import PlusIcon from "../../assets/plus.svg";
import { get_space_data, get_workspace_member } from "../../api/workSpace";
import CreateWorkspaceModal from "./Modals/CreateWorkspaceModal";
import EditWorkspaceModal from "./Modals/EditWorkspaceModal";
import DeleteWorkspaceModal from "./Modals/DeleteWorkspaceModal";
import { useNavigate } from "react-router-dom";
import BorderedPlusIcon from "../../assets/add.svg";
import { workspaceCreation } from "../../hooks/useFetch";
import { addOneWorkspace } from "../../store/slice/workspace";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import LoadingScreen from "../Loading/LoadingScreen";

const ManageWorkspace = () => {
  const allWorkspaces = useSelector((state) => state.workspace.workspaces);
  const [workspaces, setWorkspaces] = useState([]);
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] =
    useState(false);
  const userInfo = useSelector((state) => state.userInfo.userInfo);

  const [editWorkspaceData, setEditWorkspaceData] = useState(null);
  const [showEditWorkspaceModal, setShowEditWorkspaceModal] = useState(false);
  const [deleteWorkspaceData, setDeleteWorkspaceData] = useState(null);
  const [showDeleteWorkspaceModal, setShowDeleteWorkspaceModal] =
    useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const setupAll = async () => {
    const temp = [];
    setLoading(true);
    for (let i = 0; i < allWorkspaces.length; i++) {
      const {
        data: { teamMembers },
      } = await get_workspace_member(allWorkspaces[i]._id);
      const {
        data: { spaces },
      } = await get_space_data(allWorkspaces[i]._id);
      temp.push({ ...allWorkspaces[i], teamMembers, spaces });
    }
    setWorkspaces(temp);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (allWorkspaces) {
      setupAll();
    }
  }, [allWorkspaces]);

  const prepareEditWorkspace = (data) => {
    setEditWorkspaceData(data);
    setShowEditWorkspaceModal(true);
  };

  const cancelEditWorkspace = () => {
    setEditWorkspaceData(null);
    setShowEditWorkspaceModal(false);
  };

  const prepareDeleteWorkspace = (data) => {
    setDeleteWorkspaceData(data);
    setShowDeleteWorkspaceModal(true);
  };

  const cancelDeleteWorkspace = () => {
    setDeleteWorkspaceData(null);
    setShowDeleteWorkspaceModal(false);
  };

  const hasWorkspace =
    localStorage.getItem("hasWorkspace") === "yes"
      ? true
      : localStorage.getItem("hasWorkspace") === "no"
      ? false
      : workspaces?.length > 0;
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : !hasWorkspace && allWorkspaces.length === 0 ? (
        <CreateWorkspace />
      ) : (
        <div className="relative bg-[#FFF] h-full flex flex-col">
          <div className="w-full h-full bg-white rounded-[16px] px-[40px] mb-4 pb-[20px]">
            <div className="flex gap-4 mt-6 items-center">
              <h2 className="text-[20px] text-[#424D5B] font-semibold mr-[9px]">
                Workspace
              </h2>
              <img
                onClick={() => setShowCreateWorkspaceModal(true)}
                src={BorderedPlusIcon}
                alt=""
                className="cursor-pointer text-[#0D1282] "
              />
              <div className="flex items-center">
                     
              </div>
            </div>
            <div className="mt-[30px] flex gap-[30px] flex-wrap">
              {workspaces.map((workspace, i) => {
                const isOwner = workspace.teamMembers.some(
                  (member) =>
                    member?._id === userInfo?._id && member.role === "owner"
                );
                return (
                  <div
                    key={workspace._id + "-" + i}
                    className="relative w-[215px] min-h-[156px] bg-[#67BFFF10] rounded-[16px] pb-[20px]"
                  >
                    {/* <div className="absolute h-[6px] w-[37%] bg-[#67BFFF] rounded-bl-[4px] rounded-br-[4px] left-[31px] top-0"></div> */}
                    {isOwner && (
                      <EditDeleteMenu
                        data={workspace}
                        editFunc={prepareEditWorkspace}
                        deleteFunc={prepareDeleteWorkspace}
                        className="absolute right-[10px] top-[10px] z-10"
                      />
                    )}
                    <div
                      className="absolute inset-0 w-full h-full cursor-pointer"
                      onClick={() => navigate(`/projects/${workspace._id}`)}
                    ></div>

                    <div className="mt-[30px] px-[20px]">
                      <div className="flex items-center gap-[10px]">
                        {workspace?.logo ? (
                          <img
                            src={workspace.logo}
                            alt=""
                            className="w-[40px] h-[40px] rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-[40px] h-[40px] shrink-0 rounded-full flex items-center justify-center bg-[#2C3782]">
                            <p className="text-white font-medium">
                              {workspace.name?.slice(0, 1)?.toUpperCase()}
                            </p>
                          </div>
                        )}
                        <h2 className="text-[#424D5B] text-[16px] font-semibold">
                          {workspace.name}
                        </h2>
                      </div>
                      <p className="mt-[10px] text-[#818892] text-[16px]">
                        {workspace.spaces?.length} Projects
                      </p>
                      <p className="mt-[4px] text-[#818892] text-[16px]">
                        {workspace.teamMembers?.length} Squad members
                      </p>
                    </div>
                  </div>
                );
              })}
             
            </div>
          </div>
        </div>
      )}

      {showCreateWorkspaceModal && (
        <CreateWorkspaceModal
          setShowCreateWorkspaceModal={setShowCreateWorkspaceModal}
        />
      )}
      {showEditWorkspaceModal && (
        <EditWorkspaceModal
          data={editWorkspaceData}
          cancelFunc={cancelEditWorkspace}
        />
      )}
      {showDeleteWorkspaceModal && (
        <DeleteWorkspaceModal
          data={deleteWorkspaceData}
          cancelFunc={cancelDeleteWorkspace}
        />
      )}
    </>
  );
};

const CreateWorkspace = () => {
  const [workspaceData, setWorkspaceData] = useState({});
  const [logo, setLogo] = useState({
    image: null,
    dataURL: null,
  });

  const navigate = useNavigate();

  const handleLogo = (e) => {
    const files = e.target.files;
    if (files.length <= 0) return;

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setLogo((prev) => ({
        image: files[0],
        dataURL: fileReader.result.toString(),
      }));
    };

    fileReader.readAsDataURL(files[0]);
  };

  const dispatch = useDispatch();

  const handleCreation = async (e) => {
    e.preventDefault();
    try {
      // its a POST method | object send into backend/server
      const createData = new FormData();
      createData.append("name", workspaceData.name);
      if (logo.image) createData.append("logo", logo.image);
      const { data } = await workspaceCreation(createData);

      // get all Work-Space data & send into redux store...
      // for live re-fetching/load data at SideBar for navigation...
      dispatch(addOneWorkspace(data.workspace));

      // display a success notification for user...
      toast.success(
        `${data?.workspace?.name} : work space created successfully`,
        { autoClose: 3000 }
      );
      localStorage.removeItem("stepFinished");
      localStorage.setItem("hasWorkspace", "yes");
      navigate(`/projects/${data.workspace._id}`, {
        state: { isFirstTime: true },
      });
    } catch (error) {
      // display error notification for developers...
      console.log(error.response?.data?.issue);

      // display error notification for users...
      toast.error(error.response?.data?.name, {
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-full bg-[#FFF]">
      <div className="h-full relative w-[614px] max-h-[535px] bg-white rounded-[16px] px-[40px] py-[40px] overflow-y-scroll no-scrollbar">
        <h1 className="text-[#031124] text-[30px] font-bold">
          Let's Create a Workspace
        </h1>
        <p className="mt-[9px] leading-[24px] text-[#818892] text-[14px] max-w-[90%]">
          Fill up the following fields to and press create to create n
        </p>
        <form onSubmit={handleCreation} className="mt-[33px]">
          <>
            <p className="text-[#818892] text-[14px] font-semibold">
              Upload company logo
              <span className="font-light inline-block ml-[7px]">
                (Optional)
              </span>
            </p>
            <label
              htmlFor="workspace_logo"
              className="mt-[13px] w-[60px] h-[60px] rounded-full bg-[#ECECEC] flex items-center justify-center cursor-pointer"
            >
              {logo.image ? (
                <img
                  className="w-full h-full rounded-full object-cover"
                  src={logo.dataURL}
                  alt=""
                />
              ) : (
                <img src={PlusIcon} alt="" />
              )}
            </label>
            <input
              onChange={handleLogo}
              type="file"
              id="workspace_logo"
              hidden
            />
          </>
          <p className="text-[#818892] text-[14px] font-semibold mt-[30px]">
            Work Space Name
          </p>
          <input
            type="text"
            placeholder="Enter your new workspace name"
            className="w-full py-[14px] px-[18px] text-[14px] placeholder:text-[#818892] bg-[#ECECEC60] rounded-[8px] mt-[13px] border-none outline-none"
            onChange={(e) =>
              setWorkspaceData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />

          <div className="flex items-center mt-[60px] gap-[30px]">
            <button
              disabled={!workspaceData.name}
              type="submit"
              className={`${
                workspaceData.name
                  ? "bg-[#6576FF] cursor-pointer"
                  : "bg-[#9fa5df] cursor-not-allowed"
              } flex-1 py-[20px] rounded-[8px] flex items-center justify-center `}
            >
              <p className="text-[14px] font-semibold text-white">Create</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageWorkspace;
