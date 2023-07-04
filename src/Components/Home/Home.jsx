import React, { useState, useEffect } from "react";
import { Container, Col, Row, Button, Badge, Card } from "react-bootstrap";
import ComponseForm from "./ComposeForm";
import { useNavigate, Link } from "react-router-dom";
// import Inbox from "./Inbox";
import axios from "axios";
import { inboxAction } from "../../Store/Inbox-redux";
import { useDispatch, useSelector } from "react-redux";
import { getDataFromFireBase } from "../../Store/ApiCall";
import Inbox from "./Inbox";
import SentBox from "./SentBox";
import Emoji from "./Emoji";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const unReadRecievedEmails = useSelector(
    (state) => state.inbox.unReadRecievedEmails
  );
  // console.log(unReadRecievedEmails, unReadSentEmails);
  const [compose, setCompose] = useState(false);
  const state = useSelector((state) => state.inbox);
  // console.log();

  const composeHandler = () => {
    setCompose((prev) => !prev);
  };

  useEffect(() => {

    dispatch(getDataFromFireBase("Inbox"));
    dispatch(getDataFromFireBase("SentBox"));
   
  }, []);
  const style = { color: "white" };
  return (
    <>
      <Container fluid style={style} className="fst-italic">
        <Col className="">
          <p className="text-center display-2 fw-normal  border-bottom border-info border-4">
            Welcome to Mail-Box client
            <Emoji symbol="📩" label="letter" />
          </p>
        </Col>
        <Row>
          <Col
            sm="3"
            className="fw-bold fs-4 text-center"
            style={{ cursor: "pointer" }}
          >
            <Col
              className="border-bottom border-2"
              onClick={() => dispatch(inboxAction.openBox("compose"))}
            >
              Componse
            </Col>
            <Col
              className="border-bottom border-2"
              onClick={() => dispatch(inboxAction.openBox("inbox"))}
            >
              Inbox
              {unReadRecievedEmails > 0 && <Badge variant="info">{unReadRecievedEmails}</Badge>}
            </Col>
            <Col
              className="border-bottom border-2"
              onClick={() => dispatch(inboxAction.openBox("sentbox"))}
            >
              Sent
            </Col>
          </Col>

          <Col
            className="border-start mt-2"
            style={{ height: "68vh", color: "black" }}
          >
            {state.compose && <ComponseForm />}
            {state.inbox && <Inbox />}
            {state.sentbox && <SentBox />}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;

// <Row className="text-center">
//   <Col
//     md={2}
//     xs={1}
//     bg="light"
//     style={{ marginTop: "-2rem", height: "92vh", marginBottom: "-2rem" }}
//     className="border border-3"
//   >
//     <Col className="my-2">
//       <Button
//         size="sm"
//         onClick={composeHandler}
//         variant="light"
//         bg="light"
//       >
//         componse
//       </Button>
//     </Col>
//     <Col className="mb-2">
//       <Link
//         style={{ color: "white", textDecoration: "none" }}
//         to="/inbox"
//         // state={{ emails: allEmails }}
//       >
//         Inbox
//         <Badge variant="info">{unReadRecievedEmails}</Badge>
//       </Link>
//     </Col>
//     <Col>
//       <Link
//         style={{ color: "white", textDecoration: "none" }}
//         to="/sentbox"
//         // state={{ emails: allEmails }}
//       >
//         Sent
//         {/* <Badge variant="info">{unReadSentEmails}</Badge> */}
//       </Link>
//       {/* <div onClick={InBoxHandler} style={{ color: "white" ,cursor:"pointer"}}>
//         Inbox
//       </div> */}
//     </Col>
//   </Col>
// </Row>;
