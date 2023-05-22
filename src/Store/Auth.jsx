import { createSlice, } from "@reduxjs/toolkit";


const login = localStorage.getItem("email") === null ? false : true;

const authIntialState = { isLogin: login };
const authSlice = createSlice({
    name: "auth",
    initialState: authIntialState,
    reducers: {
        loggedOut(state) {
            state.isLogin = false;
        },
        loggedIn(state) {
            state.isLogin = true;
        },
    }
})

export const authAction = authSlice.actions;


export default authSlice.reducer;