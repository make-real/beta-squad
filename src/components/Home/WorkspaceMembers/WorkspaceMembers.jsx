import React from "react";
import PlusIcon from "../../../assets/plus.svg";
import EditDeleteMenu from "../../DropDown/EditDeleteMenu";
import AddMemberModal from "./Modals/AddMemberModal";
import { useState } from "react";
import UpdateMemberModal from "./Modals/UpdateMemberModal";
import RemoveMemberModal from "./Modals/RemoveMemberModal";
import MemberRemovedModal from "./Modals/MemberRemovedModal";
import { useSelector } from "react-redux";
import { getAvatarUrl } from "../../../util/getAvatarUrl";
import { useUserInfoContext } from "../../../context/UserInfoContext";
import BriefCaseIcon from "../../../../src/assets/briefcase.svg";
import avatar from "../../../assets/profile_circle.svg";

const SquadMembers = ({
  showType,
  showAddMemberModal,
  setShowAddMemberModal,
  userRole,
}) => {
  const selectedSpace = useSelector((state) => state.space.selectedSpace);
  const selectedWorkspace = useSelector(
    (state) => state.workspace.selectedWorkspace
  );
  const { loginUserInfo } = useUserInfoContext();
  const members = useSelector((state) => state.workspace.workspaceMembers);
  const showupdate = members.filter(
    (member) => member._id === loginUserInfo._id
  );
  const showUpdateDeleteButton = showupdate.map(
    (member) => member.role === "owner" || "admin"
  );

  const [showUpdateMemberModal, setShowUpdateMemberModal] = useState(false);
  const [updateMemberData, setUpdateMemberData] = useState(null);
  const [showRemoveMemberModal, setShowRemoveMemberModal] = useState(false);
  const [removeMemberData, setRemoveMemberData] = useState(null);
  const [showRemovedModal, setShowRemovedModal] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

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

  // Isuues Here

  return (
    <>
      {showType === "grid" ? (
        <div className="mt-[10px] flex gap-[30px] flex-wrap  h-full">
          {/* <div
                        onClick={() => setShowAddMemberModal(true)}
                        className="w-[297px] h-[90px] rounded-[16px] bg-[#ECECEC80] flex items-center justify-center gap-[16px] cursor-pointer"
                    >
                        <div className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center">
                            <img src={PlusIcon} alt="" />
                        </div>
                    </div> */}
          {members.map((member) => {
            return (
              <div
                key={member._id}
                className="relative w-[297px] h-[110px] rounded-[16px] bg-[#6576FF10] cursor-pointer px-[13px] pt-[20px]"
              >
                { (userRole?.role === "owner" || userRole?.role === "admin" )  && (
                    <>
                      {showUpdateDeleteButton[0] && (
                        <EditDeleteMenu
                          deleteFunc={prepareDeleteMember}
                          data={member}
                          editFunc={prepareUpdateMember}
                          className="absolute top-[10px] right-[10px]"
                        />
                      )}
                    </>
                  )}

                <div className="">
                  <div>
                    {member?.role === "owner" ? (
                      <div className="-my-2 w-[50px] text-xs bg-green-400 rounded-full ml-16 mb-2">
                        <p className="text-black text-center">
                          {member?.role.charAt(0).toUpperCase() +
                            member?.role.slice(1)}
                        </p>
                      </div>
                    ) : member?.role === "admin" ? (
                      <div className="-my-2 w-[50px] text-xs bg-amber-400 rounded-full ml-16 mb-2">
                        <p className="text-white text-center">
                          {member?.role.charAt(0).toUpperCase() +
                            member?.role.slice(1)}
                        </p>
                      </div>
                    ) : member?.role === "user" ? (
                      <div className="-my-2 w-[50px] text-xs bg-purple-700 rounded-full ml-16 mb-2">
                        <p className="text-white text-center">
                          {member?.role.charAt(0).toUpperCase() +
                            member?.role.slice(1)}
                        </p>
                      </div>
                    ) : (
                      <div className="-my-2 w-[50px] text-xs bg-red-700 rounded-full ml-16 mb-2">
                        <p className="text-white  text-center">
                          {member?.role.charAt(0).toUpperCase() +
                            member?.role.slice(1)}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-[10px]">
                    <img
                      src={member?.avatar ? member?.avatar : avatar}
                      alt=""
                      className="w-[50px] h-[50px] object-cover rounded-full"
                    />
                    <div>
                      <h2 className="text-[#424D5B] font-semibold">
                        {member?.fullName}
                      </h2>
                      <p className="text-[#818892] text-[13px] w-[120px]">
                        {member?.email}
                      </p>
                      {member.designation && (
                        <p className="text-[#818892]  items-center flex gap-2 text-[13px]">
                          <img src={BriefCaseIcon} alt="" />{" "}
                          {member?.designation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {/* <p className="text-[#818892] mt-[10px]">
                                    {member.email}
                                </p> */}
              </div>
            );
          })}
        </div>
      ) : (
        showType === "stack" && (
          <div className="h-full overflow-y-scroll no-scrollbar mt-[30px] max-h-[650px]">
            <div className="flex flex-col items-center gap-[10px]">
              <div
                onClick={() => setShowAddMemberModal(true)}
                className="w-full h-[10px] rounded-[16px] bg-[#ECECEC80] flex items-center justify-center gap-[16px] cursor-pointer"
              >
                <div className="w-[36px] h-[36px] rounded-full bg-white flex items-center justify-center">
                  <img src={PlusIcon} alt="" />
                </div>
              </div>

              {members.map((member) => {
                const user = members.find((m) => m?._id === userInfo?._id);
                return (
                  <div className="relative w-full h-[90px] rounded-[16px] bg-[#6576FF10] cursor-pointer flex items-center gap-[13px] justify-between border px-[13px]">
                    <div className="flex items-center gap-[10px]">
                      <img
                        src={member?.avatar ? member?.avatar : avatar}
                        alt=""
                        className="w-[50px] h-[50px] object-cover rounded-full"
                      />
                      <h2 className="text-[#424D5B] font-semibold">
                        {member?.fullName}
                      </h2>
                    </div>
                    <div className="flex items-center gap-[16px]">
                      <p className="text-[#818892]">
                        {member?.role.charAt(0).toUpperCase() +
                          member?.role.slice(1)}
                      </p>
                      {/* <img src={ArrowDown} alt="" /> */}
                    </div>
                    <p className="text-[#818892]">{member?.email}</p>
                    {user?.role === "owner" ||
                    user?.role === "manager" ||
                    user?.role === "admin"
                      ? userInfo?._id !== member?._id && (
                          <EditDeleteMenu
                            deleteFunc={prepareDeleteMember}
                            data={member}
                            editFunc={prepareUpdateMember}
                            className="absolute top-[10px] right-[10px]"
                          />
                        )
                      : null}
                  </div>
                );
              })}
            </div>
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
