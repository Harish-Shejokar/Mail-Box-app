import { inboxAction } from "./Inbox-redux";
import axios from "axios";



export const getDataFromFireBase = (type) => {
  const userEmail = localStorage.getItem("email");
  const UserEmail = userEmail.replace(/[.@]/g, "");
  // console.log(UserEmail);
  return async (dispatch) => {
    const getAllSentEmails = async () => {
      console.log(type);

      const sentUrl = `https://mail-box-client-database-86603-default-rtdb.firebaseio.com/${UserEmail}/SentBox.json`;
      const recivedUrl = `https://mail-box-client-database-86603-default-rtdb.firebaseio.com/${UserEmail}/Inbox.json`;
      const url = type === "Inbox" ? recivedUrl : sentUrl;
      try {
        const response = await axios.get(url);
        const data = response.data;
        // console.log(data);
        const allKeys = Object.keys(data);
        const allValues = Object.values(data);
        allValues.forEach((item, index) => {
          const itemKey = allKeys[index];
          item.id = itemKey;
        });

        if (type === "Inbox") dispatch(inboxAction.inboxEmails(allValues));
        else dispatch(inboxAction.sentBoxEmails(allValues));

        // const [Inbox, SentBox] = await Promise.all([
        //   axios.get(recivedUrl),
        //   axios.get(sentUrl),
        // ]);

        // const inboxData = Inbox.data;
        // const sentBoxData = SentBox.data;
        // // console.log(Inbox);

        // //Inbox operation -------------------------
        // const inboxkeys = Object.keys(inboxData);
        // const inboxvalues = Object.values(inboxData);
        // inboxvalues.forEach((item, index) => {
        //   const itemKey = inboxkeys[index];
        //   item.id = itemKey;
        //   // console.log(item);
        // });
        // // console.log(inboxvalues);

        // // SentBox operation ----------------------------
        // const sentkeys = Object.keys(sentBoxData);
        // const sentvalues = Object.values(sentBoxData);
        // sentvalues.forEach((item, index) => {
        //   const itemKey = sentkeys[index];
        //   item.id = itemKey;
        //   // console.log(item);
        // });
        // // console.log(sentvalues);

        // dispatch(inboxAction.inboxEmails(inboxvalues));
        // dispatch(inboxAction.sentBoxEmails(sentvalues));
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
        `https://mail-box-client-database-86603-default-rtdb.firebaseio.com/${UserEmail}/${Box}/${Id}.json`
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
       const response = await axios.put(
         `https://mail-box-client-database-86603-default-rtdb.firebaseio.com/${UserEmail}/${Box}`
       );
    }
    // request();
  }
}