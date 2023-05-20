import { configureStore } from "@reduxjs/toolkit";
import inboxReducer from './Inbox-redux';


const Store = configureStore({
    reducer: {
        inbox:inboxReducer,
    }
})

export default Store;