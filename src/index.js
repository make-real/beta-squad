import { UserInfoContext } from './context/UserInfoContext';
import { StyleContext } from './context/StyleContext';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import './style/index.css';
import { BoardCardContext } from './context/BoardCardContext';


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <BrowserRouter>

      <BoardCardContext>
        <UserInfoContext>
          <StyleContext>
            <App />
          </StyleContext>
        </UserInfoContext>
      </BoardCardContext>

    </BrowserRouter>
  </React.StrictMode>
);