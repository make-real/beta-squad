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
import {
    Routes,
    Route,
    Navigate,
    useParams,
    useNavigate,
} from "react-router-dom";
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
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addWorkSpace, setSelectedWorkSpaceId } from "./store/slice/workspace";
import { get_space_data, get_workspace_data } from "./api/workSpace";
import { addSpace } from "./store/slice/space";
import SquadScreen from "./components/Home/SquadScreen";
import {
    setSelectedSpaceObject,
    setSelectedSpaceId,
} from "./store/slice/space";
import { initFullSidebar } from "./store/slice/screen";
import NavigateUser from "./components/Home/NavigateUser";

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
        dispatch(setSelectedWorkSpaceId(params.id));
    }, [dispatch, params]);

    useEffect(() => {
        const getSpaceData = async () => {
            try {
                const { data } = await get_space_data(params.id);
                dispatch(addSpace(data.spaces));
            } catch (error) {
                console.log("space selection ==> ", error);
            }
        };
        getSpaceData();
    }, [dispatch, params]);

    useEffect(() => {
        dispatch(setSelectedWorkSpaceId(params.id));
    }, [workspaces, params]);

    return children;
};

const SquadAuth = ({ children }) => {
    const dispatch = useDispatch();
    const params = useParams();
    const allSpaces = useSelector((state) => state.space.allSpaces);

    useEffect(() => {
        dispatch(setSelectedSpaceId(params.squadId));
        dispatch(
            setSelectedSpaceObject(
                allSpaces.find((space) => space._id === params.squadId)
            )
        );
        dispatch(setSelectedWorkSpaceId(params.id));
    }, [params, dispatch]);

    return children;
};

const App = () => {
    const selectedSpaceId = useSelector((state) => state.space.selectedSpace);
    const currentWorkspace = useSelector(
        (state) => state.workspace.currentWorkspace
    );
    const selectedSpaceObj = useSelector(
        (state) => state.space.selectedSpaceObj
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initFullSidebar());
    }, []);

    return (
        <main className="overflow-hidden">
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

                    <Route path=":id/squad/:squadId">
                        <Route
                            index
                            element={
                                <ProtectedRoute>
                                    <SquadAuth>
                                        <SquadScreen
                                            currentWorkspace={currentWorkspace}
                                            selectedSpace={selectedSpaceObj}
                                        />
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
                        path=":id"
                        element={
                            <ProtectedRoute>
                                <ProjectRoute>
                                    <Home />
                                </ProjectRoute>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path=":id/chat/:participantID"
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
