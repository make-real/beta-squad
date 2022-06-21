import { Board, Calender, Chat, List, NavBar, Timeline } from './components';
import { Routes, Route } from 'react-router-dom';


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

      </Routes>
    </main>
  )
}

export default App