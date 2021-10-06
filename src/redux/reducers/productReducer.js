import * as types from "../types";

const initialState = {
  products: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
      };

    case types.USER_LOGIN_FAIL:
      return {
        error: action.payload,
      };

    default:
      return state;
  }
};

export default productReducer;
