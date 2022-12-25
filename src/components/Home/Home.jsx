import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WorkspaceScreen from "./WorkspaceScreen";
import { useNavigate, useParams } from "react-router-dom";
import { get_workspace_data } from "../../api/workSpace";
import LoadingScreen from "../Loading/LoadingScreen";

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

    const [loading, setLoading] = useState(true);

    const [shouldChangeRoute, setShouldChangeRoute] = useState(false);

    useEffect(() => {
        const getWorkSpaceData = async () => {
            setLoading(true);
            try {
                const { data } = await get_workspace_data();
                setShouldChangeRoute(data.workspaces.length === 0);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        getWorkSpaceData();
    }, []);

    useEffect(() => {
        if (params.id) return;
        if (loading) return;
        console.log("should", shouldChangeRoute);
        if (shouldChangeRoute) {
            navigate("/settings/manage-workspace");
        } else {
            localStorage.setItem("stepFinished", true);
            navigate("/projects");
        }
    }, [shouldChangeRoute, loading]);

    // return currentWorkspace && selectedSpaceId ? (
    //     <SquadScreen
    //         selectedSpace={selectedSpaceObj}
    //         currentWorkspace={currentWorkspace}
    //     />
    // ) : (
    //     <WorkspaceScreen currentWorkspace={currentWorkspace} />
    // );
    return loading ? (
        <LoadingScreen />
    ) : (
        <WorkspaceScreen currentWorkspace={currentWorkspace} />
    );
};

export default Home;
