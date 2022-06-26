import { createContext, useContext, useState } from "react"

const Style = createContext();

export const StyleContext = ({ children }) => {

    const [margin, setMargin] = useState(false);

    return (
        <Style.Provider value={{ margin, setMargin }}>
            {
                children
            }
        </Style.Provider>
    )
}

export const useStyleContext = () => useContext(Style);