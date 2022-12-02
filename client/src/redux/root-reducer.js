import { combineReducers } from "redux";
import {
  emailReducer,
  emailDetailsReducer,
  emailDeleteReducer,
  emailEditReducer,
} from "../reducers/emailReducer";

import {
  userRegisterReducer,
  userSigninReducer,
} from "../reducers/userReducer";

const rootReducer = combineReducers({
  userRegister: userRegisterReducer,
  userSignin: userSigninReducer,
  emailDat: emailReducer,
  emailDetails: emailDetailsReducer,
  emailDelete: emailDeleteReducer,
  emailEdit: emailEditReducer,
});

export default rootReducer;
