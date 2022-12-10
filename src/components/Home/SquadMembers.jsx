import React from "react";
import PlusIcon from "../../assets/plus.svg";
import ArrowDown from "../../assets/arrowdown.svg";
import EditDeleteMenu from "../DropDown/EditDeleteMenu";
import AddMemberModal from "../Modals/AddMemberModal";
import { useState } from "react";
import UpdateMemberModal from "../Modals/UpdateMemberModal";
import RemoveMemberModal from "../Modals/RemoveMemberModal";
import MemberRemovedModal from "../Modals/MemberRemovedModal";

const members = [
    {
        id: "random123",
        name: "Md Isfat Sharik",
        designation: "UI/UX designer",
        type: "user",
        email: "isfatsharikworksapace@gmail.com",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlEkYksQu3pTAX_h1orl4H8z6oihY7LhrnLxGWElZg&s",
    },
];

const SquadMembers = ({ showType }) => {
    const [showAddMemberModal, setShowAddMemberModal] = useState(false);
    const [showUpdateMemberModal, setShowUpdateMemberModal] = useState(false);
    const [updateMemberData, setUpdateMemberData] = useState(null);
    const [showRemoveMemberModal, setShowRemoveMemberModal] = useState(false);
    const [removeMemberData, setRemoveMemberData] = useState(null);
    const [showRemovedModal, setShowRemovedModal] = useState(false);

    const prepareUpdateMember = (data) => {
        setUpdateMemberData(data);
        setShowUpdateMemberModal(true);
    };

    const prepareDeleteMember = (data) => {
        setRemoveMemberData(data);
        setShowRemoveMemberModal(true);
    };

    const cancelDeleteMember = () => {
        setRemoveMemberData(null);
        setShowRemoveMemberModal(false);
    };

    const cancleUpdateMember = () => {
        setUpdateMemberData(null);
        setShowUpdateMemberModal(false);
    };

    return (
        <>
            {showType === "grid" ? (
                <div className="mt-[30px] flex items-center gap-[30px] flex-wrap">
                    <div
                        onClick={() => setShowAddMemberModal(true)}
                        className="w-[297px] h-[162px] rounded-[16px] bg-[#ECECEC80] flex items-center justify-center gap-[16px] cursor-pointer"
                    >
                        <div className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center">
                            <img src={PlusIcon} alt="" />
                        </div>
                    </div>
                    {members.map((member) => {
                        return (
                            <div className="relative w-[297px] h-[162px] rounded-[16px] bg-[#6576FF10] cursor-pointer px-[13px] pt-[20px]">
                                <EditDeleteMenu
                                    deleteFunc={prepareDeleteMember}
                                    data={member}
                                    editFunc={prepareUpdateMember}
                                    className="absolute top-[10px] right-[10px]"
                                />
                                <div className="flex items-center gap-[10px]">
                                    <img
                                        src={member.avatar}
                                        alt=""
                                        className="w-[50px] h-[50px] object-cover rounded-full"
                                    />
                                    <h2 className="text-[#424D5B] font-semibold">
                                        {member.name}
                                    </h2>
                                </div>
                                <div className="flex items-center gap-[16px] mt-[13px]">
                                    <p className="text-[#818892]">
                                        {member.designation}
                                    </p>
                                    <img src={ArrowDown} alt="" />
                                </div>
                                <p className="text-[#818892] mt-[10px]">
                                    {member.email}
                                </p>
                            </div>
                        );
                    })}
                </div>
            ) : (
                showType === "stack" && (
                    <div className="mt-[30px] flex flex-col items-center gap-[10px]">
                        <div
                            onClick={() => setShowAddMemberModal(true)}
                            className="w-full h-[51px] rounded-[16px] bg-[#ECECEC80] flex items-center justify-center gap-[16px] cursor-pointer"
                        >
                            <div className="w-[36px] h-[36px] rounded-full bg-white flex items-center justify-center">
                                <img src={PlusIcon} alt="" />
                            </div>
                        </div>
                        {members.map((member) => {
                            return (
                                <div className="relative w-full h-[90px] rounded-[16px] bg-[#6576FF10] cursor-pointer flex items-center gap-[13px] justify-between border px-[13px]">
                                    <div className="flex items-center gap-[10px]">
                                        <img
                                            src={member.avatar}
                                            alt=""
                                            className="w-[50px] h-[50px] object-cover rounded-full"
                                        />
                                        <h2 className="text-[#424D5B] font-semibold">
                                            {member.name}
                                        </h2>
                                    </div>
                                    <div className="flex items-center gap-[16px]">
                                        <p className="text-[#818892]">
                                            {member.designation}
                                        </p>
                                        <img src={ArrowDown} alt="" />
                                    </div>
                                    <p className="text-[#818892]">
                                        {member.email}
                                    </p>
                                    <EditDeleteMenu
                                        data={member}
                                        deleteFunc={prepareDeleteMember}
                                        editFunc={prepareUpdateMember}
                                        className="absolute top-[10px] right-[10px]"
                                    />
                                </div>
                            );
                        })}
                    </div>
                )
            )}

            {showAddMemberModal && (
                <AddMemberModal setShowAddMemberModal={setShowAddMemberModal} />
            )}
            {showUpdateMemberModal && (
                <UpdateMemberModal
                    data={updateMemberData}
                    setShowUpdateMemberModal={setShowUpdateMemberModal}
                    cancleUpdateMember={cancleUpdateMember}
                />
            )}

            {showRemoveMemberModal && (
                <RemoveMemberModal
                    data={removeMemberData}
                    setShowRemoveMemberModal={setShowRemoveMemberModal}
                    cancelDeletion={cancelDeleteMember}
                    setShowRemovedModal={setShowRemovedModal}
                    setRemoveMemberData={setRemoveMemberData}
                />
            )}

            {showRemovedModal && <MemberRemovedModal data={removeMemberData} />}
        </>
    );
};

export default SquadMembers;
