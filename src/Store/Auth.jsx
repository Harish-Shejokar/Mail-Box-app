import { createSlice, } from "@reduxjs/toolkit";


const login = localStorage.getItem("email") === null ? false : true;

const authIntialState = { isLogin: login };
const authSlice = createSlice({
    name: "auth",
    initialState: authIntialState,
    reducers: {
        userLoggedIn(state) {
            isLogin = false;
        },
    }
})

export const authAction = authSlice.actions;


export default authSlice.reducer;