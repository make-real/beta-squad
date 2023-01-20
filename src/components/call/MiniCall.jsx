import AgoraRTC from "agora-rtc-sdk-ng";
import { ca } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import Draggable from "react-draggable";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ScaleLoader } from "react-spinners";
import CallEnd from "../../assets/icon_component/CallEnd";
import Folder from "../../assets/icon_component/Folder";
import Maximize from "../../assets/icon_component/Maximize";
import MicrophoneOff from "../../assets/icon_component/MicrophoneOff";
import MicrophoneOn from "../../assets/icon_component/MicrophoneOn";
import More from "../../assets/icon_component/More";
import PeopleInCall from "../../assets/icon_component/PeopleInCall";
import ReceiveCall from "../../assets/icon_component/ReceiveCall";
import ScreenShare from "../../assets/icon_component/ScreenShare";
import VideoOff from "../../assets/icon_component/VideoOff";
import VideoOn from "../../assets/icon_component/VideoOn";
import { addLocalVideoTrack, callReceived, removeCall } from "../../store/slice/global";
import { getAvatarUrl } from "../../util/getAvatarUrl";
import SIngleUser from "./SIngleUser";

export default function MiniCall() {
    const { socket, RtcEngine, call } = useSelector((state) => state.global);
    const user = useSelector((state) => state.userInfo?.userInfo);
    const dispatch = useDispatch();
    const [micMuted, setMicMuted] = useState(false);
    const [cameraOff, setCameraOff] = useState(true);
    const [showParticipants, setShowParticipants] = useState(false);
    const [maximized, setMaximized] = useState(false);

    const selfVideoContainerRef = useRef();

    const handleReceiveCall = async () => {
        socket?.emit("JOIN_CALL", call?.data?._id);
        dispatch(callReceived(true));
    };

    function twoDigits(num) {
        return (num < 10 ? "0" : "") + num;
    }

    useEffect(() => {
        if (call?.localVideoTrack && selfVideoContainerRef.current) {
            call?.localVideoTrack.play(selfVideoContainerRef.current);
        }
    }, [call, maximized]);

    function convertSeconds(seconds) {
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds % 3600) / 60);
        let remainingSeconds = seconds % 60;

        return `${twoDigits(hours)}:${twoDigits(minutes)}:${twoDigits(remainingSeconds)}`;
    }

    const endCall = async () => {
        try {
            dispatch(removeCall());

            socket?.emit("END_CALL", call?.data?._id);

            await call?.localAudioTrack?.close();
            await RtcEngine?.leave();

            setMaximized(false);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    const handleMicMuteUnmute = async () => {
        try {
            socket?.emit("MIC_STATE_CHANGED", call?.data?._id, !micMuted);

            await call?.localAudioTrack?.setEnabled(micMuted);
            setMicMuted(!micMuted);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCameraOnOff = async () => {
        try {
            if (screenSharing) {
                alert("Stop screen sharing first.");

                return;
            }

            if (call?.localVideoTrack) {
                await call?.localVideoTrack?.setEnabled(false);
                await call?.localVideoTrack?.stop();
                await call?.localVideoTrack?.close();
                await RtcEngine?.unpublish([call?.localVideoTrack]);
                dispatch(addLocalVideoTrack(null));
            } else {
                const localVideoTrack = await AgoraRTC.createCameraVideoTrack();
                dispatch(addLocalVideoTrack(localVideoTrack));
                localVideoTrack.play(selfVideoContainerRef.current);
                await RtcEngine?.publish([localVideoTrack]);
            }

            setCameraOff(!cameraOff);

            socket?.emit("CAMERA_STATE_CHANGED", call?.data?._id, !cameraOff);
        } catch (error) {
            console.log(error);
            if (error?.code === "DEVICE_NOT_FOUND") alert("Camera not found.");
            else alert("Unknown error.");
        }
    };

    const [screenSharing, setScreenSharing] = useState(false);

    const handleShareScreen = async () => {
        try {
            if (!cameraOff) {
                alert("Stop your camera first.");

                return;
            }

            if (call?.localVideoTrack) {
                await RtcEngine?.unpublish([call?.localVideoTrack]);
            }

            const localVideoTrack = await AgoraRTC.createScreenVideoTrack();
            dispatch(addLocalVideoTrack(localVideoTrack));
            localVideoTrack.play(selfVideoContainerRef.current);
            await RtcEngine?.publish([localVideoTrack]);

            if (localVideoTrack) {
                localVideoTrack.on("track-ended", async () => {
                    await RtcEngine?.unpublish([localVideoTrack]);
                    setScreenSharing(false);

                    localVideoTrack?.stop();
                    localVideoTrack.setEnabled(false);

                    dispatch(addLocalVideoTrack(null));
                });
            }

            setScreenSharing(!screenSharing);

            if (screenSharing) {
                localVideoTrack?.stop();
                localVideoTrack.setEnabled(false);
            } else {
                localVideoTrack?.play(selfVideoContainerRef.current);
                localVideoTrack.setEnabled(true);
            }

            socket?.emit("CAMERA_STATE_CHANGED", call?.data?._id, !screenSharing);
        } catch (error) {
            console.log(error);
        }
    };

    if (maximized) {
        return (
            <div className="absolute bg-[#031124] w-full h-full z-[999999999] overflow-y-scroll flex flex-col items-center">
                <div className="bg-black/10 p-4 w-full sticky top-0">
                    <div className="flex">
                        {!Boolean(call?.data?.space?.fullName) && (
                            <Folder
                                className="w-[20px] h-[20px] mr-2"
                                style={{
                                    fill: call?.data?.space?.color,
                                }}
                            />
                        )}

                        <div className="w-full">
                            <h2 className="text-[15px] leading-[19px] font-medium text-white mr-[9px] truncate w-[100px]">
                                {call?.data?.space?.fullName || call?.data?.space?.name}
                            </h2>
                        </div>

                        {call?.received && <More color="white" className="cursor-pointer mr-2" />}

                        <Maximize color="white" className="cursor-pointer" onClick={() => setMaximized(false)} />
                    </div>
                </div>

                <div className="container p-5">
                    <div class="grid md:grid-cols-4 grid-cols-2 gap-4 ">
                        {call?.data?.participants?.map((participant, idx) => {
                            if (participant.user._id === user._id) return <></>;
                            return <SIngleUser participant={participant} key={idx} />;
                        })}
                    </div>
                </div>

                {/* Self Item */}
                <div
                    className="aspect-video bg-blue-100 rounded-2xl select-none w-[200px] absolute top-[60px] right-[60px] overflow-hidden"
                    ref={selfVideoContainerRef}
                >
                    <div className="absolute flex flex-col items-center justify-center w-full h-full">
                        <img
                            src={getAvatarUrl(user?.fullName)}
                            alt=""
                            className="w-[48px] h-[48px] rounded-full border object-cover mb-2"
                            crossOrigin="true"
                        />

                        <h3>{user?.fullName}</h3>
                    </div>

                    <div className="bottom-4 right-4 absolute z-10">{micMuted ? <MicrophoneOff /> : <MicrophoneOn />}</div>
                </div>

                {/* Controller */}
                <div className="absolute bottom-5 flex gap-4 items-center z-10 select-none">
                    <div className="bg-white rounded-full p-2 flex gap-8 px-5 items-center">
                        {cameraOff ? (
                            <VideoOff className="w-7 h-7 cursor-pointer" onClick={handleCameraOnOff} />
                        ) : (
                            <VideoOn className="w-7 h-7 cursor-pointer" onClick={handleCameraOnOff} />
                        )}

                        {micMuted ? (
                            <MicrophoneOff className="w-7 h-7 cursor-pointer" onClick={handleMicMuteUnmute} />
                        ) : (
                            <MicrophoneOn className="w-7 h-7 cursor-pointer" onClick={handleMicMuteUnmute} />
                        )}

                        {!screenSharing && <ScreenShare className="w-7 h-7 cursor-pointer" active={screenSharing} onClick={handleShareScreen} />}

                        <div>{convertSeconds(call?.time)}</div>
                    </div>

                    <CallEnd className="cursor-pointer w-10 h-10" onClick={endCall} />
                </div>
            </div>
        );
    } else {
        return (
            <Draggable>
                <div className="absolute bg-white  drop-shadow-[0_25px_25px_rgba(0,0,0,0.15)] right-5 top-5 rounded-xl z-[1000] cursor-move max-w-[400px]">
                    {/* <div ref={localVideoRef} className="w-full h-[300px]"></div> */}

                    <div className="flex p-5">
                        <div className="flex w-full items-center">
                            {Boolean(call?.data?.target === "Space") ? (
                                <Folder
                                    className="w-[20px] h-[20px] mr-2"
                                    style={{
                                        fill: call?.data?.space?.color,
                                    }}
                                />
                            ) : (
                                <img
                                    src={getAvatarUrl(call?.data?.participants.find((p) => p.user._id !== user._id)?.user.fullName)}
                                    alt=""
                                    className="w-[28px] h-[28px] rounded-full border object-cover mr-2"
                                />
                            )}

                            <div>
                                <h2 className="text-[15px] leading-[19px] font-medium text-[#424D5B] mr-[9px] truncate w-[100px]">
                                    {Boolean(call?.data?.target === "Space")
                                        ? call?.data?.space?.name
                                        : call?.data?.participants.find((p) => p.user._id !== user._id)?.user.fullName}
                                </h2>
                                <p className="font-normal text-[12px] leading-[15px] text-[#818892]">
                                    {call?.received
                                        ? convertSeconds(call?.time) === "00:00:00"
                                            ? "Ringing..."
                                            : convertSeconds(call?.time)
                                        : "Calling..."}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center self-start gap-4">
                            {call?.received && (
                                <div className="flex items-center">
                                    <PeopleInCall
                                        active={showParticipants}
                                        className="mr-1 cursor-pointer"
                                        onClick={() => setShowParticipants(!showParticipants)}
                                    />

                                    <span className="text-[#424D5B] text-[14px]">{call?.data?.participants?.length}</span>
                                </div>
                            )}

                            {call?.received && (
                                <>
                                    {micMuted ? (
                                        <MicrophoneOff onClick={handleMicMuteUnmute} className="cursor-pointer" />
                                    ) : (
                                        <MicrophoneOn onClick={handleMicMuteUnmute} className="cursor-pointer" />
                                    )}
                                </>
                            )}

                            <CallEnd className="cursor-pointer" onClick={endCall} />

                            {!call?.received && <ReceiveCall onClick={handleReceiveCall} className="cursor-pointer h-[24px]" />}

                            {call?.received && <More className="cursor-pointer" />}

                            {call?.data?.target === "Space" && call?.received && (
                                <Maximize className="cursor-pointer" onClick={() => setMaximized(true)} />
                            )}
                        </div>
                    </div>

                    {call?.data?.type === "video" && call?.received ? (
                        <div className="p-5">
                            <div className="bg-[#d9d9d933] w-full h-[170px] flex items-center justify-center rounded-2xl">
                                <p className="p-5 text-[#818892] text-center max-w-xs">
                                    You are in a group call. Please go to{" "}
                                    <span className="text-blue-500 font-semibold cursor-pointer" onClick={() => setMaximized(true)}>
                                        Full Screen
                                    </span>{" "}
                                    mode to see all the members.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex h-[50px] justify-center items-center pb-5">
                            {call.indications.map((i, idx) => (
                                <div
                                    key={idx}
                                    className={`w-[2px]  bg-blue-600 mx-[2px]`}
                                    style={{
                                        height: `${Math.round(i)}px`,
                                    }}
                                ></div>
                            ))}
                        </div>
                    )}

                    {showParticipants && (
                        <>
                            <div className="h-[1px] w-full bg-slate-200 mt-2"></div>

                            <div className="p-5 pt-2 max-h-[170px] overflow-y-scroll overflow-x-hidden">
                                <h2 className="mb-2 text-[#818892] bold">Members</h2>

                                {call?.data?.participants?.map((participant, idx) => (
                                    <div key={idx} className="flex items-center mb-2">
                                        <img
                                            src={participant?.user?.avatar || getAvatarUrl(participant?.user?.fullName)}
                                            alt=""
                                            className="w-[28px] h-[28px] rounded-full border object-cover mr-2"
                                            crossOrigin="true"
                                        />

                                        <h3 className="w-full">{participant?.user?.fullName}</h3>

                                        {participant?.mic_muted ? (
                                            <MicrophoneOff className="cursor-pointer" />
                                        ) : (
                                            <MicrophoneOn className="cursor-pointer" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </Draggable>
        );
    }
}
