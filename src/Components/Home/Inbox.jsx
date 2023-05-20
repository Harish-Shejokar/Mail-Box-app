import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup, Badge } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { inboxAction } from "../../Store/Inbox-redux";

const Inbox = (props) => {
  const dispatch = useDispatch();
  // const { emails } = props;
  const location = useLocation();
  const { emails } = location.state;

  const watchedAllEmails = async () => {
    dispatch(inboxAction.watchedAllEmails());
    // const updatedData = useSelector(state => state.inbox.emails);
    // try {
    //   const response = await fetch(
    //     `https://mailbox-e593a-default-rtdb.firebaseio.com/SentEmail.json`,
    //     {
    //       method: "PUT",
    //       body: JSON.stringify(emails),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {
    // console.log(emails);
    watchedAllEmails(emails);
  }, []);

  return (
    <div>
      <h1 className="text-center">Inbox</h1>
      <Container bg="light" className="border border-3">
        <Row>
          <Col>
            <h3 className="text-center" style={{ color: "white" }}>
              All Emails
            </h3>
          </Col>
        </Row>
        <Row>
          <Col className="m-2">
            <ListGroup>
              {emails.map((item) => {
                // console.log(item);
                return (
                  <Link
                    to="/message"
                    state={item}
                    key={item.id}
                    style={{ textDecoration: "none" }}
                  >
                    <ListGroup.Item key={item.id} variant="light" bg="dark">
                      <div className="d-flex justify-content-evenly">
                        {!item.isWatched && (
                          <span
                            style={{
                              backgroundColor: "blue",
                              borderRadius: "25px",
                              width: ".5rem",
                              height: ".5rem",
                            }}
                            className="mx-2 mt-2"
                          ></span>
                        )}
                        {/* <Badge bg="info" style={{color:"skyblue"}}>0</Badge> */}
                        <Col>{item.email}</Col>
                        <Col> {item.subject}</Col>
                        {/* <Col>some content which should be filled here</Col> */}
                        <Col>{item.time}</Col>
                      </div>
                    </ListGroup.Item>
                  </Link>
                );
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Inbox;
