import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

import setAuthToken from "../Components/Utils/setAuthToken";

import axios from "axios";

const Login = () => {
  const rootUrl = "https://mail-app-backend.onrender.com";
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { email, password } = formData;

  useEffect(() => {
    if (localStorage.getItem("jwtTokenList")) {
      return;
    }
    let jwtTokenList = [];
    localStorage.setItem("jwtTokenList", JSON.stringify(jwtTokenList));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNavigateRegister = () => {
    navigate("/register");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${rootUrl}/api/users/login`, formData)
      .then((res) => {
        let jwtTokenList = [];
        jwtTokenList = JSON.parse(localStorage.getItem("jwtTokenList") || "[]");
        const { token } = res.data;
        jwtTokenList.push(token);
        localStorage.setItem("jwtTokenList", JSON.stringify(jwtTokenList));
        setAuthToken(token);
        const decoded = jwtDecode(token);
        navigate(`/user/${decoded.id}`);
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data.msg);
      });
  };
  return (
    <div className="formContainer loginForm">
      <form onSubmit={handleSubmit}>
        <div
          style={{
            marginTop: "10px",
            fontSize: "xx-large",
            fontFamily: '"Noto Sans", sans-serif',
            textAlign: "center",
            color: "whitesmoke",
          }}
        >
          Login
        </div>
        <div className="formError">{error}</div>

        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="loginInputSection"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
          placeholder="Password"
          className="loginInputSection"
        />
        <input
          type="submit"
          value="Login"
          className="loginInputSection"
          id="loginBtn"
        />

        <p className="">
          Not registered yet?
          <span onClick={handleNavigateRegister} className="signUpSpan">
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
