import axios from "axios";

const API = axios.create({
  baseURL: "https://bebolbol.herokuapp.com/",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("authorization")) {
    req.headers.Authorization = `Token ${
      JSON.parse(localStorage.getItem("authorization")).token
    }`;
  }
  return req;
});

/* user actions */

export const userLogin = async (userData) =>
  await axios.post(
    "https://bebolbol.herokuapp.com/accounts/auth/login/",
    userData
  );

/* data actions */

export const fetchProducts = async (url) => await API.get(url);
