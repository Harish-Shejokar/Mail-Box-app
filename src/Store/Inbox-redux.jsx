import { createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect } from "react";

const deleteFromFireBase = async (Id) => {
  console.log("delete from fireBase", Id);
  const response = await axios.delete(
    `https://mailbox-e593a-default-rtdb.firebaseio.com/AllEmails/${Id}.json`
  );

  try {
    console.log("delete Successful");
  } catch (error) {
    console.log(error);
  }
};

const User = localStorage.getItem("email");
const inboxIntialState = {
  emails: [],
  sentEmails: [],
  recievedEmails: [],
  unReadSentEmails: 0,
  unReadRecievedEmails: 0,
};

const inboxSlice = createSlice({
  name: "inbox",
  initialState: inboxIntialState,
  reducers: {
    messageWatched(state) {
      state.newMessage = false;
    },
    allEmails(state, action) {
      const allEmails = action.payload;
      state.recievedEmails = allEmails.filter((item) => item.reciver === User);
      state.sentEmails = allEmails.filter((item) => item.sender === User);
      // console.log(state.sentEmails, state.recievedEmails);

      state.emails = allEmails;
      const t1 = state.recievedEmails;
      const t2 = state.sentEmails;
      let counter = 0;
      let counter2 = 0;
      t1.map((elem) => {
        if (elem.isWatched === false) counter++;
      });
      t2.map((elem) => {
        if (elem.isWatched === false) counter2++;
      });
      state.unReadRecievedEmails = counter;
      state.unReadSentEmails = counter2;

      // const data = state.emails;
      // console.log(data);
    },
    deleteSentEmail(state, action) {
      const id = action.payload;
      const data = current(state.sentEmails);
      console.log(data);
      state.sentEmails = data.filter((item) => {
        return item.id !== id;
      });
      deleteFromFireBase(action.payload);
    },
    deleteRecievedEmail(state, action) {
        const id = action.payload;
        const data = current(state.recievedEmails);
        console.log(data);
        state.recievedEmails = data.filter((item) => {
          return item.id !== id;
        });
        deleteFromFireBase(action.payload);
    },
    watchedAllEmails(state) {
      const data = current(state.emails);
      // data.map(item => {
      //   item.isWatched = false;
      // })

      // console.log(data);
    },
    recievedEmails(state) {
      const data = current(state.emails);
      const updatedData = data.filter((item) => {
        return item.reciver !== localStorage.getItem("email");
      });
      // console.log(updatedData);
    },
  },
});

export const inboxAction = inboxSlice.actions;

export default inboxSlice.reducer;
