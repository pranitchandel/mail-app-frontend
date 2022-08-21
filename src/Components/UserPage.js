import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import MailSection from "./MailSection";
import setAuthToken from "./Utils/setAuthToken";
import { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";

export const UserContext = createContext();

const UserPage = () => {
  const currentId = useParams();
  const navigate = useNavigate();

  const [mailCategory, setMailCategory] = useState("inbox");
  const [refresh, setRefresh] = useState(false);
  const rootUrl = "http://localhost:5000";
  const [user, setUser] = useState({});
  const [activeUserList, setActiveUserList] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [removeUser, setRemoveUser] = useState(false);

  const updateActiveUserList = useCallback(() => {
    console.log(currentUser);
    const tokenString = localStorage.getItem("jwtTokenList");
    const token = JSON.parse(tokenString);
    let currentToken = token[token.length - 1];
    console.log(refresh);
    const decodedIdArray = token.map((tok, key) => {
      let currentDecodedId = jwtDecode(tok).id;
      if (
        (currentDecodedId === currentUser._id || refresh) &&
        currentId.id === currentDecodedId
      ) {
        console.log("Entered in map");
        console.log(currentToken);
        currentToken = tok;
      }
      return currentDecodedId;
    });
    let removeId;
    if (removeUser) {
      console.log("is it entering here??");
      decodedIdArray.forEach((decodedId, key) => {
        console.log(decodedId + " " + key);
        if (decodedId === currentId.id) {
          console.log("found");
          token.splice(key, 1);
          localStorage.setItem("jwtTokenList", JSON.stringify(token));
          removeId = key;
          currentToken = token[token.length - 1];
          return;
        }
      });
      decodedIdArray.splice(removeId, 1);
    }
    navigate(`/user/${decodedIdArray[decodedIdArray.length - 1]}`);
    console.log(currentToken);

    setActiveUserList(decodedIdArray);

    if (token.length > 0) {
      setAuthToken(currentToken);
      axios
        .get(`${rootUrl}/api/users/current`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => console.log(err));
      return;
    } else {
      navigate("/login");
    }
  }, [currentUser, removeUser]);

  useEffect(() => {
    console.log("changes current user", currentUser);
    updateActiveUserList();
  }, [updateActiveUserList]);
  return (
    <UserContext.Provider value={{ activeUserList, user }}>
      <div>
        <SearchBar
          setCurrentUser={setCurrentUser}
          setRemoveUser={setRemoveUser}
        />
        <div className="mainSection">
          <NavBar
            setMailCategory={setMailCategory}
            setRefresh={setRefresh}
            setCurrentUser={setCurrentUser}
          />
          <MailSection
            mailCategory={mailCategory}
            refresh={refresh}
            setCurrentUser={setCurrentUser}
          />
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default UserPage;
