import { createContext, useContext, useState } from "react";

const Context = createContext();

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

export const useCommingSoonContext = () => useContext(Context);
