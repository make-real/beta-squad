import React from "react";
import CrossIcon from "../../../../assets/cross.svg";
import TaguserIcon from "../../../../assets/tag_user.svg";
import ProfileCircle from "../../../../assets/profile_circle.svg";
import BriefCaseIcon from "../../../../assets/briefcase.svg";
import { useEffect } from "react";
import { useState } from "react";
import { change_workspace_member_designation, change_workspace_member_role } from "../../../../api/workSpace";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UpdateMemberModal = ({
  setShowUpdateMemberModal,
  data,
  cancleUpdateMember,
}) => {
  const [editData, setEditData] = useState({});
  const selectedWorkspaceId = useSelector(
    (state) => state.workspace.selectedWorkspace
  );

  const handleChange = (e) => {
    setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(editData._id , editData.role , editData.designation)
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      
       await change_workspace_member_role(selectedWorkspaceId, {
        id: editData._id,
        role: editData.role,
      });

     try{
        await change_workspace_member_designation(selectedWorkspaceId,{
            id:editData._id,
            designation:editData.designation
          })

          // display a notification for user
          toast.success(`Role changed successfully`, {
            autoClose: 3000,
          });
     }
     catch (error) {
        // error for developer for deBugging...
        console.log(error);
      }
      
     
    } catch (error) {
      // error for developer for deBugging...
      console.log(error);
    }
    setShowUpdateMemberModal(false);
  };

  useEffect(() => {
    setEditData(data);
  }, [data]);

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center bg-[#03112440] z-[999] py-[20px]">
      <div className="relative w-[614px] bg-white rounded-[16px] px-[60px] py-[40px] h-auto max-h-[600px] overflow-y-scroll no-scrollbar">
        <div
          onClick={() => setShowUpdateMemberModal(false)}
          className="w-max absolute top-[30px] right-[30px] cursor-pointer"
        >
          <img src={CrossIcon} alt="" />
        </div>
        <h1 className="text-[#031124] text-[30px] font-bold">
          Update Member Info
        </h1>
        <p className="mt-[9px] text-[#818892] text-[14px]">
          Update the following fields to edit member info.
        </p>
        <form onSubmit={handleUpdate} className="mt-[28px]">
          <p className="text-[14px] font-semibold text-[#424D5B]">Name</p>
          <div className="mt-[13px] w-full bg-[#ECECEC60] rounded-[8px] py-[16px] px-[20px] flex items-center gap-[10px]">
            <img src={ProfileCircle} alt="" />
            <input
              className="text-[#031124] placeholder:text-[#818892] text-[16px] border-none outline-none bg-transparent"
              type="text"
              placeholder="Enter name"
              name="fullName"
              onChange={handleChange}
              value={editData.fullName}
            />
          </div>


          <p className="text-[14px] font-semibold text-[#424D5B] mt-[20px]">
            designation
          </p>
          <div className="mt-[13px] w-full bg-[#ECECEC60] rounded-[8px] py-[16px] px-[20px] flex items-center gap-[10px]">
          <img src={BriefCaseIcon} alt="" />
            <input
              className="w-full placeholder:text-[#818892] text-[14px] border-none outline-none bg-transparent"
              type="text"
              placeholder="E.g. Designation"
              onChange={handleChange}
              value={editData.designation}
              name="designation"

            />
          </div>


           {/* <p className="mt-[20px] text-[14px] font-semibold text-[#424D5B]">
                        Designation
                    </p>
                    <div className="mt-[13px] w-full bg-[#ECECEC60] rounded-[8px] py-[16px] px-[20px] flex items-center gap-[10px]">
                        <img src={BriefCaseIcon} alt="" />
                        <select
                            id=""
                            className="w-full bg-transparent text-[#031124] text-[16px] border-none outline-none"
                            name="designation"
                            onChange={handleChange}
                        >
                            <option selected value="">
                                Select member designation
                            </option>
                            {[
                                "Developer",
                                "Frontend",
                                "Backend",
                                "Designer",
                                "Intern",
                            ].map((designation) => {
                                return (
                                    <option
                                        selected={
                                            designation?.toLowerCase() ===
                                            editData.designation?.toLowerCase()
                                        }
                                        value={editData.designation}
                                    >
                                        {designation}
                                    </option>
                                );
                            })}
                        </select>
                    </div>  */}



          <p className="text-[14px] font-semibold text-[#424D5B] mt-[20px]">
            Role
          </p>
          <div className="mt-[13px] w-full bg-[#ECECEC60] rounded-[8px] py-[16px] px-[20px] flex items-center gap-[10px]">
            <img src={TaguserIcon} alt="" />
            <input
              className="w-full placeholder:text-[#818892] text-[14px] border-none outline-none bg-transparent"
              type="text"
              placeholder="E.g. Designer"
              onChange={handleChange}
              value={editData.role}
              name="role"
            />
          </div>
          {/* <select
                            name="role"
                            onChange={handleChange}
                            id=""
                            className="w-full bg-transparent text-[#031124] text-[16px] border-none outline-none"
                        >
                            <option selected value="">
                                Select member type
                            </option>
                            {Object.values(WORKSPACE_ROLE).map((role) => {
                                return (
                                    <option
                                        selected={
                                            role?.toLowerCase() ===
                                            editData.type?.toLowerCase()
                                        }
                                        value={role}
                                    >
                                        {role}
                                    </option>
                                );
                            })}
                        </select> */}

          <div className="flex items-center mt-[40px] gap-[30px]">
            <button
              onClick={cancleUpdateMember}
              className="bg-[#FFE7EB] flex-1 py-[20px] rounded-[8px] flex items-center justify-center cursor-pointer"
            >
              <p className=" text-[14px] font-semibold text-[#FF3659]">
                Cancel
              </p>
            </button>
            <button
              type="submit"
              className="bg-[#6576FF] flex-1 py-[20px] rounded-[8px] flex items-center justify-center cursor-pointer"
            >
              <p className=" text-[14px] font-semibold text-white">Update</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMemberModal;