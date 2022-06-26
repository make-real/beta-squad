import { StyleContext } from './context/StyleContext';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import './style/index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StyleContext>
        <App />
      </StyleContext>
    </BrowserRouter>
  </React.StrictMode>
);