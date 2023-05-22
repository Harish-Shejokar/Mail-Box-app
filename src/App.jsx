import { useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Components/Authentication/Login";
import Signup from "./Components/Authentication/Signup";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import SentBox from "./Components/Home/SentBox";
import Message from "./Components/Home/Message";
import { useDispatch } from "react-redux";
import { inboxAction } from "./Store/Inbox-redux.jsx";
import Inbox from "./Components/Home/Inbox";
import PrivateRoute from "./Components/Routes/PrivateRoute";

function App() {
  const dispatch = useDispatch();

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/signup" element={<Signup />} exact />
        <Route path="/login" element={<Login />} exact />
        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} exact />
          <Route path="/sentbox" element={<SentBox />} exact />
          <Route path="/message" element={<Message />} exact />
          <Route path="/inbox" element={<Inbox />} exact />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
