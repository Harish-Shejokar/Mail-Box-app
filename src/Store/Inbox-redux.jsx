import { createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect } from "react";



const deleteFromFireBase = async (Id) => {
  console.log("delete from fireBase",Id);
  const response = await axios.delete(
    `https://mailbox-e593a-default-rtdb.firebaseio.com/SentEmail/${Id}.json`
  );

  try {
    console.log("delete Successful");
  } catch (error) {
    console.log(error);
  }

}



const inboxIntialState = { newMessage: true, emails: [], unReadEmails: 0, };

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
    deleteEmail(state, action) {
      const id = action.payload;
      const data = current(state.emails);
      console.log(data);
      state.emails = data.filter(item => {
        return item.id !== id;
      })
      deleteFromFireBase(action.payload);
    },
    watchedAllEmails(state) {
      // console.log(current(state.emails));
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
