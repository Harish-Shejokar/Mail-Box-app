import React from 'react'
import { Navbar,Container,Nav } from 'react-bootstrap';
import { NavLink} from 'react-router-dom';

const Header = () => {
  return (
    <div style={{ margin: "-2rem", marginBottom: "2rem",background:"purple" }}>
      <Navbar bg="info" variant="light">
        <Container>
          <Navbar.Brand >
            <NavLink to="/" style={{color:"black",textDecoration:"none"}}>Mail-Box</NavLink>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header
