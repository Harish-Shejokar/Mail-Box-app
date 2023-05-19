import React, { useState,useEffect } from "react";
import { Container,Col,Row, Button } from "react-bootstrap";
import ComponseForm from "./ComposeForm";
import {  } from "react-router-dom";
import Inbox from "./Inbox";
import axios from "axios";

const Home = () => {
  const [compose, setCompose] = useState(false);
  const [inbox, setInBox] = useState(false);
  const [allEmails, setAllEmails] = useState([]);

  const composeHandler = () => {
    setCompose(prev => !prev);
  }

  const InBoxHandler = () => {
    setInBox(prev => !prev);
  }

   const getAllSentEmails = async () => {
     try {
       const response = await axios.get(
         `https://mailbox-e593a-default-rtdb.firebaseio.com/SentEmail.json`
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
       setAllEmails(values);
     } catch (error) {
       console.log(error);
     }
   };

   useEffect(() => {
     getAllSentEmails();
   }, []);

  return (
    <Container fluid style={{ margin: "0 -2rem", }}>
      <Row>
        <Col
          md={1}
          xs={1}
          bg="light"
          style={{ marginTop: "-2rem",height:"100vh" ,marginBottom:"-2rem"}}
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
          <Col>
            <div onClick={InBoxHandler} style={{ color: "white" ,cursor:"pointer"}}>
              Inbox
            </div>
          </Col>
        </Col>

        <Col sm={11}>
          <Container fluid>
            <h1 className="text-center" style={{ color: "white" }}>
              Welcome to Mail-Box
            </h1>
            {compose  && <ComponseForm />}
            {inbox && <Inbox emails={allEmails} />}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
