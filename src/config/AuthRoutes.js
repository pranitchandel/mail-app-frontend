import { Routes, Route } from "react-router-dom";
import Login from "../Components/Login";
import Register from "../Components/Register";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  );
};
