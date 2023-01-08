import { createSlice } from "@reduxjs/toolkit";
import AgoraRTC from "agora-rtc-sdk-ng";
import { io } from "socket.io-client";
import config from "../../config";

const initialState = {
    socket: null,
    RtcEngine: null,
};

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
            }
        },
    },
});

export const { initializeSocket, initializeRtcEngine } = globalSlice.actions;

export default globalSlice.reducer;
