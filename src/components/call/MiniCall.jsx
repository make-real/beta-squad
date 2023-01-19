import React, { useState } from "react";
import Draggable from "react-draggable";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ScaleLoader } from "react-spinners";
import CallEnd from "../../assets/icon_component/CallEnd";
import Folder from "../../assets/icon_component/Folder";
import MicrophoneOff from "../../assets/icon_component/MicrophoneOff";
import MicrophoneOn from "../../assets/icon_component/MicrophoneOn";
import More from "../../assets/icon_component/More";
import PeopleInCall from "../../assets/icon_component/PeopleInCall";
import ReceiveCall from "../../assets/icon_component/ReceiveCall";
import VideoOff from "../../assets/icon_component/VideoOff";
import { callReceived, removeCall } from "../../store/slice/global";
import { getAvatarUrl } from "../../util/getAvatarUrl";

export default function MiniCall() {
    const { socket, RtcEngine, call } = useSelector((state) => state.global);
    const dispatch = useDispatch();
    const [micMuted, setMicMuted] = useState(false);
    const [showParticipants, setShowParticipants] = useState(false);

    const handleReceiveCall = async () => {
        socket?.emit("JOIN_CALL", call?.data?._id);
        dispatch(callReceived(true));
    };

    function twoDigits(num) {
        return (num < 10 ? "0" : "") + num;
    }

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

    return (
        <Draggable>
            <div className="absolute bg-white  drop-shadow-[0_25px_25px_rgba(0,0,0,0.15)] right-5 top-5 rounded-xl z-[1000] cursor-move">
                <div className="flex p-5">
                    <div className="flex w-full">
                        {!Boolean(call?.data?.space?.fullName) && (
                            <Folder
                                className="w-[20px] h-[20px] mr-2"
                                style={{
                                    fill: call?.data?.space?.color,
                                }}
                            />
                        )}

                        <div>
                            <h2 className="text-[15px] leading-[19px] font-medium text-[#424D5B] mr-[9px] truncate w-[100px]">
                                {call?.data?.space?.fullName || call?.data?.space?.name}
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
                                <VideoOff className="cursor-pointer" />
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
                    </div>
                </div>

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

                {showParticipants && (
                    <>
                        <div className="h-[1px] w-full bg-slate-200 mt-2"></div>

                        <div className="p-5 pt-2 max-h-[200px] overflow-y-scroll overflow-x-hidden">
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
