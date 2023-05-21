import { configureStore } from "@reduxjs/toolkit";
import inboxReducer from './Inbox-redux';
import authReducer from "./Auth";


const Store = configureStore({
    reducer: {
        inbox: inboxReducer,
        auth:authReducer,
    }
})

export default Store;