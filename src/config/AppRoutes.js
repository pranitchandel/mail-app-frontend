import { Routes, Route } from "react-router-dom";
import UserPage from "../Components/UserPage";
import AccountList from "../Components/AccountList";
import Landing from "../Components/Landing";
import Login from "../Components/Login";
import Register from "../Components/Register";
import Home from "../Components/Home";
import MailPage from "../Components/MailPage";

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Landing />}></Route>
          <Route path="/user/:id/:section" element={<UserPage />}></Route>
          {/* <Route
            exact
            path="/user/:id/sent"
            element={<UserPage page="sent" />}
          ></Route>
          <Route
            path="/user/:id/draft"
            element={<UserPage page="draft" />}
          ></Route> */}
          <Route
            exact
            path="/user/:id/mail/:mailId"
            element={<MailPage />}
          ></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/accounts" element={<AccountList />}></Route>
      </Routes>
    </>
  );
};
