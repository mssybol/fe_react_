import * as API from "../../axios/index";
import * as types from "../types";

export const userLogin = (userData) => async (dispatch) => {
  try {
    const result = await API.userLogin(userData);

    dispatch({
      type: types.USER_LOGIN_SUCCESS,
      payload: { result, userData },
    });
  } catch ({ message, response }) {
    let error = response.data.non_field_errors[0];
    console.log(error);
    dispatch({
      type: types.USER_LOGIN_FAIL,
      payload: error,
    });
  }
};

export const userLogout = () => async (dispatch) => {
  dispatch({
    type: types.USER_LOGOUT,
  });
};
