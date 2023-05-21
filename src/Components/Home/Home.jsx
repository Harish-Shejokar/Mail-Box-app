import React, { useState, useEffect } from "react";
import { Container, Col, Row, Button, Badge } from "react-bootstrap";
import ComponseForm from "./ComposeForm";
import { useNavigate, Link } from "react-router-dom";
// import Inbox from "./Inbox";
import axios from "axios";
import {inboxAction} from "../../Store/Inbox-redux"
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const unReadSentEmails = useSelector(state => state.inbox.unReadSentEmails);
  const unReadRecievedEmails = useSelector(state => state.inbox.unReadRecievedEmails);
  const unReadEmails = useSelector(state => state.inbox.unReadEmails);
  // console.log(unReadEmails);
  const [compose, setCompose] = useState(false);
  // const [inbox, setInBox] = useState(false);
  // const [allEmails, setAllEmails] = useState([]);
  const navigate = useNavigate();

  const composeHandler = () => {
    setCompose((prev) => !prev);
  };

  // const InBoxHandler = () => {
  //   // setInBox(prev => !prev);
  //   navigate("/inbox", { state: allEmails });
  // };
 const getAllSentEmails = async () => {
   try {
     const response = await axios.get(
       `https://mailbox-e593a-default-rtdb.firebaseio.com/AllEmails.json`
     );

     const data = response.data;
     const keys = Object.keys(data);
     const values = Object.values(data);
     values.forEach((item, index) => {
       const itemKey = keys[index];
       item.id = itemKey;
       // console.log(item);
     });
     //  console.log(values);
     // setAllEmails(values);
     dispatch(inboxAction.allEmails(values));
   } catch (error) {
     console.log(error);
   }
 };

 useEffect(() => {
   getAllSentEmails();
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
          <Container fluid>
            <h1 className="text-center" style={{ color: "white" }}>
              Welcome to Mail-Box
            </h1>
            {compose && <ComponseForm />}
            {/* {inbox && <Inbox emails={allEmails} />} */}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
