import React from "react";
import SearchIcon from "../../assets/search.svg";
import GridIcon from "../../assets/icon_component/Grid";
import RowVerticalIcon from "../../assets/icon_component/RowVertical";
import { useState } from "react";
import BackArrowIcon from "../../assets/back_arrow.svg";
import { useDispatch, useSelector } from "react-redux";
import {
    setSelectedSpaceId,
    setSelectedSpaceObject,
} from "../../store/slice/space";
import FolderIcon from "../../assets/icon_component/Folder";
import Board from "../Board/Board";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Chat from "../Chat/Chat";
import SquadMembers from "./SquadMembers/SquadMembers";

const SquadScreen = ({ currentWorkspace, selectedSpace }) => {
    const [selectedTab, setSelectedTab] = useState("messages");
    const [showType, setShowType] = useState("grid");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectedSpaceId = useSelector((state) => state.space.selectedSpace);

    const { state } = useLocation();

    useEffect(() => {
        if (state?.tab) {
            setSelectedTab(state?.tab ?? "messages");
            window.history.replaceState({}, document.title);
        }
    }, [state?.tab]);

    const TabsScreen = {
        messages: <Chat />,
        board: <Board selectedSpaceId={selectedSpaceId} showType={showType} />,
        members: (
            <SquadMembers showType={showType} selectedSpace={selectedSpace} />
        ),
    };

    const TabsName = {
        messages: "Messages",
        board: "Board",
        members: "Members",
    };

    return (
        <div className="relative pt-[45px] px-[63px] pb-[60px] bg-[#F9F9FF] h-full flex flex-col">
            <div className="mt-[20px] w-full h-full bg-white rounded-[16px] px-[64px] pt-[50px] pb-[20px]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <FolderIcon
                            className="w-[60px]"
                            style={{ fill: selectedSpace?.color }}
                        />
                        <h2 className="text-[20px] text-[#424D5B] font-semibold mr-[9px]">
                            {selectedSpace?.name}
                        </h2>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center gap-[12px]">
                            <img src={SearchIcon} alt="search" className="" />
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
                                <GridIcon isSelected={showType === "grid"} />
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
                <div className="mt-[40px]">
                    <div className="flex items-center gap-[45px]">
                        {Object.keys(TabsName).map((value) => {
                            return (
                                <h2
                                    onClick={() => setSelectedTab(value)}
                                    className={`${
                                        selectedTab === value
                                            ? "border-b-2 border-b-[#6576FF] text-[#031124]"
                                            : "text-[#818892]"
                                    } text-[19px] font-medium  pb-[10px] cursor-pointer`}
                                >
                                    {TabsName[value]}
                                </h2>
                            );
                        })}
                    </div>
                    <div className="w-full h-[1px] bg-[#ECECEC]"></div>
                    {TabsScreen[selectedTab]}
                </div>
            </div>
        </div>
    );
};

export default SquadScreen;
