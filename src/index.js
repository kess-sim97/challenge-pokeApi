import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Context from './context/pokeContext';

ReactDOM.render(
  <Context.Provider>
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
  </Context.Provider>,
  document.getElementById('root')
);


