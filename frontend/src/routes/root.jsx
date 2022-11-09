import { Navbar, Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

const Root = () => (
  <div className="d-flex flex-column h-100">
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand>SUPER Chat</Navbar.Brand>
      </Container>
    </Navbar>
    <Outlet />
  </div>
);

export default Root;
