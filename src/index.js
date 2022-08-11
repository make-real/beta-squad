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


const root = ReactDOM.createRoot(document.getElementById("root"));


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