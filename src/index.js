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
import { addReaction, addSingleMessage, removeMessage } from "./store/slice/message";
import { requestNotificationPermission, sentLocalNotification } from "./util/helpers";
import config from "./config";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Init Sockeßt connection
const token = JSON.parse(localStorage.getItem("jwt"));

requestNotificationPermission();

let socket;

if (token) {
  socket = io(config.BASE_URL, {
    auth: {
      socketAuthToken: token,
    },
  });

  socket?.on("NEW_SPACE_MESSAGE_RECEIVED", (msg) => {
    const { space } = store.getState();

    if (msg.to === space.selectedSpace) {
      store.dispatch(addSingleMessage(msg));
    } else {
      sentLocalNotification("New message recived.");
    }
  });

  socket?.on("ON_MESSAGE_REMOVED", (msg) => {
    console.log(msg);
  });

  socket?.on("NEW_REACTION_RECEIVED", (data) => {
    store.dispatch(addReaction(data));
  });

  socket?.on("ON_MESSAGE_REMOVED", ({ messageId }) => {
    store.dispatch(removeMessage(messageId));
  });
}

root.render(
  // <React.StrictMode>
  <SocketContext socket={socket}>
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
  </SocketContext>
  // </React.StrictMode>
);
