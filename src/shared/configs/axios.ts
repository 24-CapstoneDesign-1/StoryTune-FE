import axios from "axios";
import { PAGE_URL } from "./path";

export const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const FORMAPI = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

const storageAccessKey = "JWT_ACCESS_TOKEN";

//Auth
export const storeAccess = (token: string) => {
  localStorage.setItem(storageAccessKey, token);
};

export const setAccess = (token: string) => {
  API.defaults.headers["Authorization"] = `Bearer ${token}`;
  FORMAPI.defaults.headers["Authorization"] = `Bearer ${token}`;
};

export const resetAccess = () => {
  delete API.defaults.headers["Authorization"];
  delete FORMAPI.defaults.headers["Authorization"];
  localStorage.removeItem(storageAccessKey);
};

export const getAccess = (): string | null => {
  return localStorage.getItem(storageAccessKey);
};

// API.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response && [401, 403].includes(error.response.status)) {
//       resetAccess();
//       location.href = PAGE_URL.SignIn;
//     }
//     return Promise.reject(error);
//   }
// );

// FORMAPI.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response && [401, 403].includes(error.response.status)) {
//       resetAccess();
//       location.href = PAGE_URL.SignIn;
//     }
//     return Promise.reject(error);
//   }
// );

