import * as types from "../types";

const initialState = {
  userInfo: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_LOGIN_SUCCESS:
      localStorage.setItem(
        "X-Auth-Token",
        JSON.stringify(action.payload.data.key)
      );
      return {
        userInfo: action.payload.data,
      };

    case types.USER_LOGIN_FAIL:
      return {
        error: action.payload,
      };

    case types.USER_LOGOUT:
      localStorage.removeItem("X-Auth-Token");

      return initialState;

    default:
      return state;
  }
};

export default userReducer;
