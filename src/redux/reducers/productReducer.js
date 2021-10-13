import * as types from "../types";

const initialState = {
  products: [],
  currentCategory: null,
  nextUrl: null,
  previousUrl: null,
  totalNumberOfProducts: 0,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        error: null,
        nextUrl: action.payload?.next.slice(31),
        previousUrl: action.payload?.previous
          ? action.payload?.previous?.slice(31)
          : null,
        totalNumberOfProducts: action.payload?.count,
        products: action.payload?.results,
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
