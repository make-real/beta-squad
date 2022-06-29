import { Board, Calender, Chat, List, NavBar, SideBar, Timeline } from './components';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';


const App = () => {

  return (
    <main className='overflow-hidden'>

      <SideBar />

      <NavBar />

      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/kanban" element={<Board />} />
        <Route path="/list" element={<List />} />
        <Route path="/calendar" element={<Calender />} />
        <Route path="/timeline" element={<Timeline />} />
      </Routes>

    </main>
  );
};

export default App;