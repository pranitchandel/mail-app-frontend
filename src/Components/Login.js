import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { request } from "../services/request";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setAccountList } from "../redux/actions/loginActionData";
import { createIdToken, updateActiveUserList } from "./Utils/Utils";
import Loading from "./Loading";

const Login = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { email, password } = formData;

  const handleChange = (e) => {
    if (error !== "") {
      setError("");
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNavigateRegister = () => {
    navigate("/register");
  };

  const getNonDuplicateTokens = (tokens, newToken) => {
    return tokens.filter(
      (token) => jwtDecode(token).id !== jwtDecode(newToken).id
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    request({
      url: `/api/users/login`,
      isLoader: true,
      method: "post",
      data: formData,
    })
      .then(async (res) => {
        let jwtTokenList = [];
        jwtTokenList = JSON.parse(localStorage.getItem("jwtTokenList")) || [];
        jwtTokenList = getNonDuplicateTokens(jwtTokenList, res.data.token);

        const { token } = res.data;
        jwtTokenList.push(token);

        const idToken = await createIdToken(jwtTokenList);
        dispatch(setToken(idToken));

        await updateActiveUserList(idToken).then((decodedResult) => {
          dispatch(setAccountList(decodedResult));
        });
        localStorage.setItem("jwtTokenList", JSON.stringify(jwtTokenList));

        const decoded = jwtDecode(token);
        setShowLoader(false);
        navigate(`/user/${decoded.id}/inbox`);
      })
      .catch((err) => {
        setShowLoader(false);
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
        <button
          type="submit"
          className="loginInputSection loginBtnWrapper"
          id="loginBtn"
        >
          <div>Login</div>

          <div> {showLoader && <Loading loaderClassName="loginLoader" />}</div>
        </button>
        <p className="loginToSignup">
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
