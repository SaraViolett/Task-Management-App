import { Col, Container } from "react-bootstrap";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import NavBar from "../components/NavBar";
import { useAuth0 } from "@auth0/auth0-react";

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      {isAuthenticated && <NavBar/>}
      <Container fluid className="d-flex flex-column justify-content-center align-items-center p-5">
        <Col className="text-center">
          <h1>Welcome to Task Away!</h1>
          <p>The place to gain productivity and relieve stress by organizing tasks.</p>
          <LoginButton />
          <LogoutButton/>
        </Col>
      </Container>
    </div>
    
  )
}

export default LoginPage