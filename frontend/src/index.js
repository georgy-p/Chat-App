/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider as RollbarProvider } from '@rollbar/react';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n.js';
import store from './slices/index.js';

const mountNode = document.getElementById('chat');
const root = ReactDOM.createRoot(mountNode);

const rollbarConfig = {
  accessToken: 'POST_CLIENT_ITEM_ACCESS_TOKEN',
  environment: 'production',
};

root.render(
  <RollbarProvider config={rollbarConfig}>
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
  </RollbarProvider>,
);
