import axios from "axios";
import jwtDecode from "jwt-decode";
import { request } from "../../services/request";

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const updateActiveUserList = async (tokens) => {
  const decodedResult = await Promise.all(
    tokens.map(async (tok, key) => {
      const res = await request({
        url: `/api/users/userId/${tok.userId}`,
        token: tok.token,
      })
        .then((res) => {
          return res.data;
        })
        .catch((err) => console.log(err));
      return res;
    })
  );
  return decodedResult;
};

export const createIdToken = async (tokens) => {
  return tokens.map((token) => {
    const userId = jwtDecode(token).id;
    return {
      userId: userId,
      token: token,
    };
  });
};
