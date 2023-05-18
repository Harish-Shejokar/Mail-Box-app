import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { Button, InputGroup, Form, Container, Col, Row } from "react-bootstrap";

const Home = () => {
  const editor = useRef(null);
  const emailRef = useRef("");
  const subjectRef = useRef("");
  const [content, setContent] = useState("");

  const storeDataOnFireBase = async (data) => {
    const userEmail = localStorage.getItem("email");
    const UserEmails = userEmail.replace(/[^a-zA-Z ]/g, "");
    console.log(UserEmails);

    try {
      const resp = await fetch(
        `https://mailbox-e593a-default-rtdb.firebaseio.com/SentEmail.json`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type":"application/json",
          }
        }
      );

      if (resp.ok) {
        console.log("data stored succesfully ");
      } else {
        console.log("data not stored ");
      }
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
    const obj = {
      email,
      subject,
      message: newString,
    };
    console.log(obj);

    storeDataOnFireBase(obj);

    emailRef.current.value = "";
    subjectRef.current.value = "";
    setContent("");
  };

  return (
    <Container fluid style={{ marginTop: "3rem" }}>
      <h1 style={{ color: "white" }}>Welcome to Mail-Box</h1>

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
      <Col>
        <Button className="w-12" onClick={contentHandler}>
          Send
        </Button>
      </Col>
    </Container>
  );
};

export default Home;