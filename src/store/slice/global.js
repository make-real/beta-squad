import { createSlice } from "@reduxjs/toolkit";
import AgoraRTC from "agora-rtc-sdk-ng";
import { io } from "socket.io-client";
import config from "../../config";

import ringing from "../../assets/ringing.mp3";

function pushAndRemove(array, element, maxLength) {
    // Push the new element to the array
    array.push(element);

    // Remove the oldest element from the array if necessary
    while (array.length > maxLength) {
        array.shift();
    }

    return array;
}

const initialState = {
    socket: null,
    RtcEngine: null,
    call: {
        time: 0,
        received: false,
        data: null,
        localAudioTrack: null,
        indications: [],
    },
};

let ringingRef;

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        initializeSocket: (state) => {
            if (state.socket === null) {
                state.socket = io(config.BASE_URL, {
                    auth: {
                        socketAuthToken: JSON.parse(localStorage.getItem("jwt")),
                    },
                });

                state.socket.on("connect_error", (err) => {
                    console.log(err);
                });
            }
        },
        initializeRtcEngine: (state) => {
            if (state.RtcEngine === null) {
                state.RtcEngine = AgoraRTC.createClient({
                    mode: "rtc",
                    codec: "vp8",
                });
                state.RtcEngine?.enableAudioVolumeIndicator();
            }
        },
        addCall: (state, action) => {
            state.call.data = action.payload;

            if (!state.call.received) {
                ringingRef = new Audio(ringing);
                ringingRef.loop = true;
                ringingRef.play();
            } else {
                ringingRef?.pause();
            }
        },
        removeCall: (state, action) => {
            state.call.data = action.payload;
            state.call.time = 0;
            state.call.received = false;
            ringingRef?.pause();
        },
        callReceived: (state, action) => {
            if (action.payload) {
                state.call.received = true;
                state.call.time = 0;
                ringingRef?.pause();
            } else {
                state.call.data = null;
                state.call.received = false;
                state.call.time = 0;
                ringingRef?.pause();
            }
        },
        addLocalAudioTrack: (state, action) => {
            state.call.localAudioTrack = action.payload;
        },
        incrementCallTime: (state) => {
            state.call.time = state.call.time + 1;
        },
        addIndicationData: (state, action) => {
            state.call.indications = pushAndRemove(state.call.indications, action.payload, 42);
        },
    },
});

export const { initializeSocket, initializeRtcEngine, addCall, removeCall, callReceived, addLocalAudioTrack, incrementCallTime, addIndicationData } =
    globalSlice.actions;

export default globalSlice.reducer;