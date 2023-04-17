import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFirebase from "../hooks/useFirebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Header = () => {
  const {
    auth,
    logout
  } = useFirebase();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
      if (loading) {
      // maybe trigger a loading screen
      return;
      }
      if (!user) navigate("/");
  }, [user, loading]);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/home">Wikipedia</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link eventKey={2} onClick={logout}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;