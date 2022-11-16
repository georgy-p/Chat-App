import React, { useState, useMemo } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import Layout from '../routes/layout.jsx';
import ErrorPage from '../routes/error-page.jsx';
import LoginPage from './LoginPage.jsx';
import AuthContext from '../contexts/index.jsx';
import useAuth from '../hooks/index.jsx';
import ChatPage from './ChatPage.jsx';

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
    <Routes>
      <Route element={<Layout />} errorElement={<ErrorPage />}>
        <Route
          path="/"
          element={(
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          )}
        />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  </AuthProvider>
);

export default App;
