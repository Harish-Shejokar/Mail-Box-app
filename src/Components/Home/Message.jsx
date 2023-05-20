import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Message = () => {
  const location = useLocation();
  const { email, subject, message, isWatched, id,time } = location.state;
  //   console.log(message, email, subject,isWatched,id);

  const emailWatched = async () => {
    try {
      const response = await axios.put(
        `https://mailbox-e593a-default-rtdb.firebaseio.com/SentEmail/${id}.json`,
        {
          email,
          subject,
          message,
         id,
          time,
          isWatched: true,
        }
        );
        console.log("blue dot removed")
    } catch (error) {
      console.log(error);
    }
    };
    if (!isWatched) emailWatched();

  return (
    <div
      className="d-flex flex-column"
      style={{ color: "", backgroundColor: "skyblue", height: "50vh" }}
    >
      <div className="d-flex justify-content-around me-4">
        <span>Email:</span>
        <span>{email}</span>
        <div>
          <span>Subject:</span>
          <span> {subject}</span>
        </div>
      </div>
      <hr />
      <div className="">Message:{message}</div>
    </div>
  );
};

export default Message;
