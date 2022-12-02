import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNOUT,
  GOOGLE_REQUEST,
  GOOGLE_SUCCESS,
  GOOGLE_FAIL,
} from "../constants/userConstants";

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userData: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userData: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case GOOGLE_REQUEST:
      return { loading: true };
    case GOOGLE_SUCCESS:
      return { loading: false, userData: action.payload };
    case GOOGLE_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};

// export const googleReducer = (state = {}, action) => {
//   switch (action.type) {
//     default:
//       return state;
//   }
// };
