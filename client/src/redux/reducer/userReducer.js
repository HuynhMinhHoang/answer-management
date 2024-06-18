import {
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
} from "../action/userAction";

const INITIAL_STATE = {
  user: {
    access_token: "",
    refresh_token: "",
    username: "",
    image: "",
    role: "",
    email: "",
  },
  isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: {
          access_token: action.payload.DT.access_token,
          refresh_token: action.payload.DT.refresh_token,
          username: action.payload.DT.username,
          image: action.payload.DT.image,
          role: action.payload.DT.role,
          email: action.payload.DT.email,
        },
        isAuthenticated: true,
      };

    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        user: {
          access_token: "",
          refresh_token: "",
          username: "",
          image: "",
          role: "",
          email: "",
        },
        isAuthenticated: false,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          username: action.payload.DT.username,
          image: action.payload.DT.image,
        },
      };

    default:
      return state;
  }
};

export default userReducer;
