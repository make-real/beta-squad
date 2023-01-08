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

const SquadScreen = ({ currentWorkspace, selectedSpace }) => {
    const { participantID, workspace_id } = useParams();
    const [selectedTab, setSelectedTab] = useState("messages");
    const [showType, setShowType] = useState("grid");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectedSpaceId = useSelector((state) => state.space.selectedSpace);
    const { socket, RtcEngine } = useSelector((state) => state.global);
    const uid = useSelector((state) => state?.userInfo?.userInfo?.uid);

    const [call, setCall] = useState();
    const [callReceived, setCallReceived] = useState(false);
    const { state } = useLocation();
    const location = useLocation();

    const localAudioTrackRef = useRef();

    const startCall = () => {
        setCallReceived(true);
        socket?.emit("START_CALL", selectedSpaceId);
    };

    useEffect(() => {
        socket?.on("ON_CALL", async (call) => {
            setCall(call);
        });

        socket?.on("ON_JOIN_CALL", async (call, token) => {
            console.log("ON_JOIN_CALL");

            setCallReceived(true);
            await RtcEngine?.join("b4304444d7834aca8f8036e813705e51", call?.channelId, token, uid);

            const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();

            localAudioTrackRef.current = localAudioTrack;

            await RtcEngine?.publish([localAudioTrack]);
        });

        socket?.on("ON_CALL_END", async (call) => {
            setCall(false);
            setCallReceived(false);
            setCallTime(0);

            await localAudioTrackRef?.current?.close();
            await RtcEngine?.leave();
        });

        RtcEngine?.on("user-published", async (user, mediaType) => {
            console.log("user-published");

            // Subscribe to the remote user when the SDK triggers the "user-published" event.
            await RtcEngine?.subscribe(user, mediaType);
            console.log("subscribe success");
            // Subscribe and play the remote video in the container If the remote user publishes a video track.
            if (mediaType == "video") {
                const remoteAudioTrack = user.audioTrack;
                const remoteVideoTrack = user.videoTrack;
                const remoteUserId = user.uid.toString();

                remoteAudioTrack.play();
            }
            // Subscribe and play the remote audio track If the remote user publishes the audio track only.
            if (mediaType == "audio") {
                const remoteAudioTrack = user.audioTrack;
                const remoteUserId = user.uid.toString();

                remoteAudioTrack.play();
            }

            // Listen for the "user-unpublished" event.
            RtcEngine?.on("user-unpublished", (user) => {
                console.log(user.uid + "has left the channel");
            });
        });

        return () => {
            socket?.off("ON_CALL");
            socket?.off("ON_CALL_END");
            socket?.off("ON_JOIN_CALL");
        };
    }, [socket, uid, RtcEngine]);

    function twoDigits(num) {
        return (num < 10 ? "0" : "") + num;
    }

    const ringingRef = useRef();

    useEffect(() => {
        if (!callReceived && call) {
            ringingRef.current = new Audio(ringing);
            ringingRef.current.loop = true;

            ringingRef.current.play();
        }

        if (callReceived) ringingRef?.current?.pause();


    }, [call, callReceived]);

    function convertSeconds(seconds) {
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds % 3600) / 60);
        let remainingSeconds = seconds % 60;

        return `${twoDigits(hours)}:${twoDigits(minutes)}:${twoDigits(remainingSeconds)}`;
    }

    const endCall = async () => {
        try {
            setCall(false);
            setCallReceived(false);
            setCallTime(0);
            socket.emit("END_CALL", call._id);
            ringingRef?.current?.pause();

            await localAudioTrackRef?.current?.close();
            await RtcEngine?.leave();
        } catch (error) {
            console.log(error);
        }
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

    const handleReceiveCall = async () => {
        socket?.emit("JOIN_CALL", call._id);
        setCallReceived(true);
    };

    const [callTime, setCallTime] = useState(0);

    useEffect(() => {
        let interval;

        if (callReceived) interval = setInterval(() => setCallTime((prev) => prev + 1), 1000);

        if (!callReceived) clearInterval(interval);

        return () => {
            clearInterval(interval);
        };
    }, [callReceived]);

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
                                                    <Folder
                                                        className="w-[20px] h-[20px] mr-2"
                                                        style={{
                                                            fill: selectedSpace?.color,
                                                        }}
                                                    />

                                                    <div>
                                                        <h2 className="text-[15px] leading-[19px] font-medium text-[#424D5B] mr-[9px] truncate w-[100px]">
                                                            {selectedSpace?.name}
                                                        </h2>
                                                        <p className="font-normal text-[12px] leading-[15px] text-[#818892]">
                                                            {callReceived ? convertSeconds(callTime) : "Calling..."}{" "}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center self-start gap-4">
                                                    {callReceived && (
                                                        <>
                                                            <VideoOff className="cursor-pointer" />
                                                            <MicrophoneOn className="cursor-pointer" />
                                                        </>
                                                    )}

                                                    <CallEnd className="cursor-pointer" onClick={endCall} />

                                                    {!callReceived && <ReceiveCall onClick={handleReceiveCall} className="cursor-pointer h-[24px]" />}

                                                    {callReceived && <More className="cursor-pointer" />}
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
