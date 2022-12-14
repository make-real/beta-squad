import React from "react";
import SearchIcon from "../../assets/search.svg";
import GridIcon from "../../assets/icon_component/Grid";
import RowVerticalIcon from "../../assets/icon_component/RowVertical";
import { useState } from "react";
import Projects from "./Projects/Projects";
import WorkspaceMembers from "./WorkspaceMembers/WorkspaceMembers";

const WorkspaceScreen = ({ currentWorkspace }) => {
    const [selectedTab, setSelectedTab] = useState("projects");
    const [showType, setShowType] = useState("grid");

    const Tabs = {
        projects: <Projects showType={showType} />,
        squad_members: <WorkspaceMembers showType={showType} />,
    };

    return (
        <>
            <div className="relative pt-[45px] px-[63px] bg-[#F9F9FF] h-full flex flex-col">
                <h1 className="font-medium text-[18px] text-[#031124]">
                    {currentWorkspace?.name}
                </h1>
                <div className="mt-[40px] w-full h-full max-h-[80%] flex flex-col bg-white rounded-[16px] px-[64px] pt-[50px] pb-[20px] overflow-hidden">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            {currentWorkspace?.logo ? (
                                <div className="mr-[12px] w-[32px] h-[32px] ">
                                    <img
                                        src={currentWorkspace.logo}
                                        alt=""
                                        className="w-[30px] h-[30px] border border-[#6576FF] rounded-full mr-[12px]"
                                    />
                                </div>
                            ) : (
                                <div className="mr-[12px] w-10 h-10 bg-[#2C3782] flex items-center justify-center cursor-pointer rounded-[5px] shadow-xl hover:bg-[#4D6378] text-gray-100 font-bold border">
                                    {currentWorkspace?.name.charAt(0)}
                                </div>
                            )}
                            <h2 className="text-[20px] text-[#424D5B] font-semibold mr-[9px]">
                                {currentWorkspace?.name}
                            </h2>
                            <div className="w-[9px] h-[9px] bg-[#FF3659] rounded-full"></div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center gap-[12px]">
                                <img
                                    src={SearchIcon}
                                    alt="search"
                                    className=""
                                />
                                <input
                                    type="text"
                                    placeholder="Search here"
                                    className=" placeholder:text-[#99A6B9] border-none outline-none"
                                />
                            </div>
                            <div className="flex items-center gap-[22px]">
                                <div
                                    className="cursor-pointer"
                                    onClick={() => setShowType("grid")}
                                >
                                    <GridIcon
                                        isSelected={showType === "grid"}
                                    />
                                </div>
                                <div
                                    className="cursor-pointer"
                                    onClick={() => setShowType("stack")}
                                >
                                    <RowVerticalIcon
                                        isSelected={showType === "stack"}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-[40px] h-full flex flex-col overflow-hidden">
                        <div className="flex items-center gap-[45px]">
                            <h2
                                onClick={() => setSelectedTab("projects")}
                                className={`${
                                    selectedTab === "projects"
                                        ? "border-b-2 border-b-[#6576FF] text-[#031124]"
                                        : "text-[#818892]"
                                } text-[19px] font-medium  pb-[10px] cursor-pointer`}
                            >
                                Projects
                            </h2>
                            <h2
                                onClick={() => setSelectedTab("squad_members")}
                                className={`${
                                    selectedTab === "squad_members"
                                        ? "border-b-2 border-b-[#6576FF] text-[#031124]"
                                        : "text-[#818892]"
                                } text-[19px] font-medium  pb-[10px] cursor-pointer`}
                            >
                                Squad Members
                            </h2>
                        </div>
                        <div className="w-full h-[1px] bg-[#ECECEC]"></div>
                        {Tabs[selectedTab]}
                    </div>
                </div>
            </div>
        </>
    );
};

export default WorkspaceScreen;
