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
import { requestNotificationPermission } from "./util/helpers";
const root = ReactDOM.createRoot(document.getElementById("root"));

requestNotificationPermission();

const channel = new BroadcastChannel("tab");

channel.postMessage("another-tab");
// note that listener is added after posting the message

channel.addEventListener("message", (msg) => {
    if (msg.data === "another-tab") {
        document.body.innerHTML = `<div class="container py-4 flex items-center justify-center self-center"><div class="bg-red-500 text-white p-4 rounded-lg text-center">
        <p class="font-medium">Sorry, Multiple tabs are not allowed.</p>
      </div></div>
      `;
    }
});

root.render(
    // <React.StrictMode>
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
    // </React.StrictMode>
);
