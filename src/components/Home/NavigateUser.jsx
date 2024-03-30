import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get_workspace_data } from "../../api/workSpace";
import LoadingScreen from "../Loading/LoadingScreen";
import Cookies from "js-cookie";
import { each } from "lodash";

const NavigateUser = () => {
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
    if (loading) return;
    if (shouldChangeRoute) {
      navigate("/settings/manage-workspace");
    } else {
      const lastVisitedProjects = localStorage.getItem("lastVisitedProjects");
      const lastVisitedWorkspace = localStorage.getItem("lastVisitedWorkspace");
      if (lastVisitedProjects) {
        if (lastVisitedWorkspace) {
            console.log(  `/projects/${lastVisitedProjects}/squad/${lastVisitedWorkspace}`)
          navigate(
            `/projects/${lastVisitedProjects}/squad/${lastVisitedWorkspace}`
          );
        } else {
            console.log(`/projects/${lastVisitedProjects}`)
          navigate(`/projects/${lastVisitedProjects}`);
        }
      } else {
        navigate("/projects");
      }
      // navigate("/projects")
    }
  }, [shouldChangeRoute, loading, navigate]);

  if (loading) return <LoadingScreen />;
};

export default NavigateUser;
