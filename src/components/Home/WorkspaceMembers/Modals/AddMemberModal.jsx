import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { add_workspace_member } from "../../../../api/workSpace";
import CrossIcon from "../../../../assets/cross.svg";
import InboxIcon from "../../../../assets/inbox.svg";
import TaguserIcon from "../../../../assets/tag_user.svg";
import { WORKSPACE_ROLE } from "../../../../constant/enums";
import { validateEmail } from "../../../../util/helpers";

const AddMemberModal = ({ setShowAddMemberModal }) => {
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

        // close this modal
        setShowAddMemberModal(false);
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
                <h1 className="text-[#031124] text-[30px] font-bold">
                    Add Member
                </h1>
                <p className="mt-[9px] text-[#818892] text-[14px]">
                    Enter email to add member to{" "}
                    <span className="text-[#6576FF]">
                        {currentWorkspace?.name}
                    </span>
                </p>
                <form onSubmit={addMember} className="mt-[28px]">
                    <p className="text-[14px] font-semibold text-[#424D5B]">
                        Email
                    </p>
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

export default AddMemberModal;
