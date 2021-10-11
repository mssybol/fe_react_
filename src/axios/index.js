import axios from "axios";

const API = axios.create({
  baseURL: "https://bebolbol.herokuapp.com/",
});

/* user actions */

export const userLogin = async (userData) =>
  await API.post("accounts/auth/login/", userData);

/* data actions */

export const fetchProducts = async () =>
  await API.get("kruidvat/kruidvatInventory/");
