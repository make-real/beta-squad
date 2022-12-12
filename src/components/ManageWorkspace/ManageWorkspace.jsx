import React from "react";
import SearchIcon from "../../assets/search.svg";
import GridIcon from "../../assets/icon_component/Grid";
import RowVerticalIcon from "../../assets/icon_component/RowVertical";
import { useState } from "react";
import { useSelector } from "react-redux";
import EditDeleteMenu from "../DropDown/EditDeleteMenu";
import { useEffect } from "react";
import PlusIcon from "../../assets/plus.svg";
import { get_space_data, get_workspace_member } from "../../api/workSpace";
import CreateWorkspaceModal from "./Modals/CreateWorkspaceModal";
import EditWorkspaceModal from "./Modals/EditWorkspaceModal";
import DeleteWorkspaceModal from "./Modals/DeleteWorkspaceModal";

const ManageWorkspace = () => {
    const [showType, setShowType] = useState("grid");
    const allWorkspaces = useSelector((state) => state.workspace.workspaces);
    const [workspaces, setWorkspaces] = useState([]);
    const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] =
        useState(false);
    const [editWorkspaceData, setEditWorkspaceData] = useState(null);
    const [showEditWorkspaceModal, setShowEditWorkspaceModal] = useState(false);
    const [deleteWorkspaceData, setDeleteWorkspaceData] = useState(null);
    const [showDeleteWorkspaceModal, setShowDeleteWorkspaceModal] =
        useState(false);

    const setupAll = async () => {
        const temp = [];
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

    return (
        <>
            <div className="relative pt-[45px] px-[63px] pb-[60px] bg-[#F9F9FF] h-full flex flex-col">
                <h1 className="font-medium text-[15px] text-[#031124]">
                    Workspace
                </h1>
                <div className="mt-[40px] w-full h-full bg-white rounded-[16px] px-[62px] pt-[50px] pb-[20px]">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[20px] text-[#424D5B] font-semibold mr-[9px]">
                            Workspace
                        </h2>
                        <div className="flex items-center">
                            <div className="flex items-center gap-[12px]">
                                <img
                                    src={SearchIcon}
                                    alt="search"
                                    className=""
                                />
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
                                    <GridIcon
                                        isSelected={showType === "grid"}
                                    />
                                </div>
                                <div
                                    className="cursor-pointer"
                                    onClick={() => setShowType("stack")}
                                >
                                    <RowVerticalIcon
                                        isSelected={showType === "stack"}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-[40px] flex gap-[30px] flex-wrap">
                        {workspaces.map((workspace, i) => {
                            return (
                                <div
                                    key={i}
                                    className="relative w-[215px] min-h-[156px] bg-[#67BFFF10] rounded-[16px] pb-[20px]"
                                >
                                    <div className="absolute h-[6px] w-[37%] bg-[#67BFFF] rounded-bl-[4px] rounded-br-[4px] left-[31px] top-0"></div>
                                    <EditDeleteMenu
                                        data={workspace}
                                        editFunc={prepareEditWorkspace}
                                        deleteFunc={prepareDeleteWorkspace}
                                        className="absolute right-[10px] top-[10px]"
                                    />

                                    <div className="mt-[30px] px-[20px]">
                                        <div className="flex items-center gap-[10px]">
                                            {workspace?.logo ? (
                                                <img
                                                    src="https://images.vexels.com/media/users/3/224136/isolated/preview/3254497f70189b201e55780274dc1035-abstract-person-blue-logo.png"
                                                    alt=""
                                                    className="w-[40px] h-[40px] rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-[40px] h-[40px] shrink-0 rounded-full flex items-center justify-center bg-[#2C3782]">
                                                    <p className="text-white font-medium">
                                                        {workspace.name
                                                            ?.slice(0, 1)
                                                            ?.toUpperCase()}
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
                                            {workspace.teamMembers?.length}{" "}
                                            Squad members
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                        <div
                            onClick={() => setShowCreateWorkspaceModal(true)}
                            className="relative w-[215px] h-[156px] bg-[#ECECEC40] rounded-[16px] flex items-center justify-center cursor-pointer"
                        >
                            <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-white shadow-sm">
                                <img src={PlusIcon} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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

export default ManageWorkspace;
