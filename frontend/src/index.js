/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

const mountNode = document.getElementById('root');
const root = ReactDOM.createRoot(mountNode);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
