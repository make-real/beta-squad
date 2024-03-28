import React from "react";
import BorderedPlusIcon from "../../../assets/add.svg";
import { useState } from "react";
import { get_space_members, remove_space_members } from "../../../api/space";
import { useEffect } from "react";
import AddMembers from "./Modals/AddMembers";
import { toast } from "react-toastify";
import avatar from "../../../assets/profile_circle.svg";

const SquadMembers = ({ setMember,showType, selectedSpace }) => {
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [members, setMembers] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const fetchSquadMembers = async () => {
    try {
      const { data } = await get_space_members(selectedSpace?._id);
      setMembers(data?.members);
    } catch (err) {
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
    }
  };

  const addMembers = (smembers) => {
    setMembers((prev) => [...prev, ...smembers]);
    setMember((prev) => [...prev, ...smembers]);

  };

  useEffect(() => {
    if (selectedSpace) {
      fetchSquadMembers();
    }
  }, [selectedSpace]);

  const userRole = members?.find((m) => m._id === userInfo._id);


  return (
    <>
      <div className="overflow-y-scroll  h-[90%] no-scrollbar custom-shadow bg-[#ECECEC80] py-10 px-2 rounded-2xl">
        <div className="flex  flex-col items-center gap-[10px]">
          {members.map((member) => {
            return (
              <div
                key={member._id}
                className="relative w-full h-[75px] rounded-[16px]  bg-[#FFF] cursor-pointer flex items-center gap-[13px] justify-between border px-[13px]"
              >
                {
                 ( userRole?.role === "admin" ||
                  userRole?.role === "manager"  )&&<>
                   {
                 ( userInfo?._id !== member?._id  ) &&  (
                    <div
                      onClick={() =>
                        removeMember(member)
                      }
                      className="absolute top-[10px] right-[10px] w-[16px] h-[16px] rounded-full bg-[#FF365940] flex items-center justify-center cursor-pointer mt-5"
                    >
                      <div className="bg-[#FF3659] w-[7px] h-[1.25px]"></div>
                    </div>
                  )
                }
                  </>
                }
               
                <div className="flex items-center gap-[10px]">
                  <img
                    src={member?.avatar ? member?.avatar : avatar}
                    alt=""
                    className="w-[50px] h-[50px] object-cover rounded-full"
                  />
                  <div className="flex flex-col ">
                    <h2 className="text-[#424D5B] font-semibold">
                      {member?.fullName}
                    </h2>
                    <p className="text-[#818892] text-[14px]">
                      {member?.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-[16px]">
                </div>
              </div>
            );
          })}
          <div
            onClick={() => setShowAddMemberModal(true)}
            className="w-full h-[75px]  rounded-[16px] flex items-center justify-center gap-[16px] cursor-pointer"
          >
            <div className="w-[36px]  h-[36px] rounded-full  flex items-center justify-center">
              <img src={BorderedPlusIcon} alt="" />
            </div>
            <h1 className="text-[#818892] ">Add Teams</h1>
          </div>
        </div>
      </div>

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
