import * as API from "../../axios/index";
import * as types from "../types";

export const fetchProducts = () => async (dispatch) => {
  try {
    const { data } = await API.fetchProducts();

    console.log(data);

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

export const removeFilterCategory = () => (dispatch) => {
  dispatch({
    type: types.REMOVE_FILTER_CATEGORY,
  });
};
