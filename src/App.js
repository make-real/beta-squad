import {
  Board,
  Calender,
  Chat,
  List,
  Timeline,
  Register,
  Login,
  Layout,
} from "./components";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/UserSettings/Profile";
import UserSettingLayout from "./components/Layout/UserSettingLayout";
import ManageWorkspace from "./components/UserSettings/ManageWorkspace";

const App = () => {

  return (
    <main className="overflow-hidden">
      <Routes>
        <Route path="/" />
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="settings" element={<UserSettingLayout />}>
          <Route index element={<Profile />} />
          <Route path="manage-workspace" element={<ManageWorkspace />} />
        </Route>

        <Route path="projects" element={<Layout />}>
          <Route index element={<Chat />} />
          <Route path="kanban" element={<Board />} />
          <Route path="list" element={<List />} />
          <Route path="calendar" element={<Calender />} />
          <Route path="timeline" element={<Timeline />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
