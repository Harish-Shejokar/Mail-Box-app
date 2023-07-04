import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { authAction } from "../../Store/Auth";
import { useDispatch } from "react-redux";
import { inboxAction } from "../../Store/Inbox-redux";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <div
      style={{ margin: "-2rem", marginBottom: "2rem", }}
    >
      <Navbar bg="info" variant="light" className="py-3 fs-4 ">
        <Container  className="d-flex justify-content-around ">
          <Nav className="">
            <NavLink
              className="fw-bold"
              to="/"
              style={{ color: "black", textDecoration: "none" }}
            >
              Home
            </NavLink>
          </Nav>
          <Nav>
            <NavLink
               className="fw-bold"
              to="/login"
              style={{ color: "black", textDecoration: "none" }}
              onClick={() => {
                localStorage.clear();
                dispatch(inboxAction.emptyInboxSentbox());
                dispatch(authAction.loggedOut());
              }}
            >
              LogOut
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
