import { Nav, Navbar, Container } from "react-bootstrap";
import LogoutButton from "./LogoutButton";

const NavBar: React.FC = () => {

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container className="w-100">
        <Navbar.Brand href="/" className="fw-bold">Task Away!</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end m-auto">
            <Nav >
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link href="/profile">|  Profile </Nav.Link>
                <LogoutButton />
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;