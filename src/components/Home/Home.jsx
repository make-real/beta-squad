import React from "react";
import SearchIcon from "../../assets/search.svg";
import GridIcon from "../../assets/icon_component/Grid";
import RowVerticalIcon from "../../assets/icon_component/RowVertical";
import { useState } from "react";
import Projects from "./Projects/Projects";
import SquadMembers from "./SquadMembers/SquadMembers";
import { useSelector } from "react-redux";
import BackArrowIcon from "../../assets/back_arrow.svg";
import { useDispatch } from "react-redux";
import {
    setSelectedSpaceId,
    setSelectedSpaceObject,
} from "../../store/slice/space";
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
