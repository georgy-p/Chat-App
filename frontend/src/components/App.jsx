import React, { useState, useMemo } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import Layout from '../routes/layout.jsx';
// import ErrorPage from '../routes/error-page.jsx';
import LoginPage from './LoginPage.jsx';
import AuthContext from '../contexts/index.jsx';
import useAuth from '../hooks/index.jsx';
import PrivatePage from '../routes/private.jsx';
// import useAuth from '../hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const logFuncs = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);

  return (
    <AuthContext.Provider value={logFuncs}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <AuthProvider>
    <Routes element={<Layout />}>
      <Route
        path="/"
        element={(
          <PrivateRoute>
            <PrivatePage />
          </PrivateRoute>
          )}
      />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </AuthProvider>
);

export default App;
