import { inboxAction } from "./Inbox-redux";
import axios from "axios";



export const getDataFromFireBase = () => {
  const userEmail = localStorage.getItem("email");
  const UserEmail = userEmail.replace(/[^a-zA-Z ]/g, "");
  console.log(userEmail);
  return async (dispatch) => {
    const getAllSentEmails = async () => {

      const sentUrl = `https://mailbox-e593a-default-rtdb.firebaseio.com/${UserEmail}/SentBox.json`;
      const recivedUrl = `https://mailbox-e593a-default-rtdb.firebaseio.com/${UserEmail}/Inbox.json`;

      try {
        const [Inbox, SentBox] = await Promise.all([
          axios.get(recivedUrl),
          axios.get(sentUrl),
        ]);

        const inboxData = Inbox.data;
        const sentBoxData = SentBox.data;
        // console.log(inboxData);

        //Inbox operation -------------------------
        const inboxkeys = Object.keys(inboxData);
        const inboxvalues = Object.values(inboxData);
        inboxvalues.forEach((item, index) => {
          const itemKey = inboxkeys[index];
          item.id = itemKey;
          // console.log(item);
        });
        // console.log(inboxvalues);

        // SentBox operation ----------------------------
        const sentkeys = Object.keys(sentBoxData);
        const sentvalues = Object.values(sentBoxData);
        sentvalues.forEach((item, index) => {
          const itemKey = sentkeys[index];
          item.id = itemKey;
          // console.log(item);
        });
        // console.log(sentvalues);

        dispatch(inboxAction.inboxEmails(inboxvalues));
        dispatch(inboxAction.sentBoxEmails(sentvalues));
      } catch (error) {
        console.log(error);
      }
      };
      getAllSentEmails();
  };
};


export const deleteDataFromFireBase = (Box, Id) => {
  const userEmail = localStorage.getItem("email");
  const UserEmail = userEmail.replace(/[^a-zA-Z ]/g, "");

  console.log(Box, Id);
  return async () => {
    const request = async () => {
      console.log("delete from fireBase", Id);
      const response = await axios.delete(
        `https://mailbox-e593a-default-rtdb.firebaseio.com/${UserEmail}/${Box}/${Id}.json`
      );

      try {
        console.log("delete Successful");
      } catch (error) {
        console.log(error);
      }
    };
    request();
  };
};


export const watchedAllEmails = (Box) => {
  return async () => {
    const request = async() => {
       const response = await axios.put(`https://mailbox-e593a-default-rtdb.firebaseio.com/${UserEmail}/${Box}`)
    }
    // request();
  }
}