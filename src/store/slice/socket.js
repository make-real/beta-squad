import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import config from "../../config";

const initialState = {
    socket: null,
};

export const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        initializeSocket: (state) => {
            console.log("Initializinfg socket");

            if (state.socket === null) {
                state.socket = io(config.BASE_URL, {
                    auth: {
                        socketAuthToken: JSON.parse(localStorage.getItem("jwt")),
                    },
                });
            }
        },
    },
});

export const { initializeSocket } = socketSlice.actions;

export default socketSlice.reducer;
