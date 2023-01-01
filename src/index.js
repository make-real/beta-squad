import { BoardCardContext } from "./context/BoardCardContext";
import { UserInfoContext } from "./context/UserInfoContext";
import { StyleContext } from "./context/StyleContext";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import store from "./store";
import React from "react";
import App from "./App";
import "./style/index.css";
import "reactjs-popup/dist/index.css";
import io from "socket.io-client";
import { SocketContext } from "./context/SocketContext";
import { requestNotificationPermission } from "./util/helpers";
const root = ReactDOM.createRoot(document.getElementById("root"));

requestNotificationPermission();

// if (token) {
//     socket = io(config.BASE_URL, {
//         auth: {
//             socketAuthToken: token,
//         },
//     });

//     socket?.on("connect", () => {
//         console.log("Connected with socket server");
//         store.dispatch(initializeSocket());
//     });

//     socket?.on("NEW_SPACE_MESSAGE_RECEIVED", (msg) => {
//         console.log(msg);

//         const { space } = store.getState();

//         if (msg.to === space.selectedSpace) {
//             if (userId === msg?.sender?._id && Boolean(msg?.content?.text)) return;

//             store.dispatch(addSingleMessage(msg));
//         } else {
//             sentLocalNotification("New message received.");
//         }
//     });

//     socket?.on("NEW_REACTION_RECEIVED", (data) => {
//         store.dispatch(addReaction(data));
//     });

//     socket?.on("ON_MESSAGE_REMOVED", ({ messageId }) => {
//         store.dispatch(removeMessage(messageId));
//     });
// }

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <BoardCardContext>
                    <UserInfoContext>
                        <StyleContext>
                            <App />
                        </StyleContext>
                    </UserInfoContext>
                </BoardCardContext>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
