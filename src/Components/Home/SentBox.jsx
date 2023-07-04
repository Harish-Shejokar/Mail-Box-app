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
import {
  getDataFromFireBase,
  deleteDataFromFireBase,
} from "../../Store/ApiCall";

const Inbox = () => {
  const dispatch = useDispatch();

  const emails = useSelector((state) => state.inbox.sentEmails);

  const deleteHandler = () => {
    console.log("delte");
  };

  useEffect(() => {
    // setInterval(() => {
      
      // },3000)
        // dispatch(getDataFromFireBase("SentBox"));
  }, []);

  // useEffect(() => {}, []);

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
                    <ListGroup.Item key={item.id} variant="info" bg="info" className="m-1">
                      <Col className="d-flex justify-content-around flex-wrap">
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
                              <Col>{item.reciver}</Col>
                              <Col> {item.subject}</Col>
                              <Col>{item.time}</Col>
                              {/* <Col> {item.message.slice(0,20)}</Col> */}

                              {/* <Col>some content which </Col> */}
                            </div>
                          </Link>
                        </Col>
                        <Button
                          id={item.id}
                          onClick={() => {
                            dispatch(inboxAction.deleteSentEmail(item.id));
                            dispatch(
                              deleteDataFromFireBase("SentBox", item.id)
                            );
                          }}
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
