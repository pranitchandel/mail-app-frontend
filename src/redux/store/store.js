import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { reducers } from "../../redux/reducers";
import persistReducers from "../store/persistReducer";
import { persistStore } from "redux-persist";

// const persistant = persistReducer();
export const store = createStore(
  persistReducers(reducers),
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
