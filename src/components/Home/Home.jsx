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
 

  const params = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [shouldChangeRoute, setShouldChangeRoute] = useState(false);

  const [tmpData, setTmpData] = useState(null);

  useEffect(() => {
    const getWorkSpaceData = async () => {
      setLoading(true);
      try {
        const { data } = await get_workspace_data();
        setShouldChangeRoute(data.workspaces.length === 0);
        if (data.workspaces.length !== 0) {
          setTmpData(data.workspaces[0]);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getWorkSpaceData();
  }, []);

  useEffect(() => {
    if (params.workspace_id) return;
    if (loading) return;
    
    if (shouldChangeRoute) {
      navigate("/settings/manage-workspace");
    } else {
      localStorage.setItem("hasWorkspace", "yes");
      localStorage.setItem("stepFinished", true);
      navigate(`/projects/${tmpData._id}`);
    }
  }, [
    loading,
    navigate,
    params?.workspace_id,
    shouldChangeRoute,
    tmpData?._id,
  ]);

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
