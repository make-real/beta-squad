import { BoardCardContext } from "./context/BoardCardContext";
import { UserInfoContext } from "./context/UserInfoContext";
import { StyleContext } from "./context/StyleContext";
import { CommingSoonContext, AppStateContext } from "./context/FeatureContext";
import { BrowserRouter,  useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import store from "./store";
import React from "react";
import App from "./App";
import "./style/index.css";
import "reactjs-popup/dist/index.css";
// import { requestNotificationPermission } from "./util/helpers";
import ComingSoonModal from "./components/Modals/ComingSoonModal";
const root = ReactDOM.createRoot(document.getElementById("root"));

// requestNotificationPermission();



root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <BoardCardContext>
        <UserInfoContext>
          <StyleContext>
            <CommingSoonContext>
              <AppStateContext>
                <App />
              </AppStateContext>
              <ComingSoonModal />
            </CommingSoonContext>
          </StyleContext>
        </UserInfoContext>
      </BoardCardContext>
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
