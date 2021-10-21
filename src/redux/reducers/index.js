import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import stockReducer from "./stockReducer";

const reducers = combineReducers({
  users: userReducer,
  products: productReducer,
  stock: stockReducer,
});

export default reducers;
