import {
  Board,
  Calender,
  Chat,
  List,
  NavBar,
  SideBar,
  Timeline,
  Register,
  Login,
  Layout,
} from "./components";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

const App = () => {
  return (
    <main className="overflow-hidden">
      <Routes>
        <Route path="/" />
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />

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
