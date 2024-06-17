import axios from "axios";
import NProgress from "nprogress";
import { store } from "../redux/store";

NProgress.configure({
  showSpinner: false,
  // easing: 'ease'
  // speed: 500,
  // trickle Rate: 0.5,
  // easing: 'ease',
  // speed: 200, I
  // trickle: true,
  // trickleRate: 0.02,
  trickleSpeed: 100,
});

const instance = axios.create({
  baseURL: "http://localhost:8081",
  //   timeout: 1000,
  //   headers: { "X-Custom-Header": "foobar" },
});

instance.interceptors.request.use(
  function (config) {
    const accessToken = store?.getState()?.userRedux?.user?.access_token;
    config.headers["Authorization"] = "Bearer " + accessToken;
    NProgress.start();

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    NProgress.done();

    return response && response.data ? response.data : response;
  },
  function (error) {
    NProgress.done();

    // Token expired or invalid
    if (
      error.response &&
      (error.response.status === 401 || error.response.data.EC === -1)
    ) {
      store.dispatch({ type: "LOGOUT_USER_SUCCESS" });
      window.location.href = "/login";
    }

    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default instance;
