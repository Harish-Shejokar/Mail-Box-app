import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Message = () => {
  const location = useLocation();

  const { sender,reciver, subject, message, isWatched, id,time,Box } = location.state;
    // console.log(sender , reciver, message, subject,isWatched,id,Box);

  const emailWatched = async () => {
    const email = (Box === "Inbox") ? reciver : sender;
    const Email = email.replace(/[^a-zA-Z ]/g, "");
    console.log(Email, id);
    try {
      const response = await axios.put(
        `https://mailbox-e593a-default-rtdb.firebaseio.com/${Email}/${Box}/${id}.json`,
        {
          sender,
          reciver,
          subject,
          message,
         id,
          time,
          isWatched: true,
        }
        );
        console.log("messageWatched")
    } catch (error) {
      console.log(error);
    }
    };
     emailWatched();

  return (
    <div
      className="d-flex flex-column"
      style={{ color: "", backgroundColor: "skyblue", height: "50vh" }}
    >
      <div className="d-flex justify-content-around me-4">
        <span>Email:</span>
        {Box === "Inbox" && <span>{sender}</span>}
        {Box === "SentBox" && <span>{reciver}</span>}
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
