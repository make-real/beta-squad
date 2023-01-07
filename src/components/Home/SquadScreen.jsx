import React from "react";
import SearchIcon from "../../assets/search.svg";
import GridIcon from "../../assets/icon_component/Grid";
import RowVerticalIcon from "../../assets/icon_component/RowVertical";
import VideoCallIcon from "../../assets/video_call.svg";
import AudioCallIcon from "../../assets/audio_call.svg";
import { useState } from "react";
import BackArrowIcon from "../../assets/back_arrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSpaceId, setSelectedSpaceObject } from "../../store/slice/space";
import FolderIcon from "../../assets/icon_component/Folder";
import PrivateFolderIcon from "../../assets/icon_component/PrivateFolder";
import Board from "../Board/Board";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Chat from "../Chat/Chat";
import SquadMembers from "./SquadMembers/SquadMembers";
import Folder from "../../assets/icon_component/Folder";
import Draggable from "react-draggable";
import CallEnd from "../../assets/icon_component/CallEnd";
import VideoOff from "../../assets/icon_component/VideoOff";
import MicrophoneOff from "../../assets/icon_component/MicrophoneOff";
import MicrophoneOn from "../../assets/icon_component/MicrophoneOn";
import More from "../../assets/icon_component/More";

import AgoraRTC from "agora-rtc-sdk-ng";


const SquadScreen = ({ currentWorkspace, selectedSpace }) => {
    const [selectedTab, setSelectedTab] = useState("messages");
    const [showType, setShowType] = useState("grid");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectedSpaceId = useSelector((state) => state.space.selectedSpace);
    const socket = useSelector((state) => state.socket.socket);

    const [call, setCall] = useState();
    const { state } = useLocation();

    const startCall = () => {
        setCall(true);
        socket.emit("START_CALL", selectedSpace._id);
    };

    useEffect(() => {
        socket?.on("ON_CALL", () => setCall(true));
        socket?.on("ON_CALL_END", () => setCall(false));

        return () => {
            socket?.off("ON_CALL");
            socket?.off("ON_CALL_END");
        };
    }, [socket]);

    const endCall = () => {
        setCall(false);
        socket.emit("END_CALL", selectedSpace._id);
    };

    useEffect(() => {
        if (state?.tab) {
            setSelectedTab(state?.tab ?? "messages");
            window.history.replaceState({}, document.title);
        }
    }, [state?.tab]);

    const TabsScreen = {
        messages: <Chat />,
        board: <Board selectedSpaceId={selectedSpaceId} showType={showType} />,
        members: <SquadMembers showType={showType} selectedSpace={selectedSpace} />,
    };

    const TabsName = {
        messages: "Messages",
        board: "Board",
        members: "Members",
    };

    return (
        <div className="bg-[#F9F9FF] w-full h-full">
            <div
                className={`relative ${
                    selectedTab === "messages" || selectedTab === "board" ? "pt-[40px]" : "pt-[40px]"
                } px-[40px] pb-[40px] bg-[#F9F9FF] h-full flex flex-col`}
            >
                <div className="w-full h-full bg-white rounded-[16px] px-[40px] pt-[30px] pb-[20px] flex flex-col">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[10px]">
                            <FolderIcon className="w-[20px] h-[20px]" style={{ fill: selectedSpace?.color }} />
                            <h2 className="text-[20px] text-[#424D5B] font-semibold mr-[9px]">{selectedSpace?.name}</h2>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center gap-[12px]">
                                <img src={SearchIcon} alt="search" className="" />
                                <input type="text" placeholder="Search here" className=" placeholder:text-[#99A6B9] border-none outline-none" />
                            </div>
                            {selectedTab === "messages" ? (
                                <div className="flex items-center gap-[22px] relative">
                                    <div className="cursor-pointer" onClick={startCall}>
                                        <img src={VideoCallIcon} alt="video_call" />
                                    </div>
                                    <div className="cursor-pointer" onClick={startCall}>
                                        <img src={AudioCallIcon} alt="audio_call" />
                                    </div>

                                    {call && (
                                        <Draggable>
                                            <div className="absolute bg-white  drop-shadow-[0_25px_25px_rgba(0,0,0,0.15)] right-0 -bottom-[90px] p-5 rounded-xl z-[1000] flex cursor-move">
                                                <div className="flex w-full">
                                                    <Folder className="w-[20px] h-[20px] mr-2" style={{ fill: selectedSpace?.color }} />

                                                    <div>
                                                        <h2 className="text-[15px] leading-[19px] font-medium text-[#424D5B] mr-[9px] truncate w-[100px]">
                                                            {selectedSpace?.name}
                                                        </h2>
                                                        <p className="font-normal text-[12px] leading-[15px] text-[#818892]">Ringing...</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center self-start gap-4">
                                                    <VideoOff className="cursor-pointer" />

                                                    <MicrophoneOn className="cursor-pointer" />

                                                    <CallEnd className="cursor-pointer" onClick={endCall} />

                                                    <More className="cursor-pointer" />
                                                </div>
                                            </div>
                                        </Draggable>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center gap-[22px]">
                                    <div className="cursor-pointer" onClick={() => setShowType("grid")}>
                                        <GridIcon isSelected={showType === "grid"} />
                                    </div>
                                    <div className="cursor-pointer" onClick={() => setShowType("stack")}>
                                        <RowVerticalIcon isSelected={showType === "stack"} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mt-[30px] flex flex-col h-full">
                        <div className="flex items-center gap-[50px]">
                            {Object.keys(TabsName).map((value, idx) => {
                                return (
                                    <h2
                                        key={idx}
                                        onClick={() => setSelectedTab(value)}
                                        className={`${
                                            selectedTab === value ? "border-b-2 border-b-[#6576FF] text-[#031124]" : "text-[#818892]"
                                        } text-[19px] font-medium  pb-[10px] cursor-pointer`}
                                    >
                                        {TabsName[value]}
                                    </h2>
                                );
                            })}
                        </div>
                        <div className="w-full h-[1px] bg-[#ECECEC]"></div>
                        <div className={`h-full w-full pb-16 mx-auto mt-[30px]  overflow-hidden`}>{TabsScreen[selectedTab]}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SquadScreen;
