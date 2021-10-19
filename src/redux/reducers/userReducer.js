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
          token: action.payload.result.data.key,
        })
      );

      localStorage.setItem(
        "authorizationInfo",
        JSON.stringify(action.payload.userData)
      );

      return {
        userInfo: action.payload.result.data,
      };

    case types.USER_LOGIN_FAIL:
      return {
        error: action.payload,
      };

    case types.USER_LOGOUT:
      localStorage.removeItem("authorizationInfo");
      
      localStorage.removeItem("authorization");

      return initialState;

    default:
      return state;
  }
};

export default userReducer;
