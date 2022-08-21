import { useCallback, useContext, useEffect, useState } from "react";
import Logo from "./Logo";
import { UserContext } from "./UserPage";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SearchBar = ({ setCurrentUser, setRemoveUser }) => {
  const rootUrl = "http://localhost:5000";
  const currentAccountId = useParams();

  const initialText = "";
  const { activeUserList, user } = useContext(UserContext);
  const [search, setSearch] = useState(initialText);
  const [activeUserNamesArray, setActiveUserNamesArray] = useState([]);
  const navigate = useNavigate();

  const getActiveArray = useCallback(async () => {
    const res = await Promise.all(
      activeUserList.map((id) =>
        axios
          .get(`${rootUrl}/api/users/userId/${id}`)
          .then((res) => {
            return res.data;
          })
          .catch((err) => console.log(err))
      )
    );
    console.log(res);
    setActiveUserNamesArray(res);
    return res;
  }, [activeUserList]);
  useEffect(() => {
    getActiveArray();
  }, [getActiveArray]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleAccountClick = (usr) => {
    document.getElementById("accounts").style.display = "none";
    setCurrentUser(usr);
    navigate(`/user/${usr._id}`);
  };

  const handleAccount = () => {
    handleChangeAccount();
    localStorage.removeItem("jwtTokenList");
    navigate("/login");
  };

  const handleSearch = () => {};
  const handleChangeAccount = () => {
    const x = document.getElementById("accounts");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  };

  const handleAnotherLogin = () => {
    navigate(`/login`);
  };
  const handleCurrentLogout = () => {
    console.log("clicked");
    setRemoveUser(true);
    navigate(`/user/${currentAccountId.id}`);
  };
  return (
    <div className="searchContainer">
      <Logo cls="searchLogo" />
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
        <ul>
          {activeUserNamesArray.map((usr, key) => {
            return (
              <li key={key} onClick={() => handleAccountClick(usr)}>
                {usr.userName}
              </li>
            );
          })}
          <div className="accountBtn newLogin" onClick={handleAnotherLogin}>
            <button>Login another account</button>
          </div>
          <div
            className="accountBtn logoutCurrent"
            onClick={handleCurrentLogout}
          >
            <button>Logout current</button>
          </div>
          <div
            className="accountBtn logout"
            onClick={() => {
              handleAccount();
            }}
          >
            <button>Logout all accounts</button>
          </div>
        </ul>
      </div>
      <div className="currentUser" onClick={handleChangeAccount}>
        {Object.keys(user).length > 0
          ? user.userName.charAt(0).toUpperCase()
          : ""}
      </div>
    </div>
  );
};

export default SearchBar;
