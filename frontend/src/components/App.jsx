import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
} from 'react-router-dom';
import ErrorPage from '../routes/error-page.jsx';
import LoginPage from './Login.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: null,
    errorElement: <ErrorPage />,
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
]);

const App = () => (
  <RouterProvider router={router} />
);

export default App;
