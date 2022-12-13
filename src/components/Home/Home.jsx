import React from "react";
import { useSelector } from "react-redux";
import WorkspaceScreen from "./WorkspaceScreen";
import SquadScreen from "./SquadScreen";

const Home = () => {
    const currentWorkspace = useSelector(
        (state) => state.workspace.currentWorkspace
    );

    const selectedSpaceObj = useSelector(
        (state) => state.space.selectedSpaceObj
    );

    const selectedSpaceId = useSelector((state) => state.space.selectedSpace);

    return currentWorkspace && selectedSpaceId ? (
        <SquadScreen
            selectedSpace={selectedSpaceObj}
            currentWorkspace={currentWorkspace}
        />
    ) : (
        <WorkspaceScreen currentWorkspace={currentWorkspace} />
    );
};

export default Home;
