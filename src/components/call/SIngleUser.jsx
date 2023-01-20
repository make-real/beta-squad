import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import MicrophoneOff from "../../assets/icon_component/MicrophoneOff";
import MicrophoneOn from "../../assets/icon_component/MicrophoneOn";
import { getAvatarUrl } from "../../util/getAvatarUrl";
import { BsFillPinAngleFill } from "react-icons/bs";
export default function SIngleUser({ participant }) {
    const videoRef = useRef();

    const [pined, setPined] = useState(false);

    useEffect(() => {
        if (participant.video) {
            participant.video.play(videoRef.current);
        }
    }, [participant]);

    return (
        <div
            className="group w-full aspect-video bg-blue-100 rounded-2xl relative select-none overflow-hidden"
            ref={videoRef}
            style={
                pined
                    ? {
                          position: "absolute",
                          width: "80%",
                          zIndex: 1,
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                      }
                    : {}
            }
        >
            <div className="flex flex-col items-center justify-center w-full h-full absolute">
                <img
                    src={getAvatarUrl(participant?.user?.fullName)}
                    alt=""
                    className="w-[68px] h-[68px] rounded-full border object-cover mb-2"
                    crossOrigin="true"
                />

                <h3>{participant?.user?.fullName}</h3>
            </div>
            <div className="bottom-4 right-4 absolute z-10">{participant?.mic_muted ? <MicrophoneOff /> : <MicrophoneOn />}</div>
            <BsFillPinAngleFill
                className="invisible group-hover:visible cursor-pointer absolute top-4 left-4 z-10"
                color="white"
                onClick={() => setPined(!pined)}
            />
        </div>
    );
}
