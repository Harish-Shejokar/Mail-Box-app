import React, { useEffect } from "react";
import { Card, Row, Col, ListGroup, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { inboxAction } from "../../Store/Inbox-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { getDataFromFireBase } from "../../Store/ApiCall";

const Inbox = () => {
  const dispatch = useDispatch();
  const emails = useSelector((state) => state.inbox.recievedEmails);
  

  useEffect(() => {
    dispatch(getDataFromFireBase());
  }, []);

  return (
    <div>
      <Card bg="warning">
        <Card.Body>
          <Row>
            <div className="display-4 text-center">Inbox</div>
            <Col>
              <ListGroup>
                {emails.length <= 0 && (
                  <h2 className="text-center">NO emails yet</h2>
                )}
                {emails.map((item) => {
                  // console.log(item);
                  return (
                    <ListGroup.Item key={item.id} variant="light" bg="dark">
                      <Col className="d-flex justify-content-around">
                        <Col>
                          <Link
                            to="/message"
                            key={item.id}
                            state={{ ...item, Box: "Inbox" }}
                            style={{ textDecoration: "none" }}
                          >
                            <div
                              className="d-flex justify-content-between"
                              style={{ color: "black" }}
                            >
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
                              <Col>{item.sender}</Col>
                              <Col> {item.subject}</Col>
                              <Col>{item.time}</Col>
                              <Col>
                                some content which should be filled here
                              </Col>
                            </div>
                          </Link>
                        </Col>
                        <Button
                          id={item.id}
                          onClick={() =>
                            dispatch(inboxAction.deleteRecievedEmail(item.id))
                          }
                          variant="outline-danger"
                        >
                          Delete
                        </Button>
                      </Col>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Inbox;
