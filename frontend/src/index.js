/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';

const mountNode = document.getElementById('chat');
const root = ReactDOM.createRoot(mountNode);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
