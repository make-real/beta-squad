import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get_workspace_data } from "../../api/workSpace";
import LoadingScreen from "../Loading/LoadingScreen";
import { io } from "socket.io-client";
import config from "../../config";

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
    const socket = io(config.BASE_URL, {
      auth: {
        socketAuthToken: JSON.parse(localStorage.getItem("jwt")),
      },
    });
    socket.on("NEW_NOTIFICATION_RECEIVED", (noti) => {
      console.log("Socket is connected");
      console.log(noti);
    });
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
          navigate(
            `/projects/${lastVisitedProjects}/squad/${lastVisitedWorkspace}`
          );
        } else {
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
