import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { request } from "../services/request";
import { setToken } from "../redux/actions/loginActionData";
import { useDispatch } from "react-redux";
import { createIdToken } from "./Utils/Utils";

const Landing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const getAccountId = async (token) => {
  //   let decodedId = jwtDecode(token).id;
  //   request({
  //     url: `/api/users/userId/${decodedId}`,
  //     token: token,
  //   })
  //     .then((res) => {
  //       navigate(`/user/${res.data._id}/inbox`);
  //     })
  //     .catch((err) => console.log(err));
  // };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("jwtTokenList")) || [];
    createIdToken(token)
      .then((res) => {
        console.log("In useEffect ", token, res);
        dispatch(setToken(res));
        if (res.length === 1) {
          navigate(`/user/${res[0].userId}/inbox`);
        } else if (res.length > 0) {
          navigate("/accounts");
        } else navigate("/login");
      })
      .catch((err) => console.log("error ", err));
  }, [dispatch]);
  return <></>;
};

export default Landing;
