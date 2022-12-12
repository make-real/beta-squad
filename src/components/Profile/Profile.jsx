import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BackArrowIcon from "../../assets/back_arrow.svg";
import GalleryIcon from "../../assets/gallery.svg";
import DeleteProfileModal from "./Modals/DeleteProfileModal";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [showDeleteProfileModal, setShowDeleteProfileModal] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const handleChange = (e) => {
        setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        setUserData(userInfo);
    }, [userInfo]);

    return (
        <>
            <div className="relative pt-[43px] px-[63px] pb-[60px] bg-[#F9F9FF] h-full flex flex-col">
                <div className="flex items-center">
                    <Link to="/projects" className="cursor-pointer">
                        <img src={BackArrowIcon} alt="" />
                    </Link>
                    <p className="ml-[14px] font-semibold text-[15px] text-[#031124]">
                        Profile
                    </p>
                </div>
                <div className="mt-[40px] w-full h-full bg-white rounded-[16px] pt-[50px] pb-[50px] px-[62px] flex flex-col">
                    <h1 className="text-[#424D5B] text-[20px] leading-[25px] font-semibold">
                        Profile
                    </h1>
                    <p className="text-[#818892] text-[15px] mt-[12px]">
                        You may update your profile info from here.
                    </p>
                    <div className="mt-[30px]">
                        <div className="relative w-[100px] h-[100px] rounded-full bg-[#6576FF40] p-[4px]">
                            <img
                                className="w-full h-full rounded-full"
                                src={userData?.avatar}
                                alt=""
                            />
                            <label
                                htmlFor="user_avatar"
                                className="absolute right-[-5px] bottom-[5px] w-[36px] h-[36px] rounded-full bg-[#6576FF] flex items-center justify-center cursor-pointer border-[3px] border-white"
                            >
                                <img src={GalleryIcon} alt="" />
                            </label>
                            <input id="user_avatar" type="file" hidden />
                        </div>
                        <div className="mt-[44px] flex w-full gap-[30px]">
                            <div className="w-full">
                                <p className="text-[#818892] text-[14px] font-semibold">
                                    User name
                                </p>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full bg-[#ECECEC60] rounded-[8px] text-[16px] text-[#031124] px-[18px] py-[14px] mt-[13px] border-none outline-none"
                                    name="fullName"
                                    onChange={handleChange}
                                    value={userData?.fullName}
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-[#818892] text-[14px] font-semibold">
                                    Present password
                                </p>
                                <input
                                    type="text"
                                    placeholder="Enter your present password"
                                    className="w-full bg-[#ECECEC60] rounded-[8px] text-[16px] text-[#031124] px-[18px] py-[14px] mt-[13px] border-none outline-none"
                                />
                            </div>
                        </div>
                        <div className="mt-[33px] flex w-full gap-[30px]">
                            <div className="w-full">
                                <p className="text-[#818892] text-[14px] font-semibold">
                                    New password
                                </p>
                                <input
                                    type="text"
                                    placeholder="Enter new password"
                                    className="w-full bg-[#ECECEC60] rounded-[8px] text-[16px] text-[#031124] px-[18px] py-[14px] mt-[13px] border-none outline-none"
                                    name="fullName"
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-[#818892] text-[14px] font-semibold">
                                    Confirm password
                                </p>
                                <input
                                    type="text"
                                    placeholder="Confirm new password"
                                    className="w-full bg-[#ECECEC60] rounded-[8px] text-[16px] text-[#031124] px-[18px] py-[14px] mt-[13px] border-none outline-none"
                                />
                            </div>
                        </div>
                        <div className="mt-auto flex items-center justify-between h-full">
                            <p
                                onClick={() => setShowDeleteProfileModal(true)}
                                className="w-max text-[#FF3659] text-[14px] font-semibold underline cursor-pointer"
                            >
                                Delete Profile
                            </p>
                            <div className="flex items-center gap-[30px]">
                                <button className="bg-[#ECECEC] text-[14px] text-[#818892] font-semibold py-[17px] px-[92px] rounded-[8px]">
                                    Cancel
                                </button>
                                <button className="bg-[#6576FF] text-[14px] text-white font-semibold py-[17px] px-[92px] rounded-[8px]">
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showDeleteProfileModal && (
                <DeleteProfileModal
                    setShowDeleteProfileModal={setShowDeleteProfileModal}
                />
            )}
        </>
    );
};

export default Profile;
