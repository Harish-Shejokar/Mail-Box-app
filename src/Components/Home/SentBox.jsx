import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Badge,
  Button,
  Card,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { inboxAction } from "../../Store/Inbox-redux";
import axios from "axios";
import { getDataFromFireBase } from "../../Store/ApiCall";

const Inbox = () => {
  const dispatch = useDispatch();

  const emails = useSelector((state) => state.inbox.sentEmails);

  useEffect(() => {
    dispatch(getDataFromFireBase());
  }, []);

  const watchedAllEmails = async () => {
    // console.log(emails);
    dispatch(inboxAction.watchedAllEmails());
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
    // watchedAllEmails(emails);
  }, []);

  return (
    <Card bg="info">
      <Card.Body>
        <div>
          <div className="display-4 text-center">Sent-Box</div>
          <Row>
            <Col className="">
              <ListGroup>
                {emails.length <= 0 && (
                  <h2 className="text-center">NO sent emails</h2>
                )}
                {emails.map((item) => {
                  // console.log(item);
                  return (
                    <ListGroup.Item key={item.id} variant="info" bg="info">
                      <Col className="d-flex justify-content-around">
                        <Col>
                          <Link
                            to="/message"
                            key={item.id}
                            state={{ ...item, Box: "SentBox" }}
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
                              <Col>{item.reciver}</Col>
                              <Col> {item.subject}</Col>
                              <Col>{item.time}</Col>
                              {/* <Col> {item.message.slice(0,20)}</Col> */}

                              <Col>some content which </Col>
                            </div>
                          </Link>
                        </Col>
                        <Button
                          id={item.id}
                          onClick={() =>
                            dispatch(inboxAction.deleteSentEmail(item.id))
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
        </div>
      </Card.Body>
    </Card>
  );
};

export default Inbox;
