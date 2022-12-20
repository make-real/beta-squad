import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import WorkspaceScreen from "./WorkspaceScreen";
import { useNavigate, useParams } from "react-router-dom";

const Home = () => {
    const currentWorkspace = useSelector(
        (state) => state.workspace.currentWorkspace
    );

    const selectedSpaceObj = useSelector(
        (state) => state.space.selectedSpaceObj
    );

    const selectedSpaceId = useSelector((state) => state.space.selectedSpace);

    const allWorkspaces = useSelector((state) => state.workspace.workspaces);

    const params = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if (!params.id) {
            if (allWorkspaces?.length === 0) {
                navigate("/settings/manage-workspace");
            }
        }
    }, [allWorkspaces]);

    // return currentWorkspace && selectedSpaceId ? (
    //     <SquadScreen
    //         selectedSpace={selectedSpaceObj}
    //         currentWorkspace={currentWorkspace}
    //     />
    // ) : (
    //     <WorkspaceScreen currentWorkspace={currentWorkspace} />
    // );
    return <WorkspaceScreen currentWorkspace={currentWorkspace} />;
};

export default Home;
