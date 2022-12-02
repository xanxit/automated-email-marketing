import axios from "axios";
import { useSelector } from "react-redux";
import emailActionTypes from "../constants/emailConstants";

export const getEmailData = () => async (dispatch, getState) => {
  dispatch({ type: emailActionTypes.DATA_LOADING_START });

  try {
    const { data } = await axios.get("http://localhost:2001/api/getmail");

    dispatch({ type: emailActionTypes.DATA_LOADING_SUCCESS, payload: data });
    localStorage.setItem(
      "emailData",
      JSON.stringify(getState().emailDat.emailData)
    );
  } catch (error) {
    dispatch({ type: emailActionTypes.DATA_LOADING_FAIL, payload: error });
  }
};

export const postEmailData = (info) => async (dispatch) => {
  dispatch({ type: emailActionTypes.DATA_SENDING_START });

  try {
    // const userSignin = useSelector((state) => state.userSignin);
    // const { userData } = userSignin;
    // const config = {
    //   headers: { Authorization: `Bearer ${userData.token}` },
    // };
    // console.log(userData);
    const { data } = await axios.post(
      "http://localhost:2001/api/postmail",
      info
    );
    dispatch({ type: emailActionTypes.DATA_SENDING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: emailActionTypes.DATA_SENDING_FAIL, payload: error });
  }
};

export const detailsEmail = (emailId) => async (dispatch) => {
  dispatch({ type: emailActionTypes.EMAIL_DETAILS_REQUEST, payload: emailId });
  try {
    const { data } = await axios.get(
      `http://localhost:2001/api/getmail/${emailId}`
    );
    dispatch({ type: emailActionTypes.EMAIL_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: emailActionTypes.EMAIL_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteEmail = (emailId) => async (dispatch) => {
  dispatch({ type: emailActionTypes.EMAIL_DELETE_REQUEST });
  try {
    axios.delete(`http://localhost:2001/api/mail/${emailId}`);
    dispatch({ type: emailActionTypes.EMAIL_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: emailActionTypes.EMAIL_DELETE_FAIL,
      payload: error.message,
    });
  }
};

export const emailPostEdit = (id, updatedEmail) => async (dispatch) => {
  try {
    const { data } = await axios.patch(
      `http://localhost:2001/api/mail/${id}`,
      id,
      updatedEmail
    );

    dispatch({ type: emailActionTypes.UPDATE_EMAIL, payload: data });
  } catch (error) {
    console.log(error);
  }
};
