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

const root = ReactDOM.createRoot(document.getElementById("root"));

// Init Sockeßt connection
const token = JSON.parse(localStorage.getItem("jwt"));

let socket;

if (token) {
  socket = io("https://space-api.makereal.click", {
    auth: {
      socketAuthToken: token,
    },
  });
}

root.render(
  <React.StrictMode>
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
  </React.StrictMode>
);
