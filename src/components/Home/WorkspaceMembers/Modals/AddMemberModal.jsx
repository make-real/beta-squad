import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { add_workspace_member } from "../../../../api/workSpace";
import CrossIcon from "../../../../assets/cross.svg";
import InboxIcon from "../../../../assets/inbox.svg";
import { validateEmail } from "../../../../util/helpers";
import TaguserIcon from "../../../../assets/tag_user.svg";
import { WORKSPACE_ROLE } from "../../../../constant/enums";
import { RiErrorWarningLine } from "react-icons/ri";

const AddMemberModal = ({ setShowAddMemberModal }) => {
  const currentWorkspace = useSelector(
    (state) => state.workspace.currentWorkspace
  );
  const [memberData, setMemberData] = useState({
    email: "",
    designation: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const addMember = async (e) => {
    e.preventDefault();
    setErrMsg("");

    if (!validateEmail(memberData.email)) return;

    try {
      setLoading(!loading);
      await add_workspace_member(currentWorkspace._id, memberData.email, memberData.designation);
      setLoading(!loading);

      // display a notification for user
      toast.success(`Member added`, {
        autoClose: 3000,
      });

      // reset all input fields...
      setMemberData({ name: "", color: "", privacy: "" });
      window.location.reload(true);
      // close this modal
      setShowAddMemberModal(false);
    } catch (error) {
      // error for developer for deBugging...
      // console.log(error.response.data);
      console.log(error);
      setErrMsg(error?.message);
      // error for user at notification...
      // toast.error(error?.message, {
      //     autoClose: 3000,
      // });
    }
  };

  const handleChange = (e) => {
    setMemberData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(memberData);

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center bg-[#03112440] py-[20px] z-[999]">
      <div className="relative w-[614px] h-auto overflow-y-scroll no-scrollbar bg-white rounded-[16px] px-[60px] py-[40px]">
        <div
          onClick={() => setShowAddMemberModal(false)}
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
          <p className="text-[14px] font-semibold text-[#424D5B] mt-[20px]">
                        Designation
                    </p>
                    <div className="mt-[13px] w-full bg-[#ECECEC60] rounded-[8px] py-[16px] px-[20px] flex items-center gap-[10px]">
                        <img src={TaguserIcon} alt="" />
                        <input
              className="w-full placeholder:text-[#818892] text-[14px] border-none outline-none bg-transparent"
              type="text"
              placeholder="E.g. Designer"
              onChange={handleChange}
              value={memberData.designation}
              name="designation"
            />
                    </div>


          {errMsg && (
            <span className="flex justify-start items-center gap-1 mt-2">
              <RiErrorWarningLine className="text-[#FF3659]" />
              <p className="text-[#FF3659]">{errMsg}</p>
            </span>
          )}

          <button className="mt-[40px] w-full py-[17px] rounded-[8px] bg-[#6576FF] text-white">
            {!loading ? (
              "Send Invitation"
            ) : (
              <div role="status">
                <svg
                  aria-hidden="true"
                  class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;
