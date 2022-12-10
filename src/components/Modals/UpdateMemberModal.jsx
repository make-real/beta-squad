import React from "react";
import CrossIcon from "../../assets/cross.svg";
import InboxIcon from "../../assets/inbox.svg";
import TaguserIcon from "../../assets/tag_user.svg";
import ProfileCircle from "../../assets/profile_circle.svg";
import BriefCaseIcon from "../../assets/briefcase.svg";
import { useEffect } from "react";
import { useState } from "react";

const UpdateMemberModal = ({
    setShowUpdateMemberModal,
    data,
    cancleUpdateMember,
}) => {
    const [editData, setEditData] = useState({});

    const handleChange = (e) => {
        setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        console.log(editData);
    };

    useEffect(() => {
        setEditData(data);
    }, [data]);

    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center bg-[#03112440] z-50">
            <div className="relative w-[614px] bg-white rounded-[16px] px-[60px] py-[40px]">
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
                <form className="mt-[28px]">
                    <p className="text-[14px] font-semibold text-[#424D5B]">
                        Name
                    </p>
                    <div className="mt-[13px] w-full bg-[#ECECEC60] rounded-[8px] py-[16px] px-[20px] flex items-center gap-[10px]">
                        <img src={ProfileCircle} alt="" />
                        <input
                            className="text-[#031124] placeholder:text-[#818892] text-[16px] border-none outline-none bg-transparent"
                            type="email"
                            placeholder="Enter name"
                            name="name"
                            onChange={handleChange}
                            value={editData.name}
                        />
                    </div>
                    <p className="mt-[20px] text-[14px] font-semibold text-[#424D5B]">
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
                            ].map((designation) => {
                                return (
                                    <option
                                        selected={
                                            designation?.toLowerCase() ===
                                            editData.designation?.toLowerCase()
                                        }
                                        value={designation}
                                    >
                                        {designation}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <p className="text-[14px] font-semibold text-[#424D5B] mt-[20px]">
                        Member Type
                    </p>
                    <div className="mt-[13px] w-full bg-[#ECECEC60] rounded-[8px] py-[16px] px-[20px] flex items-center gap-[10px]">
                        <img src={TaguserIcon} alt="" />
                        <select
                            name="type"
                            onChange={handleChange}
                            id=""
                            className="w-full bg-transparent text-[#031124] text-[16px] border-none outline-none"
                        >
                            <option selected value="">
                                Select member type
                            </option>
                            {["User", "Admin", "Manager", "HR"].map((type) => {
                                return (
                                    <option
                                        selected={
                                            type?.toLowerCase() ===
                                            editData.type?.toLowerCase()
                                        }
                                        value={type}
                                    >
                                        {type}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="flex items-center mt-[40px] gap-[30px]">
                        <div
                            onClick={cancleUpdateMember}
                            className="bg-[#FFE7EB] flex-1 py-[20px] rounded-[8px] flex items-center justify-center cursor-pointer"
                        >
                            <p className=" text-[14px] font-semibold text-[#FF3659]">
                                Cancel
                            </p>
                        </div>
                        <div className="bg-[#6576FF] flex-1 py-[20px] rounded-[8px] flex items-center justify-center cursor-pointer">
                            <p className=" text-[14px] font-semibold text-white">
                                Update
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateMemberModal;
