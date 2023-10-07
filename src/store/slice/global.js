import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import config from "../../config";


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
    },
});

export const { initializeSocket } = globalSlice.actions;

export default globalSlice.reducer;
