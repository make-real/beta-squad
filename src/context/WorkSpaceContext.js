import { createContext, useContext, useState } from "react"

const WorkSpace = createContext();

export const WorkSpaceContext = ({ children }) => {

    const [selectedWorkSpace, setSelectedWorkSpace] = useState({});

    // console.log(selectedWorkSpace);

    return (
        <WorkSpace.Provider value={
            {
                selectedWorkSpace,
                setSelectedWorkSpace,
            }
        }>
            {
                children
            }
        </WorkSpace.Provider>
    )
}

export const useWorkSpaceContext = () => useContext(WorkSpace);