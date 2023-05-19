import { ACCOUNT_LIST, SET_TOKEN } from "../actionTypes";

export const setAccountList = (accountList) => async (dispatch) => {
  dispatch({
    type: ACCOUNT_LIST,
    payload: accountList,
  });
};

export const setToken = (token) => async (dispatch) => {
  dispatch({
    type: SET_TOKEN,
    payload: token,
  });
};
