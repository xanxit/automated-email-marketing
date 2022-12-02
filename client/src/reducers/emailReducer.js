import emailActionTypes from "../constants/emailConstants";

export const emailReducer = (state = {}, action) => {
  switch (action.type) {
    case emailActionTypes.DATA_LOADING_START:
      return {
        ...state,
        loading: true,
      };
    case emailActionTypes.DATA_LOADING_SUCCESS:
      return {
        ...state,
        loading: false,
        emailData: action.payload,
      };
    case emailActionTypes.DATA_LOADING_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case emailActionTypes.DATA_SENDING_START:
      return {
        ...state,
        sending: true,
      };
    case emailActionTypes.DATA_SENDING_SUCCESS:
      return {
        ...state,
        sending: false,
        postEmailData: action.payload,
      };
    case emailActionTypes.DATA_SENDING_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const emailDetailsReducer = (
  state = { loading: true, error: null, emailInfo: {} },
  action
) => {
  switch (action.type) {
    case emailActionTypes.EMAIL_DETAILS_REQUEST:
      return { ...state, loading: true };
    case emailActionTypes.EMAIL_DETAILS_SUCCESS:
      return { ...state, loading: false, emailInfo: action.payload };
    case emailActionTypes.EMAIL_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const emailDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case emailActionTypes.EMAIL_DELETE_REQUEST:
      return { loading: true };
    case emailActionTypes.EMAIL_DELETE_SUCCESS:
      return { loading: true };
    case emailActionTypes.EMAIL_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const emailEditReducer = (state = {}, action) => {
  switch (action.type) {
    case emailActionTypes.UPDATE_EMAIL:
      return { loading: false, emailUpdate: action.payload };
    default:
      return state;
  }
};
