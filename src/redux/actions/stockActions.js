import * as API from "../../axios/index";
import * as types from "../types";

export const getProductsFromStock =
  (limit = 10, offset = 0) =>
  async (dispatch) => {
    try {
      const url = `http://185.237.253.254:8000/bolbol/stockList/?limit=${limit}&offset=${offset}`;
      const { data } = await API.getProductsFromStock(url);

      dispatch({
        type: types.GET_PRODUCTS_FROM_STOCK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: types.GET_PRODUCTS_FROM_STOCK_FAIL,
        payload: error.message,
      });
    }
  };
