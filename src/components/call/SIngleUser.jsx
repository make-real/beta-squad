import React, { useEffect } from "react";
import { useRef } from "react";
import MicrophoneOff from "../../assets/icon_component/MicrophoneOff";
import MicrophoneOn from "../../assets/icon_component/MicrophoneOn";
import { getAvatarUrl } from "../../util/getAvatarUrl";

export default function SIngleUser({ participant }) {
    const videoRef = useRef();

    useEffect(() => {
        if (participant.video) {
            participant.video.play(videoRef.current);
        }
    }, [participant]);

    return (
        <div className="w-full aspect-video bg-blue-100 rounded-2xl relative select-none overflow-hidden" ref={videoRef}>
            <div className="flex flex-col items-center justify-center w-full h-full absolute">
                <img src={getAvatarUrl(participant?.user?.fullName)} alt="" className="w-[68px] h-[68px] rounded-full border object-cover mb-2" crossOrigin="true" />

                <h3>{participant?.user?.fullName}</h3>
            </div>

            <div className="bottom-4 right-4 absolute z-10">{participant?.mic_muted ? <MicrophoneOff /> : <MicrophoneOn />}</div>
        </div>
    );
}
