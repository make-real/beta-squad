import {
    Board,
    // Calender,
    Chat,
    // Timeline,
    Register,
    Login,
    Layout,
    Profile,
    DeveloperConsole,
    ManageWorkspace,
    UserSettingLayout,
    Preferences,
    PageNotFound,
    CardAsList,
} from "./components";
import { Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom";
import { fetchUserToken } from "./util/fetchUserToken";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import WorkspaceSettings from "./components/UserSettings/WorkspaceSettings";
import Tags from "./components/UserSettings/Tags";
import "react-toastify/dist/ReactToastify.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import SingleChat from "./components/Chat/Single/Chat";
import GroupChat from "./components/Chat/Group/Chat";
import TopNav from "./components/Navs/TopNavbar";
import Home from "./components/Home/Home";
import ManageWorkspaceScreen from "./components/ManageWorkspace/ManageWorkspace";
import ProfileScreen from "./components/Profile/Profile";
import CardDetails from "./components/Board/CardDetails";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addWorkSpace, setSelectedWorkSpaceId } from "./store/slice/workspace";
import { get_space_data, get_workspace_data } from "./api/workSpace";
import { addSpace } from "./store/slice/space";
import SquadScreen from "./components/Home/SquadScreen";
import { setSelectedSpaceObject, setSelectedSpaceId } from "./store/slice/space";
import { initFullSidebar } from "./store/slice/screen";
import NavigateUser from "./components/Home/NavigateUser";
import {
    addCall,
    addIndicationData,
    addLocalAudioTrack,
    callReceived,
    incrementCallTime,
    initializeRtcEngine,
    initializeSocket,
} from "./store/slice/global";
import MiniCall from "./components/call/MiniCall";
import AgoraRTC from "agora-rtc-sdk-ng";

const ProtectedRoute = ({ children }) => {
    const jwt = fetchUserToken() || false;
    if (!jwt) return <Navigate to="/" />;
    return children;
};

const AuthRoute = ({ children }) => {
    const jwt = fetchUserToken() || false;
    if (jwt) return <Navigate to="/home" />;
    return (
        <>
            <TopNav />
            {children}
        </>
    );
};

// const ProjectIdRoute = ({ children }) => {
//     const currentWorkspace = useSelector(
//         (state) => state.workspace.currentWorkspace
//     );
//     const dispatch = useDispatch();
//     if (!currentWorkspace) return children;
//     return <Navigate to={`/projects/${currentWorkspace._id}`} />;
// };

const ProjectRoute = ({ children }) => {
    const workspaces = useSelector((state) => state.workspace.workspaces);
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSelectedWorkSpaceId(params.workspace_id));
    }, [dispatch, params]);

    useEffect(() => {
        const getSpaceData = async () => {
            try {
                const { data } = await get_space_data(params.workspace_id);
                dispatch(addSpace(data.spaces));
            } catch (error) {
                console.log("space selection ==> ", error);
            }
        };
        getSpaceData();
    }, [dispatch, params]);

    useEffect(() => {
        dispatch(setSelectedWorkSpaceId(params.workspace_id));
    }, [workspaces, params]);

    return children;
};

const SquadAuth = ({ children }) => {
    const dispatch = useDispatch();
    const params = useParams();
    const allSpaces = useSelector((state) => state.space.allSpaces);

    useEffect(() => {
        dispatch(setSelectedSpaceId(params.squadId));
        dispatch(setSelectedSpaceObject(allSpaces.find((space) => space._id === params.squadId)));
        dispatch(setSelectedWorkSpaceId(params.workspace_id));
    }, [params, dispatch]);

    return children;
};

const CardRoute = ({ children }) => {
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSelectedWorkSpaceId(params.workspace_id));
        dispatch(setSelectedSpaceId(params.squadId));
    }, []);

    return children;
};

