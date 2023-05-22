import { createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect } from "react";



// const User = localStorage.getItem("email");
const inboxIntialState = {
  sentEmails: [],
  recievedEmails: [],
  unReadSentEmails: 0,
  unReadRecievedEmails: 0,
};

const inboxSlice = createSlice({
  name: "inbox",
  initialState: inboxIntialState,
  reducers: {
    inboxEmails(state, action) {
      state.recievedEmails = action.payload;
      // console.log(state.recievedEmails);

      const t1 = state.recievedEmails;
      let counter = 0;
      t1.map((elem) => {
        if (elem.isWatched === false) counter++;
      });

      state.unReadRecievedEmails = counter;
    },
    sentBoxEmails(state, action) {
      state.sentEmails = action.payload;
      let counter2 = 0;
      const t2 = state.sentEmails;
      t2.map((elem) => {
        if (elem.isWatched === false) counter2++;
      });
      state.unReadSentEmails = counter2;
    },
    deleteSentEmail(state, action) {
      const id = action.payload;
      const data = current(state.sentEmails);
      // console.log(data);
      state.sentEmails = data.filter((item) => {
        return item.id !== id;
      });
    },
    deleteRecievedEmail(state, action) {
      const id = action.payload;
      const data = current(state.recievedEmails);
      // console.log(data);
      state.recievedEmails = data.filter((item) => {
        return item.id !== id;
      });
    },
   
   
    
  },
});

export const inboxAction = inboxSlice.actions;

export default inboxSlice.reducer;
