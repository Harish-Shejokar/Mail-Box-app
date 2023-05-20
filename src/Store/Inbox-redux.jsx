import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const inboxIntialState = { newMessage: true, emails: [], unReadEmails: 0,firstVisit:0 };

const inboxSlice = createSlice({
  name: "inbox",
  initialState: inboxIntialState,
  reducers: {
    messageWatched(state) {
      state.newMessage = false;
      
    },
    allEmails(state, action) {
      state.emails = action.payload;
      // console.log(state.emails);
      const item = state.emails;
      let counter = 0;
      item.map((elem) => {
        if (elem.isWatched === false) counter++;
      });
      state.unReadEmails = counter;
      // const data = state.emails;
      // console.log(data);
    },
    watchedAllEmails(state) {
      console.log(state.emails);
      // const data = state.emails;
      // const updatedData = data.filter(item => {
      //   if (item.isWatched === false) item.isWatched = true;
      // })
      // state.emails = updatedData;
    }
   
  },
});

export const inboxAction = inboxSlice.actions;

export default inboxSlice.reducer;
