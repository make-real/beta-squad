import {
  Board,
  Calender,
  Chat,
  GIF,
  List,
  NavBar,
  Timeline,
} from "./components";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <main>
      <NavBar />

      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/kanban" element={<Board />} />
        <Route path="/list" element={<List />} />
        <Route path="/calendar" element={<Calender />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/gif" element={<GIF />} />
      </Routes>
    </main>
  );
};

export default App;
