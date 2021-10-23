import * as types from "../types";

const initialState = {
  stockList: [],
  totalNumberOfStockList: 0,
};

const stockReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PRODUCTS_FROM_STOCK_SUCCESS:
      return {
        ...state,
        stockList: action.payload.results,
        totalNumberOfStockList: action.payload.count,
      };

    case types.GET_PRODUCTS_FROM_STOCK_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default stockReducer;
