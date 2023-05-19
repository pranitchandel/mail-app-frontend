import { ACCOUNT_LIST, SET_TOKEN } from "../actionTypes";
const initialState = {
  accountList: [],
  token: [],
};

const loginReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACCOUNT_LIST: {
      return {
        ...state,
        accountList: payload,
      };
    }
    case SET_TOKEN: {
      return {
        ...state,
        token: payload,
      };
    }
    default:
      return state;
  }
};

export default loginReducer;
