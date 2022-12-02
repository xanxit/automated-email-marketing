import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./root-reducer";

const initialState = {
  userSignin: {
    userData: localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : [],
  },
  emailDat: {
    emailData: localStorage.getItem("emailData")
      ? JSON.parse(localStorage.getItem("emailData"))
      : [],
  },
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
