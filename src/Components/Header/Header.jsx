import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { authAction } from "../../Store/Auth";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <div
      style={{ margin: "-2rem", marginBottom: "2rem", background: "purple" }}
    >
      <Navbar bg="info" variant="light">
        <Container>
          <Navbar.Brand>
            MailBox
            {/* <NavLink to="/" style={{color:"black",textDecoration:"none"}}>Mail-Box</NavLink> */}
          </Navbar.Brand>
          <Nav className="me-auto">
            <NavLink
              className=""
              to="/"
              style={{ color: "black", textDecoration: "none" }}
            >
              Home
            </NavLink>
            <NavLink
              className="ms-2"
              to="/"
              style={{ color: "black", textDecoration: "none" }}
            >
              Features
            </NavLink>
            <NavLink
              className="ms-2"
              to="/login"
              style={{ color: "black", textDecoration: "none" }}
              onClick={() => {
                localStorage.clear();
                dispatch(authAction.loggedOut());
              }}
            >
             
              LogOut
            </NavLink>
            {/* <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
