import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { get_workspace_member } from "../../../../api/workSpace";
import CrossIcon from "../../../../assets/cross.svg";
import GroupProfile from "../../../../assets/group_profile.svg";
import Reload from "../../../../assets/reload.svg";
import SearchIcon from "../../../../assets/icon_component/Search";
import { add_space_members, get_space_members } from "../../../../api/space";
import { toast } from "react-toastify";

const AddMembers = ({ setShowAddMemberModal, selectedSpace, addMembers }) => {
    const currentWorkspace = useSelector(
        (state) => state.workspace.currentWorkspace
    );
    const [workspaceMembers, setWorkspaceMembers] = useState([]);
    const [alreadyAddedMembers, setAlreadyAddedMembers] = useState([]);
    const [members, setMembers] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);

    const fetchWorkspaceMembers = async () => {
        try {
            const { data } = await get_workspace_member(currentWorkspace._id);
            setWorkspaceMembers(data?.teamMembers);
        } catch (err) {
            console.log("Error occured ==> ", err);
        }
    };

    const fetchSquadMembers = async () => {
        try {
            const { data } = await get_space_members(selectedSpace._id);
            setAlreadyAddedMembers(data?.members);
        } catch (err) {
            console.log("Error occured ==> ", err);
        }
    };

    const filterMembers = () => {
        let tmpMembers = [];
        workspaceMembers.forEach((m) => {
            if (!alreadyAddedMembers.some((am) => am._id === m._id)) {
                tmpMembers.push(m);
            }
        });
        setMembers(tmpMembers);
    };

    useEffect(() => {
        fetchSquadMembers();
        fetchWorkspaceMembers();
    }, []);

    useEffect(() => {
        if (members && alreadyAddedMembers) {
            filterMembers();
        }
    }, [workspaceMembers, alreadyAddedMembers]);

    const handleSelectedMember = (e, member) => {
        let membersToAdd = [];
        if (e.target.checked) {
            membersToAdd = [...selectedMembers, member];
        } else {
            membersToAdd = selectedMembers.filter((m) => m._id !== member._id);
        }
        setSelectedMembers(membersToAdd);
    };

    const handleAddMember = async () => {
        try {
            selectedMembers.forEach(async (member) => {
                await add_space_members(selectedSpace._id, member._id);
            });
            toast.success(
                `Members added to ${selectedSpace.name} successfully.`,
                {
                    autoClose: 3000,
                }
            );
            addMembers(selectedMembers);
        } catch (err) {
            console.log(err);
        }
        setShowAddMemberModal(false);
    };

    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center bg-[#03112440] py-[20px] z-[999]">
            <div className="h-full relative w-[614px] max-h-[725px] bg-white rounded-[16px] px-[60px] py-[40px] overflow-y-scroll no-scrollbar flex flex-col">
                <div
                    onClick={() => setShowAddMemberModal(false)}
                    className="w-max absolute top-[30px] right-[30px] cursor-pointer"
                >
                    <img src={CrossIcon} alt="" />
                </div>
                <h1 className="text-[#031124] text-[30px] font-bold">
                    Add Member
                </h1>
                <p className="mt-[9px] text-[#818892] text-[14px]">
                    Add member to heart {selectedSpace.name}.
                </p>
                <div className="flex items-center mt-[30px] bg-[#ECECEC] rounded-[10px] px-[20px] py-[13px] gap-[14px]">
                    <SearchIcon />
                    <input
                        type="text"
                        className="bg-transparent border-none outline-none placeholder:text-[#99A6B9] text-[14px]"
                        placeholder="Search"
                    />
                </div>
                <div className="flex items-center justify-between mt-[23px]">
                    <div className="flex items-center gap-[13px]">
                        <img src={GroupProfile} alt="" />
                        <p className="text-[#6576FF] font-semibold">
                            Add New Member
                        </p>
                    </div>
                    <img
                        onClick={fetchWorkspaceMembers}
                        src={Reload}
                        alt=""
                        className="cursor-pointer"
                    />
                </div>
                <div className="flex flex-col h-full my-[23px] overflow-y-scroll no-scrollbar gap-[20px] min-h-[150px]">
                    {members?.map((member) => (
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                className="w-[15px] h-[15px]"
                                onChange={(e) => {
                                    handleSelectedMember(e, member);
                                }}
                            />
                            <img
                                src={member?.avatar}
                                alt=""
                                className="w-[34px] h-[34px] rounded-full object-cover ml-[13px]"
                            />
                            <p className="text-[15px] font-semibold text-[#031124] ml-[10px]">
                                {member.fullName}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-[29px]">
                    <button
                        onClick={() => setShowAddMemberModal(false)}
                        className="bg-[#FFE7EB] text-[14px] text-[#FF3659] font-semibold py-[17px] rounded-[8px] w-full"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAddMember}
                        className="bg-[#6576FF] text-[14px] text-white font-semibold py-[17px] rounded-[8px] w-full"
                    >
                        Add ({selectedMembers.length})
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddMembers;
