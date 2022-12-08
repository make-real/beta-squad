import React from "react";
import { CloseMenuBtn, Plus } from "../../assets/icons";
import LogoIcon from "../../assets/logo.svg";
import PlusIcon from "../../assets/plus.svg";
import SearchIcon from "../../assets/search.svg";
import SquadIcon from "../../assets/icon_component/Squad";
import { useState } from "react";

const SideNavbar = () => {
    const [showFullBar, setShowFullBar] = useState(false);

    return (
        <div
            className={`${
                showFullBar
                    ? "min-w-[225px] w-[225px] pl-[25px] pr-[10px]"
                    : "w-max pl-[25px] pr-[25px] items-center"
            } bg-[#2C3782] pt-[20px] flex flex-col`}
        >
            <div className="flex items-center justify-between">
                {showFullBar && (
                    <div className="flex items-center gap-4">
                        <img
                            src={LogoIcon}
                            alt=""
                            className="w-[28px] h-[28px]"
                        />
                        <h1 className="text-[#C4CEFE] text-[20px]">TaskM</h1>
                    </div>
                )}
                <div
                    className="w-max"
                    onClick={() => setShowFullBar(!showFullBar)}
                >
                    <CloseMenuBtn className="text-white w-[28px] h-[28px] cursor-pointer" />
                </div>
            </div>
            {/* Workspace */}
            <div className="mt-[32px]">
                <div className="flex items-center gap-3 cursor-pointer">
                    <div className="w-[32px] h-[32px]">
                        <img
                            src="https://assets.stickpng.com/thumbs/5847f439cef1014c0b5e4890.png"
                            alt=""
                            className="w-full h-full bg-white  border border-[#5951F4] rounded-full"
                        />
                    </div>
                    {showFullBar && (
                        <p className="text-[14px] text-white">Make Real</p>
                    )}
                </div>
            </div>
            {/* Squad */}
            <div className="mt-[24px]">
                {showFullBar && (
                    <div className="flex items-center justify-between">
                        <h2 className="text-[#6576FF] opacity-80">
                            Your Squad
                        </h2>
                        <img src={PlusIcon} alt="" className="cursor-pointer" />
                    </div>
                )}
                {/* Squads List */}
                <div className="mt-[20px] flex flex-col gap-[20px]">
                    <div className="flex items-center gap-3 cursor-pointer">
                        <SquadIcon className="fill-pink-500" />
                        {showFullBar && (
                            <p className="text-[14px] text-[#C4CEFE]">
                                Heart Live
                            </p>
                        )}
                    </div>
                    <div className="flex items-center gap-3 cursor-pointer">
                        <SquadIcon className="fill-yellow-400" />
                        {showFullBar && (
                            <p className="text-[14px] text-[#C4CEFE]">JCI</p>
                        )}
                    </div>
                    <div className="flex items-center gap-3 cursor-pointer">
                        <SquadIcon className="fill-cyan-400" />
                        {showFullBar && (
                            <p className="text-[14px] text-[#C4CEFE]">
                                Cycle Nation
                            </p>
                        )}
                    </div>
                </div>
            </div>
            {/* Chats */}
            <div className="mt-[50px]">
                {showFullBar && (
                    <div className="flex items-center justify-between">
                        <h2 className="text-[#6576FF] opacity-80">Chats</h2>
                        <div className="flex items-center gap-2">
                            <img
                                src={SearchIcon}
                                alt="search"
                                className="cursor-pointer"
                            />
                            <img
                                src={PlusIcon}
                                alt="add"
                                className="cursor-pointer"
                            />
                        </div>
                    </div>
                )}
                {/* Chats List */}
                <div className="mt-[15px] flex flex-col gap-[15px]">
                    <div className="flex items-center gap-[10px]">
                        <img
                            src="https://cdn.shopify.com/s/files/1/0850/2114/files/tips_to_help_heighten_senses_480x480.png?v=1624399167"
                            className="w-[28px] h-[28px] rounded-full border object-cover"
                            alt=""
                        />
                        {showFullBar && (
                            <p className="text-[#C4CEFE] text-[14px]">Happy</p>
                        )}
                    </div>
                    <div className="flex items-center gap-[10px]">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyav7L25SiA9SPoAGUklByNDwApTf73lwisXoWUA_T_TbLI270GRYXZVlVkg_sd-GwGRs&usqp=CAU"
                            className="w-[28px] h-[28px] rounded-full border object-cover"
                            alt=""
                        />
                        {showFullBar && (
                            <p className="text-[#C4CEFE] text-[14px]">
                                Sakif Khan
                            </p>
                        )}
                    </div>
                    <div className="flex items-center gap-[10px]">
                        <img
                            src="https://media.istockphoto.com/id/1335941248/photo/shot-of-a-handsome-young-man-standing-against-a-grey-background.jpg?b=1&s=170667a&w=0&k=20&c=Dl9uxPY_Xn159JiazEj0bknMkLxFdY7f4tK1GtOGmis="
                            className="w-[28px] h-[28px] rounded-full border object-cover"
                            alt=""
                        />
                        {showFullBar && (
                            <p className="text-[#C4CEFE] text-[14px]">
                                Hero Alam
                            </p>
                        )}
                    </div>
                    <div className="flex items-center gap-[10px]">
                        <img
                            src="https://media.istockphoto.com/id/1150742429/photo/asian-girl-taking-a-selfie-in-rain.jpg?s=612x612&w=0&k=20&c=SQITcq6XT-JTScQLFkTtvvj6yOpP04EPRUOq5Y-3-Hg="
                            className="w-[28px] h-[28px] rounded-full border object-cover"
                            alt=""
                        />
                        {showFullBar && (
                            <p className="text-[#C4CEFE] text-[14px]">
                                Pori Moni
                            </p>
                        )}
                    </div>
                </div>
            </div>
            {/* Footer Copyright */}
            <p
                className={`text-[#C4CEFE] ${
                    showFullBar ? "text-[12px]" : "text-[22px]"
                } mt-auto mb-[16px]`}
            >
                &copy;
                {showFullBar && (
                    <span className="ml-[10px]">Taskmanager 2022</span>
                )}
            </p>
        </div>
    );
};

export default SideNavbar;
