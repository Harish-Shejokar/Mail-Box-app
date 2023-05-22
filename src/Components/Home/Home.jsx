import React, { useState, useEffect } from "react";
import { Container, Col, Row, Button, Badge, Card } from "react-bootstrap";
import ComponseForm from "./ComposeForm";
import { useNavigate, Link } from "react-router-dom";
// import Inbox from "./Inbox";
import axios from "axios";
import { inboxAction } from "../../Store/Inbox-redux";
import { useDispatch, useSelector } from "react-redux";
import { getDataFromFireBase } from "../../Store/ApiCall";

const Home = () => {
  const dispatch = useDispatch();
  const unReadSentEmails = useSelector((state) => state.inbox.unReadSentEmails);
  const unReadRecievedEmails = useSelector(
    (state) => state.inbox.unReadRecievedEmails
  );
  // console.log(unReadRecievedEmails, unReadSentEmails);
  const [compose, setCompose] = useState(false);

  const composeHandler = () => {
    setCompose((prev) => !prev);
  };


  useEffect(() => {
    const Id = setInterval(() => {
      // console.log(Math.random().toFixed(2));
      dispatch(getDataFromFireBase());
    }, 2000)
    // clearInterval(Id);
  }, []);

  return (
    <Container fluid style={{ margin: "0 -2rem" }}>
      <Row className="text-center">
        <Col
          md={2}
          xs={1}
          bg="light"
          style={{ marginTop: "-2rem", height: "92vh", marginBottom: "-2rem" }}
          className="border border-3"
        >
          <Col className="my-2">
            <Button
              size="sm"
              onClick={composeHandler}
              variant="light"
              bg="light"
            >
              componse
            </Button>
          </Col>
          <Col className="mb-2">
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/inbox"
              // state={{ emails: allEmails }}
            >
              Inbox
              <Badge variant="info">{unReadRecievedEmails}</Badge>
            </Link>
          </Col>
          <Col>
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/sentbox"
              // state={{ emails: allEmails }}
            >
              Sent
              <Badge variant="info">{unReadSentEmails}</Badge>
            </Link>
            {/* <div onClick={InBoxHandler} style={{ color: "white" ,cursor:"pointer"}}>
              Inbox
            </div> */}
          </Col>
        </Col>

        <Col sm={10}>
          {!compose && (
            <div className="d-flex justify-content-center">
              <Card style={{ width: "30rem" }}>
                <Card.Body>
                  <Card.Title className="display-5">
                    Welcome to Mail-Box
                  </Card.Title>
                  <Card.Text></Card.Text>
                  {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
              </Card>
            </div>
          )}
          <Container fluid>
            {compose && <ComponseForm />}
            {/* {inbox && <Inbox emails={allEmails} />} */}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
