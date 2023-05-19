import React, { useEffect } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";

const Inbox = (props) => {
  const { emails } = props;

  // console.log(emails)

  return (
    <div>
      <h1 className="text-center">Inbox</h1>
      <Container bg="light" className="border border-3">
        <Row>
          <Col>
            <h3 className="text-center">All Emails</h3>
          </Col>
        </Row>
        <Row>
          <Col className="m-2">
            <ListGroup>
              {emails.map((item) => {
                // console.log(item);
                return (
                  <ListGroup.Item key={item.id} variant="dark" bg="dark">
                    <div className="d-flex justify-content-between">
                      <Col>{item.email}</Col>
                      <Col> {item.subject}</Col>
                    </div>
                  </ListGroup.Item>
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
