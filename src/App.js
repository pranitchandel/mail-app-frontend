import "./App.css";
import SearchBar from "./Components/SearchBar";
import NavBar from "./Components/NavBar";
import MailSection from "./Components/MailSection";
import UserPage from "./Components/UserPage";
import Login from "./Components/Login";
import Register from "./Components/Register";
import MailPage from "./Components/MailPage";
import Landing from "./Components/Landing";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import setAuthToken from "./Components/Utils/setAuthToken";

const App = () => {
  // useEffect(() => {
  //   if (localStorage.getItem("jwtToken")) {
  //     setAuthToken(localStorage.getItem("jwtToken"));
  //   }
  // });
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/user/:id" element={<UserPage page="inbox" />}></Route>

          <Route
            path="/user/:id/sent"
            element={<UserPage page="sent" />}
          ></Route>
          <Route
            path="/user/:id/draft"
            element={<UserPage page="draft" />}
          ></Route>
          <Route
            exact
            path="/user/:id/mail/:mailId"
            element={<UserPage />}
          ></Route>
          <Route path="/login" element={<Login />}></Route>

          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
