import * as types from "../types";

const initialState = {
  products: [],
  currentCategory: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        error: null,
        products: action.payload,
      };

    case types.USER_LOGIN_FAIL:
      return {
        error: action.payload,
      };

    case types.SELECT_CATEGORY:
      return {
        ...state,
        error: null,
        currentCategory: action.payload,
      };

  
    case types.USER_LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default productReducer;
