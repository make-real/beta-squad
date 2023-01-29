import React, { useRef } from "react";
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Chat from "../Chat/Chat";
import SquadMembers from "./SquadMembers/SquadMembers";
import Folder from "../../assets/icon_component/Folder";
import Draggable from "react-draggable";
import CallEnd from "../../assets/icon_component/CallEnd";
import ringing from "../../assets/ringing.mp3";
import VideoOff from "../../assets/icon_component/VideoOff";
import MicrophoneOff from "../../assets/icon_component/MicrophoneOff";
import MicrophoneOn from "../../assets/icon_component/MicrophoneOn";
import More from "../../assets/icon_component/More";

import AgoraRTC from "agora-rtc-sdk-ng";
import ReceiveCall from "../../assets/icon_component/ReceiveCall";
import { async } from "@firebase/util";
import { addLocalAudioTrack, callReceived } from "../../store/slice/global";

import ring from "../../assets/ring.wav";

const SquadScreen = ({ currentWorkspace, selectedSpace }) => {
    const { participantID, workspace_id } = useParams();
    const [selectedTab, setSelectedTab] = useState("messages");
    const [showType, setShowType] = useState("grid");
    const dispatch = useDispatch();
    const selectedSpaceId = useSelector((state) => state.space.selectedSpace);
    const { socket, call } = useSelector((state) => state.global);

    const { state } = useLocation();
    const location = useLocation();

    const ringRef = useRef();

    useEffect(() => {
        if (call?.data) {
            if (call?.data?.participants?.length != 1) {
                ringRef?.current?.pause();
            }
        }
    }, [call?.data?.participants]);

    const startCall = (type) => {
        if (call?.data) return;

        ringRef.current = new Audio(ring);
        ringRef.current.loop = true;
        ringRef.current.play();

        dispatch(callReceived(true));
        socket?.emit("START_CALL", selectedSpaceId, false, type);
    };

    useEffect(() => {
        if (state?.tab) {
            setSelectedTab(state?.tab ?? "messages");
            window.history.replaceState({}, document.title);
        }
    }, [state?.tab]);

    useEffect(() => {
        let tab = location?.hash?.slice(1);
        if (tab) {
            setSelectedTab(tab);
        }
    }, [location]);

    const TabsScreen = {
        messages: <Chat />,
        board: <Board selectedSpaceId={workspace_id} showType={showType} />,
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
                        {/* <div className="flex items-center gap-[10px]">
                            <FolderIcon className="w-[20px] h-[20px]" style={{ fill: selectedSpace?.color }} />
                            <h2 className="text-[20px] text-[#424D5B] font-semibold mr-[9px]">{selectedSpace?.name}</h2>
                        </div> */}
                        <div className="flex items-center gap-[50px]">
                            {Object.keys(TabsName).map((value, idx) => {
                                return (
                                    <a
                                        href={`#${value.toLowerCase()}`}
                                        key={idx}
                                        onClick={() => setSelectedTab(value)}
                                        className={`${
                                            selectedTab === value ? "border-b-2 border-b-[#6576FF] text-[#031124]" : "text-[#818892]"
                                        } text-[19px] font-medium   cursor-pointer`}
                                    >
                                        {TabsName[value]}
                                    </a>
                                );
                            })}
                        </div>

                        <div className="flex items-center">
                            <div className="flex items-center gap-[12px]">
                                <img src={SearchIcon} alt="search" className="" />
                                <input type="text" placeholder="Search here" className=" placeholder:text-[#99A6B9] border-none outline-none" />
                            </div>
                            {selectedTab === "messages" ? (
                                <div className="flex items-center gap-[22px] relative">
                                    <div className="cursor-pointer" onClick={() => startCall("video")}>
                                        <img src={VideoCallIcon} alt="video_call" />
                                    </div>
                                    <div className="cursor-pointer" onClick={() => startCall("audio")}>
                                        <img src={AudioCallIcon} alt="audio_call" />
                                    </div>
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
                    <div className=" flex flex-col h-full">
                        {/* <div className="w-full h-[1px] bg-[#ECECEC]"></div> */}
                        <div className={`h-full w-full pb-10 mx-auto mt-[30px]  overflow-hidden`}>{TabsScreen[selectedTab]}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SquadScreen;
