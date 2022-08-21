import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const rootUrl = "http://localhost:5000";
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    password2: "",
  });
  const navigate = useNavigate();
  const { userName, email, password, password2 } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNavigateRegister = () => {
    navigate("/login");
  };
  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();
    if (password !== password2) {
      setError("Passwords not matching");
      return;
    }
    console.log("Form data", formData);
    axios
      .post(`${rootUrl}/api/users/register`, formData)
      .then((res) => navigate("/login"))
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data.msg);
      });
  };
  return (
    <div className="formContainer registerForm">
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
          Register
        </div>
        <div className="formError">{error}</div>
        <label htmlFor="userName">Name</label>
        <input
          type="text"
          name="userName"
          value={userName}
          onChange={handleChange}
          placeholder="Name"
          required
          className="loginInputSection"
        />
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
        <label htmlFor="password">Confirm password</label>
        <input
          type="password"
          name="password2"
          value={password2}
          onChange={handleChange}
          required
          placeholder="Confirm password"
          className="loginInputSection"
        />
        <input
          type="submit"
          value="Register"
          className="loginInputSection"
          id="loginBtn"
        />

        <p className="">
          Already registered?
          <span onClick={handleNavigateRegister} className="signUpSpan">
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
