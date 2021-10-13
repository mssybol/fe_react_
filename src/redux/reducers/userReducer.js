import * as types from "../types";

const initialState = {
  userInfo: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_LOGIN_SUCCESS:
      localStorage.setItem(
        "authorization",
        JSON.stringify({
          isLogin: true,
          token: action.payload.data.key,
        })
      );

      return {
        userInfo: action.payload.data,
      };

    case types.USER_LOGIN_FAIL:
      return {
        error: action.payload,
      };

    case types.USER_LOGOUT:
      localStorage.setItem(
        "authorization",
        JSON.stringify({
          isLogin: false,
          token: null,
        })
      );

      return initialState;

    default:
      return state;
  }
};

export default userReducer;
