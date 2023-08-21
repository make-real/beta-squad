import { createContext, useContext, useState } from "react";

const Context = createContext();
const AppState = createContext();

export const CommingSoonContext = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Context.Provider
      value={{
        showModal,
        setShowModal,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const AppStateContext = ({ children }) => {
  const [showChat, setShowChat] = useState(true);

  return (
    <AppState.Provider
      value={{
        showChat,
        setShowChat,
      }}
    >
      {children}
    </AppState.Provider>
  );
};

export const useCommingSoonContext = () => useContext(Context);
export const useAppStateContext = () => useContext(AppState);
