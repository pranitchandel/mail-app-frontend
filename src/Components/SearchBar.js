import { useState } from "react";
import Logo from "./Logo";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from "@mui/icons-material/Logout";
import SwitchAccountOutlinedIcon from "@mui/icons-material/SwitchAccountOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAccountList, setToken } from "../redux/actions/loginActionData";

const SearchBar = () => {
  const dispatch = useDispatch();
  const currentAccountId = useParams().id || "";

  const { accountList, token } = useSelector((state) => state.login);

  const initialText = "";
  const [search, setSearch] = useState(initialText);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {};
  const handleChangeAccount = () => {
    const x = document.getElementById("accounts");

    if (x.style.display === "" || x.style.display === "none") {
      x.style.display = "grid";
      x.style.flexDirection = "column";
    } else x.style.display = "none";
  };

  const handleAnotherLogin = () => {
    navigate(`/login`);
  };
  const handleCurrentLogout = () => {
    const activeIdTokens = token.filter((tk) => tk.userId !== currentAccountId);
    const activeTokens = activeIdTokens.map((tkn) => tkn.token);
    dispatch(setToken(activeIdTokens));
    dispatch(setAccountList(getOtherUsers()));
    localStorage.setItem("jwtTokenList", JSON.stringify(activeTokens));
    if (activeTokens.length === 0) navigate(`/login`);
    else navigate("/accounts");
  };

  const getCurrentUser = () => {
    return accountList.find((acc) => acc._id === currentAccountId);
  };

  const getOtherUsers = () => {
    return accountList.filter((acc) => acc._id !== currentAccountId);
  };

  const handleSwitchAccount = () => {
    navigate("/accounts");
  };

  return (
    <div className="searchContainer">
      <Logo cls="searchLogo" />
      {currentAccountId !== "" && accountList.length > 0 && (
        <>
          <div className="searchBar">
            <input
              type="search"
              placeholder="Search in mails"
              name="q"
              onChange={handleSearchChange}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="accountsClass" id="accounts">
            <div className="currentUserWrapper">
              <p className="currentUserName">{getCurrentUser().userName}</p>
              <p className="currentUserEmail">{getCurrentUser().email}</p>
            </div>

            <div className="accountBtn logout" onClick={handleCurrentLogout}>
              <button>
                <LogoutIcon /> <span>Logout</span>
              </button>
            </div>
            <div className="accountBtnContainer">
              <div
                className="accountBtn switchAccount"
                onClick={handleSwitchAccount}
              >
                <button>
                  <SwitchAccountOutlinedIcon />
                  Switch account
                </button>
              </div>
              <div
                className="accountBtn addAccount"
                onClick={handleAnotherLogin}
              >
                <button>
                  <PersonAddAltOutlinedIcon />
                  Add another account
                </button>
              </div>
            </div>
          </div>
          <div className="currentUser" onClick={handleChangeAccount}>
            {getCurrentUser().userName.charAt(0).toUpperCase()}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;
