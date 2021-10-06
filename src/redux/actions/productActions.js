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
