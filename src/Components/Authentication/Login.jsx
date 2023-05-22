import React, { useRef } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { authAction } from "../../Store/Auth";
import { useDispatch } from "react-redux";


const Login = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const emailRef = useRef();
  const passRef = useRef();

    
const loginOnFireBase = async (email, password) => {
  const response = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAjGOUVjefbMK04WvwbU2wGP4OMSyUetJw",
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    console.log("login successfull");
    const data = await response.json();
    console.log(data);
    dispatch(authAction.loggedIn());
    localStorage.setItem("token", data.idToken);
    localStorage.setItem("email", email);
    navigate("/")
  } else {
    console.log("login failed");
    alert("INVALID Credentials");
  }
};
    
  const loginHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const pass = passRef.current.value;

    loginOnFireBase(email, pass);
  };

  return (
    <div>
      <Container bg="dark" variant="dark" className="">
        <Row className="vh-90 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-2 border-primary"></div>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">
                    Login
                  </h2>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          ref={emailRef}
                          type="email"
                          placeholder="Enter email"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          ref={passRef}
                          type="password"
                          placeholder="Password"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3"></Form.Group>
                      <div className="d-grid">
                        <Button
                          onClick={loginHandler}
                          variant="primary"
                          type="submit"
                        >
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Not have an account??{" "}
                        <Link to="/signup" className="text-primary fw-bold">
                          SignUp
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
