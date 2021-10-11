import * as API from "../../axios/index";
import * as types from "../types";

export const fetchProducts = () => async (dispatch) => {
  try {
    const { data } = await API.fetchProducts();
    console.log("🚀 ~ file: productActions.js ~ line 7 ~ fetchProducts ~ data", data)
    console.log("🚀 ~ file: productActions.js ~ line 14 ~ fetchProducts ~ data?.results", data?.results)


    dispatch({
      type: types.FETCH_PRODUCTS_SUCCESS,
      payload: data?.results || [],
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