const App = () => {
    const indRef = useRef();

    const selectedSpaceId = useSelector((state) => state.space.selectedSpace);
    const currentWorkspace = useSelector((state) => state.workspace.currentWorkspace);
    const selectedSpaceObj = useSelector((state) => state.space.selectedSpaceObj);
    const { socket, RtcEngine, call } = useSelector((state) => state.global);
    const uid = useSelector((state) => state.userInfo?.userInfo?.uid);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeSocket());
        dispatch(initializeRtcEngine());
        dispatch(initFullSidebar());
    }, []);

    useEffect(() => {
        socket?.on("ON_CALL", (call) => {
            console.log({ call });
            dispatch(addCall(call));
        });

        socket?.on("ON_JOIN_CALL", async (call, token) => {
            dispatch(callReceived(true));
            await RtcEngine?.join("b4304444d7834aca8f8036e813705e51", call?.channelId, token, uid);

            const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();

            dispatch(addLocalAudioTrack(localAudioTrack));

            await RtcEngine?.publish([localAudioTrack]);
        });

        socket?.on("ON_CALL_END", async (c) => {
            try {
                console.log("ON_CALL_END");
                dispatch(callReceived(false));

                await call?.localAudioTrack?.close();
                await RtcEngine?.leave();

                console.log("ON_CALL_END 2");
            } catch (error) {
                console.log(error);
            }
        });

        RtcEngine?.on("user-published", async (user, mediaType) => {
            console.log("user-published");

            // Subscribe to the remote user when the SDK triggers the "user-published" event.
            await RtcEngine?.subscribe(user, mediaType);
            console.log("subscribe success");
            // Subscribe and play the remote video in the container If the remote user publishes a video track.
            if (mediaType == "video") {
                const remoteAudioTrack = user.audioTrack;
                // const remoteVideoTrack = user.videoTrack;
                // const remoteUserId = user.uid.toString();

                remoteAudioTrack.play();
            }
            // Subscribe and play the remote audio track If the remote user publishes the audio track only.
            if (mediaType == "audio") {
                const remoteAudioTrack = user.audioTrack;
                // const remoteUserId = user.uid.toString();

                remoteAudioTrack.play();
            }

            // Listen for the "user-unpublished" event.
            RtcEngine?.on("user-unpublished", (user) => {
                console.log(user.uid + "has left the channel");
            });
        });

        RtcEngine?.enableAudioVolumeIndicator();

        RtcEngine?.on("volume-indicator", (volumes) => {
            volumes.forEach((volume) => {
                console.log(`UID ${volume.uid} Level ${volume.level}`);
                indRef.current = Math.floor(volume.level / 2);
            });
        });

        let interval = setInterval(() => {
            dispatch(addIndicationData(indRef.current));
        }, 20);

        return () => {
            RtcEngine?.off("volume-indicator");
            socket?.off("ON_CALL");
            socket?.off("ON_CALL_END");
            socket?.off("ON_JOIN_CALL");

            clearInterval(interval);
        };
    }, [socket, uid, RtcEngine, call]);

    useEffect(() => {
        let interval;

        if (call?.received) interval = setInterval(() => dispatch(incrementCallTime()), 1000);

        if (!call?.received) clearInterval(interval);

        return () => {
            clearInterval(interval);
        };
    }, [call?.received]);

    return (
        <main className="overflow-hidden">
            {call?.data && <MiniCall />}

            <Routes>
                <Route path="/" />
                <Route
                    index
                    element={
                        <AuthRoute>
                            <Login />
                        </AuthRoute>
                    }
                />
                <Route
                    path="register"
                    element={
                        <AuthRoute>
                            <Register />
                        </AuthRoute>
                    }
                />

                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <NavigateUser />
                        </ProtectedRoute>
                    }
                />

                {/* <Route
                    path="settings"
                    element={
                        <ProtectedRoute>
                            <UserSettingLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        index
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="manage-workspace"
                        element={
                            <ProtectedRoute>
                                <ManageWorkspace />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="developer"
                        element={
                            <ProtectedRoute>
                                <DeveloperConsole />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="preferences"
                        element={
                            <ProtectedRoute>
                                <Preferences />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="workspace-settings"
                        element={
                            <ProtectedRoute>
                                <WorkspaceSettings />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="tags"
                        element={
                            <ProtectedRoute>
                                <Tags />
                            </ProtectedRoute>
                        }
                    />
                </Route> */}

                <Route
                    path="settings"
                    element={
                        <ProtectedRoute>
                            <Layout selectedSpaceId={selectedSpaceId} />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        path="manage-workspace"
                        element={
                            <ProtectedRoute>
                                <ManageWorkspaceScreen />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="profile"
                        element={
                            <ProtectedRoute>
                                <ProfileScreen />
                            </ProtectedRoute>
                        }
                    />
                </Route>

                {/* <Route
                    path="projects"
                    element={
                        <ProtectedRoute>
                            <Layout selectedSpaceId={selectedSpaceId} />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        index
                        element={
                            <ProtectedRoute>
                                <Chat />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="kanban"
                        element={
                            <ProtectedRoute>
                                <Board selectedSpaceId={selectedSpaceId} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="board/:id"
                        element={
                            <ProtectedRoute>
                                <CardDetails />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="list"
                        element={
                            <ProtectedRoute>
                                <CardAsList selectedSpaceId={selectedSpaceId} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="chat/:id"
                        element={
                            <ProtectedRoute>
                                <GroupChat />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="single-chat/:participantID"
                        exact
                        element={
                            <ProtectedRoute>
                                <SingleChat />
                            </ProtectedRoute>
                        }
                    />
                </Route> */}
                <Route
                    path="projects"
                    element={
                        <ProtectedRoute>
                            <Layout selectedSpaceId={selectedSpaceId} />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        index
                        element={
                            <ProtectedRoute>
                                {/* <ProjectIdRoute> */}
                                <Home />
                                {/* </ProjectIdRoute> */}
                            </ProtectedRoute>
                        }
                    />

                    <Route path=":workspace_id/squad/:squadId">
                        <Route
                            index
                            element={
                                <ProtectedRoute>
                                    <SquadAuth>
                                        <SquadScreen currentWorkspace={currentWorkspace} selectedSpace={selectedSpaceObj} />
                                    </SquadAuth>
                                </ProtectedRoute>
                            }
                        />
                        {/* <Route
                            path="board/:id"
                            element={
                                <ProtectedRoute>
                                    <CardDetails />
                                </ProtectedRoute>
                            }
                        /> */}
                    </Route>

                    <Route
                        path=":workspace_id"
                        element={
                            <ProtectedRoute>
                                <ProjectRoute>
                                    <Home />
                                </ProjectRoute>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path=":workspace_id/chat/:participantID"
                        element={
                            <ProtectedRoute>
                                <SingleChat />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="kanban"
                        element={
                            <ProtectedRoute>
                                <Board selectedSpaceId={selectedSpaceId} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path=":workspace_id/squad/:squadId/board/:id"
                        element={
                            <ProtectedRoute>
                                <CardRoute>
                                    <CardDetails />
                                </CardRoute>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="list"
                        element={
                            <ProtectedRoute>
                                <CardAsList selectedSpaceId={selectedSpaceId} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/projects/chats"
                        element={
                            <ProtectedRoute>
                                <Chat />
                            </ProtectedRoute>
                        }
                    />
                    {/* <Route
                        path="single-chat/:participantID"
                        exact
                        element={
                            <ProtectedRoute>
                                <SingleChat />
                            </ProtectedRoute>
                        }
                    /> */}
                    {/* <Route path="calendar" element={<ProtectedRoute> <Calender /> </ProtectedRoute>} />
          <Route path="timeline" element={<ProtectedRoute> <Timeline /> </ProtectedRoute>} /> */}
                </Route>

                <Route path="*" element={<PageNotFound />} />
            </Routes>

            {/* theme="dark" */}
            <ToastContainer theme="colored" style={{ fontSize: "18px" }} />
        </main>
    );
};

export default App;
