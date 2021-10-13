import * as API from "../../axios/index";
import * as types from "../types";

export const fetchProducts =
  (
    url = "https://bebolbol.herokuapp.com/kruidvat/kruidvatInventory/?limit=25&offset=0"
  ) =>
  async (dispatch) => {
    try {
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
