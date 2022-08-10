import { BoardCardContext } from "./context/BoardCardContext";
import { WorkSpaceContext } from "./context/WorkSpaceContext";
import { UserInfoContext } from "./context/UserInfoContext";
import { StyleContext } from "./context/StyleContext";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import "./style/index.css";
import store from "./store";
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <WorkSpaceContext>
          <BoardCardContext>
            <UserInfoContext>
              <StyleContext>
                <App />
              </StyleContext>
            </UserInfoContext>
          </BoardCardContext>
        </WorkSpaceContext>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
