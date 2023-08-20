import React from "react";
import PlusIcon from "../../../assets/plus.svg";
import ArrowDown from "../../../assets/arrowdown.svg";
import EditDeleteMenu from "../../DropDown/EditDeleteMenu";
import { useState } from "react";
import { get_space_members, remove_space_members } from "../../../api/space";
import { useEffect } from "react";
import AddMembers from "./Modals/AddMembers";
import { toast } from "react-toastify";

const SquadMembers = ({ showType, selectedSpace }) => {
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [members, setMembers] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const fetchSquadMembers = async () => {
    try {
      const { data } = await get_space_members(selectedSpace?._id);
      console.log(data);
      setMembers(data?.members);
    } catch (err) {
      // toast.error(err?.message, {
      //     autoClose: 3000,
      // })
      console.log("Error occured ==> ", err);
    }
  };

  const removeMember = async (member) => {
    try {
      await remove_space_members(selectedSpace._id, member._id);
      toast.success("Member removed", { autoClose: 3000 });
      fetchSquadMembers();
    } catch (err) {
      toast.error(err?.message, { autoClose: 3000 });
      console.log(err);
    }
  };

  const addMembers = (smembers) => {
    setMembers((prev) => [...prev, ...smembers]);
  };

  useEffect(() => {
    if (selectedSpace) {
      fetchSquadMembers();
    }
  }, [selectedSpace]);

  return (
    <>
      {/* {showType === 'grid' ? (
                <div className="flex gap-[30px] flex-wrap overflow-y-scroll no-scrollbar h-full">
                    <div
                        onClick={() => setShowAddMemberModal(true)}
                        className="w-[297px] h-[162px] rounded-[16px] bg-[#ECECEC80] flex items-center justify-center gap-[16px] cursor-pointer"
                    >
                        <div className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center">
                            <img src={PlusIcon} alt="" />
                        </div>
                    </div>
                    {members.map((member) => {
                        const user = members.find(
                            (m) => m?._id === userInfo?._id
                        )
                        return (
                            <div className="relative w-[297px] h-[162px] rounded-[16px] bg-[#6576FF10] px-[13px] pt-[20px]">
                                {user?.role === 'owner' ||
                                user?.role === 'manager' ||
                                user?.role === 'admin'
                                    ? userInfo?._id !== member?._id && (
                                          <div
                                              onClick={() =>
                                                  removeMember(member)
                                              }
                                              className="absolute top-[10px] right-[10px] w-[16px] h-[16px] rounded-full bg-[#FF365940] flex items-center justify-center cursor-pointer"
                                          >
                                              <div className="bg-[#FF3659] w-[7px] h-[1.25px]"></div>
                                          </div>
                                      )
                                    : null}
                                <div className="flex gap-[10px]">
                                    <img
                                        src={member?.avatar}
                                        alt=""
                                        className="w-[50px] h-[50px] object-cover rounded-full"
                                    />
                                    <div>
                                        <h2 className="text-[#424D5B] font-semibold">
                                            {member?.fullName}
                                        </h2>
                                        <p className="text-[#818892]">
                                            {member?.username}
                                        </p>
                                    </div>
                                </div>
                                {member?.designation && (
                                    <div className="flex items-center gap-[16px] mt-[13px]">
                                        <p className="text-[#818892]">
                                            {member?.designation}
                                        </p>
                                        <img src={ArrowDown} alt="" />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            ) : (
                showType === 'stack' && ( */}
      <div className="overflow-y-scroll no-scrollbar  bg-[#ECECEC80] py-10 px-2 rounded-2xl">
        <div className="flex flex-col items-center gap-[10px]">
          {members.map((member) => {
            const user = members.find((m) => m?._id === userInfo?._id);
            return (
              <div className="relative w-full h-[75px] rounded-[16px] bg-[#FFF] cursor-pointer flex items-center gap-[13px] justify-between border px-[13px]">
                {user?.role === "owner" ||
                user?.role === "manager" ||
                user?.role === "admin"
                  ? userInfo?._id !== member?._id && (
                      //   <div
                      //     onClick={() => removeMember(member)}
                      //     className="absolute top-[10px] right-[10px] w-[16px] h-[16px] rounded-full bg-[#FF365940] flex items-center justify-center cursor-pointer"
                      //   >
                      //     <div className="bg-[#FF3659] w-[7px] h-[1.25px]"></div>
                      //   </div>
                      <div className="absolute right-[10px] w-[16px] h-[16px] rounded-full flex items-center justify-center cursor-pointer">
                        <EditDeleteMenu
                          deleteFunc={() => removeMember(member)}
                          //editFunc={prepareEditProject}
                          data={selectedSpace}
                        />
                      </div>
                    )
                  : null}
                <div className="flex items-center gap-[10px]">
                  <img
                    src={member?.avatar}
                    alt=""
                    className="w-[50px] h-[50px] object-cover rounded-full"
                  />
                  <h2 className="text-[#424D5B] font-semibold">
                    {member?.fullName}
                  </h2>
                </div>
                <div className="flex items-center gap-[16px]">
                  <p className="text-[#818892]">{member?.designation}</p>
                  {/* <img src={ArrowDown} alt="" /> */}
                </div>
                <p className="text-[#818892]">{member?.email}</p>
              </div>
            );
          })}
          <div
            onClick={() => setShowAddMemberModal(true)}
            className="w-full h-[75px] rounded-[16px] flex items-center justify-center gap-[16px] cursor-pointer"
          >
            <div className="w-[36px] h-[36px] rounded-full bg-white flex items-center justify-center">
              <img src={PlusIcon} alt="" />
            </div>
            <h1 className="text-[#818892]">Add Teams</h1>
          </div>
        </div>
      </div>
      {/* )
            )} */}

      {showAddMemberModal && (
        <AddMembers
          addMembers={addMembers}
          selectedSpace={selectedSpace}
          setShowAddMemberModal={setShowAddMemberModal}
        />
      )}
    </>
  );
};

export default SquadMembers;
