import * as API from "../../axios/index";
import * as types from "../types";

export const fetchProducts =
  (category, limit = 25, offset = 0) =>
  async (dispatch) => {
    try {
      let url = `http://185.237.253.254:8000/kruidvat/kruidvatInventory/?limit=${limit}&offset=${offset}`;
      if (category === "Drogist")
        url = `http://185.237.253.254:8000/drogist/DrogistInventory/?limit=${limit}&offset=${offset}`;
      if (category === "Etos")
        url = `http://185.237.253.254:8000/etos/EtosInventory/?limit=${limit}&offset=${offset}`;

      const { data } = await API.fetchProducts(url);

      dispatch({
        type: types.FETCH_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_PRODUCTS_FAIL,
        payload: error.message,
      });
    }
  };

export const selectCategory = (categoryName) => (dispatch) => {
  dispatch({
    type: types.SELECT_CATEGORY,
    payload: categoryName,
  });
};
