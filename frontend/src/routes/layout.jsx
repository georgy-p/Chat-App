import { Navbar, Container, Button } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../hooks/useAuth.jsx';

const Layout = () => {
  const auth = useAuth();

  const handleClick = () => auth.logOut();

  return (
    <div className="h-100 bg-light">
      <div className="d-flex flex-column h-100">
        <Navbar bg="light" expand="lg" className="shadow-sm">
          <Container>
            <Link className="navbar-brand" to="/">
              Hexlet Chat
            </Link>
            {auth.loggedIn ? <Button onClick={handleClick}>Выйти</Button> : null}
          </Container>
        </Navbar>
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Layout;
