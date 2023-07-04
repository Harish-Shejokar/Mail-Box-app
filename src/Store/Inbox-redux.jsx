import { createSlice, current } from "@reduxjs/toolkit";

// const User = localStorage.getItem("email");
const inboxIntialState = {
  sentEmails: [],
  recievedEmails: [],
  unReadSentEmails: 0,
  unReadRecievedEmails: 0,
  inbox: false,
  sentbox: false,
  compose : true,
};

const inboxSlice = createSlice({
  name: "inbox",
  initialState: inboxIntialState,
  reducers: {
    inboxEmails(state, action) {
      state.recievedEmails = action.payload;
      console.log(state.recievedEmails);

      const t1 = state.recievedEmails;
      let counter = 0;
      t1.map((elem) => {
        if (elem.isWatched === false) counter++;
      });

      state.unReadRecievedEmails = counter;
    },
    sentBoxEmails(state, action) {
      state.sentEmails = action.payload;
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
    openBox(state, action) {
      if (action.payload === "sentbox") {
        state.sentbox = true;
        state.compose = false;
        state.inbox = false;
      } else if (action.payload === "inbox") {
        state.inbox = true;
        state.sentbox = false;
        state.compose = false;
      } else {
        state.compose = true;
        state.sentbox = false;
        state.inbox = false;
      }
    },
    emptyInboxSentbox(state) {
      state.sentEmails = [];
      state.recievedEmails = [];
    }
  },
});

export const inboxAction = inboxSlice.actions;

export default inboxSlice.reducer;
