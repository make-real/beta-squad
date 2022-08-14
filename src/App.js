import {
  Board, Calender, Chat, List, Timeline, Register, Login, Layout, Profile, DeveloperConsole,
  ManageWorkspace, UserSettingLayout, Preferences, PageNotFound,
} from "./components";
import { Routes, Route, Navigate } from "react-router-dom";
import { fetchUserToken } from './util/fetchUserToken';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';




const ProtectedRoute = ({ children }) => {

  const jwt = fetchUserToken() || false;

  // if no token present... redirect user into login page...
  if (!jwt) return <Navigate to="/" />;

  return children;
};



const App = () => {

  const selectedSpaceId = useSelector(state => state.space.selectedSpace);


  return (
    <main className="overflow-hidden">
      <Routes>

        <Route path="/" />
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />


        <Route path="settings" element={<ProtectedRoute> <UserSettingLayout /> </ProtectedRoute>}>
          <Route index element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
          <Route path="manage-workspace" element={<ProtectedRoute> <ManageWorkspace /> </ProtectedRoute>} />
          <Route path="developer" element={<ProtectedRoute> <DeveloperConsole /> </ProtectedRoute>} />
          <Route path="preferences" element={<ProtectedRoute> <Preferences /> </ProtectedRoute>} />
        </Route>


        <Route path="projects" element={<ProtectedRoute> <Layout /> </ProtectedRoute>}>
          <Route index element={<ProtectedRoute> <Chat /> </ProtectedRoute>} />
          <Route path="kanban" element={<ProtectedRoute> <Board selectedSpaceId={selectedSpaceId} /> </ProtectedRoute>} />
          <Route path="list" element={<ProtectedRoute> <List /> </ProtectedRoute>} />
          <Route path="calendar" element={<ProtectedRoute> <Calender /> </ProtectedRoute>} />
          <Route path="timeline" element={<ProtectedRoute> <Timeline /> </ProtectedRoute>} />
        </Route>


        <Route path="*" element={<PageNotFound />} />

      </Routes>

      {/* theme="dark" */}
      <ToastContainer theme="colored" style={{ fontSize: "18px" }} />
    </main>
  );
};

export default App;
