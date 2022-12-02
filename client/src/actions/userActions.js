import axios from "axios";
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

export const registerUser =
  (name, email, password, confirmpassword) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST });

    try {
      const { data } = await axios.post("http://localhost:2001/api/register", {
        name,
        email,
        password,
        confirmpassword,
      });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem("userData", JSON.stringify(data));
    } catch (error) {
      dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    }
  };

export const signinUser = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST });

  try {
    const { data } = await axios.post("http://localhost:2001/api/signin", {
      email,
      password,
    });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userData", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
};

export const googleLogin = (tokenId) => async (dispatch) => {
  dispatch({ type: GOOGLE_REQUEST });

  try {
    const { data } = await axios.post(
      "http://localhost:2001/api/google-login",
      { tokenId }
    );

    dispatch({ type: GOOGLE_SUCCESS, payload: data });
    localStorage.setItem("userData", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: GOOGLE_FAIL, payload: error.message });
  }
};

export const signoutUser = () => async (dispatch) => {
  localStorage.removeItem("userData");
  dispatch({ type: USER_SIGNOUT });
};
