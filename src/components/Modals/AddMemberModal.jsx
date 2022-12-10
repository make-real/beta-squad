import React from "react";
import CrossIcon from "../../assets/cross.svg";
import InboxIcon from "../../assets/inbox.svg";
import TaguserIcon from "../../assets/tag_user.svg";

const AddMemberModal = ({ setShowAddMemberModal }) => {
    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center bg-[#03112440] z-50">
            <div className="relative w-[614px] bg-white rounded-[16px] px-[60px] py-[40px]">
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
                    <span className="text-[#6576FF]">Make Real</span>
                </p>
                <form className="mt-[28px]">
                    <p className="text-[14px] font-semibold text-[#424D5B]">
                        Email
                    </p>
                    <div className="mt-[13px] w-full bg-[#ECECEC60] rounded-[8px] py-[16px] px-[20px] flex items-center gap-[10px]">
                        <img src={InboxIcon} alt="" />
                        <input
                            className="w-full placeholder:text-[#818892] text-[14px] border-none outline-none bg-transparent"
                            type="email"
                            placeholder="Enter email address"
                        />
                    </div>
                    <p className="text-[14px] font-semibold text-[#424D5B] mt-[20px]">
                        Member Type
                    </p>
                    <div className="mt-[13px] w-full bg-[#ECECEC60] rounded-[8px] py-[16px] px-[20px] flex items-center gap-[10px]">
                        <img src={TaguserIcon} alt="" />
                        <select
                            name=""
                            id=""
                            className="w-full bg-transparent text-[#818892] text-[14px] border-none outline-none"
                        >
                            <option selected value="">
                                Select member type
                            </option>
                            <option value="">Frontend</option>
                            <option value="">Designer</option>
                            <option value="">Backend</option>
                        </select>
                    </div>
                    <button className="mt-[40px] w-full py-[17px] rounded-[8px] bg-[#6576FF] text-white">
                        Send Invitation
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddMemberModal;
