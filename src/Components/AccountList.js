import { useEffect, useState } from "react";
import { setAccountList, setToken } from "../redux/actions/loginActionData";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { updateActiveUserList } from "./Utils/Utils";

const AccountList = () => {
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.login);
  const [activeUserNamesArray, setActiveUserNamesArray] = useState([]);

  useEffect(() => {
    setShowLoader(true);
    updateActiveUserList(token).then((decodedResult) => {
      setActiveUserNamesArray(decodedResult);
      dispatch(setAccountList(decodedResult));
      setShowLoader(false);
    });
  }, []);

  const handleAllLogout = () => {
    localStorage.removeItem("jwtTokenList");
    dispatch(setToken([]));
    navigate("/login");
  };

  return (
    <div className="accountWrapper">
      <div className="accountHeader">
        <div style={{ width: "93%" }}>
          <h1>Choose an account </h1>
        </div>
        {showLoader && (
          <div>
            <Loading loaderClassName="accountLoader" />
          </div>
        )}
      </div>
      {activeUserNamesArray?.map((active, index) => (
        <div
          className="accountList"
          key={index}
          onClick={() => navigate(`/user/${active._id}/inbox`)}
        >
          <h2>{active.userName}</h2>
          <h4>{active.email}</h4>
        </div>
      ))}
      <div className="accountNavBtns">
        <button className="accountBtns" onClick={() => navigate("/login")}>
          <h4>Login to another account</h4>
        </button>
        <button className="accountBtns" onClick={() => navigate("/register")}>
          <h4>Create new account</h4>
        </button>
        <button className="accountBtns logoutAll" onClick={handleAllLogout}>
          <h4>Logout all accounts</h4>
        </button>
      </div>
    </div>
  );
};

export default AccountList;
