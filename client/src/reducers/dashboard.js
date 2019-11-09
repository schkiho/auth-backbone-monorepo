import { DASHBOARD_GET_DATA, AUTH_SIGN_OUT } from "../actions/types";

const DEFAULT_STATE = {
  dashboard: ""
};

const dashReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case DASHBOARD_GET_DATA:
      return {
        ...state,
        dashboard: action.payload
      };
    case AUTH_SIGN_OUT:
      return {
        ...state,
        dashboard: ""
      };
    default:
      return state;
  }
};

export default dashReducer;
