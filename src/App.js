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
  useLocation,
} from "react-router-dom";
import { fetchUserToken } from "./util/fetchUserToken";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
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
import {
  setSelectedSpaceObject,
  setSelectedSpaceId,
} from "./store/slice/space";
import NavigateUser from "./components/Home/NavigateUser";
import SingleScreen from "./components/Home/SingleScreen";
import Welcome from "./components/LoginRegistration/Welcome";

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
  }, [dispatch, params.workspace_id]);

  useEffect(() => {
    dispatch(setSelectedWorkSpaceId(params.workspace_id));
  }, [workspaces, params, dispatch]);

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
    dispatch(setSelectedWorkSpaceId(params.workspace_id));
  }, [params, dispatch, allSpaces]);

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

  // const location = useLocation();

  // // When the component mounts, check if there's a last route in localStorage
  // useEffect(() => {
  //   const lastRouteFromStorage = localStorage.getItem('lastRoute');
  //   if (lastRouteFromStorage) {
  //     window.location.href = lastRouteFromStorage;
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('lastRoute', location.pathname);
  // }, [location.pathname]);





  const selectedSpaceId = useSelector((state) => state.space.selectedSpace);
  const currentWorkspace = useSelector(
    (state) => state.workspace.currentWorkspace
  );
  const selectedSpaceObj = useSelector((state) => state.space.selectedSpaceObj);
  


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
          path="welcomeuser"
          element={
            <AuthRoute>
              <Welcome />
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
                    <SquadScreen
                      currentWorkspace={currentWorkspace}
                      selectedSpace={selectedSpaceObj}
                    />
                  </SquadAuth>
                </ProtectedRoute>
              }
            />
            
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
                <SingleScreen />
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
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {/* theme="dark" */}
      <ToastContainer theme="colored" style={{ fontSize: "18px" }} />
    </main>
  );
};

export default App;
