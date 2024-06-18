export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";

export const doLogin = (data) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: data,
  };
};

export const doLogout = () => ({
  type: LOGOUT_USER_SUCCESS,
});

export const doUpdateUser = (data) => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: data,
  };
};
