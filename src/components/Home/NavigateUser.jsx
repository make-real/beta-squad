import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get_workspace_data } from "../../api/workSpace";
import LoadingScreen from "../Loading/LoadingScreen";

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
            navigate("/projects");
        }
    }, [shouldChangeRoute, loading, navigate]);

    if (loading) return <LoadingScreen />;
};

export default NavigateUser;
