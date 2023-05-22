import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { Button, InputGroup, Form, Container, Col, Row } from "react-bootstrap";
import axios from "axios";

const ComponseForm = () => {
  const editor = useRef(null);
  const emailRef = useRef("");
  const subjectRef = useRef("");
  const [content, setContent] = useState("");

    const storeDataOnFireBase = async (data) => {
      const userEmail = localStorage.getItem("email");
      const Sender = userEmail.replace(/[^a-zA-Z ]/g, "");

      const reciver = data.reciver;
      const Reciver = reciver.replace(/[^a-zA-Z ]/g, "");
      // console.log(Sender, Reciver);
      
      const postUrlForSender = `https://mailbox-e593a-default-rtdb.firebaseio.com/${Sender}/SentBox.json`;
      const postUrlForReciver = `https://mailbox-e593a-default-rtdb.firebaseio.com/${Reciver}/Inbox.json`;

      try {
        const [request1, request2] = await Promise.all([
          axios.post(postUrlForSender,data),
          axios.post(postUrlForReciver,data)
        ])

        console.log("both post successful")

      } catch (error) {
        console.log(error);
     }
      
    };

  const contentHandler = () => {
    if (
      editor.current.value === "" ||
      emailRef.current.value === "" ||
      subjectRef.current.value === ""
    ) {
      alert("Fill all credentials");
      return;
    }
    const regex = /(<([^>]+)>)/gi;
    const string = editor.current.value;
    const newString = string.replace(regex, " ");
    const email = emailRef.current.value;
    const subject = subjectRef.current.value;
    const sender = localStorage.getItem("email");
    const time = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`
    const obj = {
      "sender": sender,
      "reciver":email,
      subject,
      message: newString,
      time,
      isWatched: false,
    };
    // console.log(obj);

    storeDataOnFireBase(obj);

    emailRef.current.value = "";
    subjectRef.current.value = "";
    setContent("");
  };
  return (
    <div className="ms-5">
      <Row>
        <InputGroup className="">
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <Form.Control
            ref={emailRef}
            placeholder="Email"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>

        <InputGroup className="">
          <InputGroup.Text id="basic-addon1">Subject</InputGroup.Text>
          <Form.Control
            ref={subjectRef}
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>

        <JoditEditor
          ref={editor}
          value={content}
          onChange={(newContent) => {
            setContent(newContent);
          }}
        />
      </Row>
     
        <Button variant="info" size="lg" style={{width:"100%"}} className="" onClick={contentHandler}>
          Send
        </Button>
     
    </div>
  );
};

export default ComponseForm;
