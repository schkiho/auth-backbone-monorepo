import axios from "axios";
import {
  AUTH_SIGN_IN,
  AUTH_ERROR,
  AUTH_SIGN_UP,
  AUTH_SIGN_OUT,
  DASHBOARD_GET_DATA
} from "./types";

/*
ActionCreaters -> create/return Actions ({}) -> dispatched -> middlewares -> reducers
*/

export const signUp = data => {
  return async dispatch => {
    /*
    Step 1) use the data and to make HTTP request to our Backend and send it along
    Step 2) take the BE's response (jwtToken is here now)
    Step 3) Dispatch user just signed up (with jwtToken)
    Step 4) Save the jwtToken into our localStorage
    */

    try {
      const res = await axios.post("/users/signup", data);

      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data.token
      });

      localStorage.setItem("JWT_TOKEN", res.data.token);
      axios.defaults.headers.common["Authorization"] = res.data.token;
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: "Email is already in use."
      });
    }
  };
};

export const signIn = data => {
  return async dispatch => {
    try {
      const res = await axios.post("/users/signin", data);

      dispatch({
        type: AUTH_SIGN_IN,
        payload: res.data.token
      });

      localStorage.setItem("JWT_TOKEN", res.data.token);
      axios.defaults.headers.common["Authorization"] = res.data.token;
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: "Credentials are not valid."
      });
    }
  };
};

export const getDashBoard = () => {
  return async dispatch => {
    try {
      const res = await axios.get("/users/secret");

      dispatch({
        type: DASHBOARD_GET_DATA,
        payload: res.data.secret
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const signOut = () => {
  return dispatch => {
    localStorage.removeItem("JWT_TOKEN");

    axios.defaults.headers.common["Authorization"] = "";

    dispatch({
      type: AUTH_SIGN_OUT,
      payload: ""
    });
  };
};
