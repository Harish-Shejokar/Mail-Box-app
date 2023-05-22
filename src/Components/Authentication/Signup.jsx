import React, { useRef } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();
  const navigate = useNavigate();

  const signUpOnFirbase = async (email, password) => {
    console.log(email, password);
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAjGOUVjefbMK04WvwbU2wGP4OMSyUetJw";
    const payLoad = {
      email,
      password,
      returnSecureToken: true,
    };

    try {
      const response = await axios.post(url, payLoad);

        console.log("sign up successfully");
        navigate("/login");
        // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const signupHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const pass = passRef.current.value;
    const confirmpass = confirmPassRef.current.value;
    if (pass !== confirmpass) {
      alert("password not matched!!");
      return;
    }
    // console.log(email, pass, confirmpass);

    signUpOnFirbase(email, pass);
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
                    SignUp
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

                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          ref={passRef}
                          type="password"
                          placeholder="Password"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          ref={confirmPassRef}
                          type="password"
                          placeholder="Password"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3"></Form.Group>
                      <div className="d-grid">
                        <Button
                          onClick={signupHandler}
                          variant="primary"
                          type="submit"
                        >
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account??{" "}
                        <Link to="/login" className="text-primary fw-bold">
                          Login
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

export default Signup;
