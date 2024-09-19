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
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const storageAccessKey = "JWT_ACCESS";

//Auth
export const storeAccess = (token: string) => {
  localStorage.setItem(storageAccessKey, token);
};

export const setAccess = (token: string) => {
  API.defaults.headers["Authorization"] = token;
  FORMAPI.defaults.headers["Authorization"] = token;
};

export const resetAccess = () => {
  delete API.defaults.headers["Authorization"];
  delete FORMAPI.defaults.headers["Authorization"];
  localStorage.removeItem(storageAccessKey);
};

export const getAccess = (): string | null => {
  return localStorage.getItem(storageAccessKey);
};

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const {
      response: {
        data: { code },
      },
      config,
    } = error;

    if (code === "TOKEN4002") {
      const token = getAccess();

      if (token) {
        setAccess(token);
        config.headers["Authorization"] = token;

        return API.request(config);
      } else {
        resetAccess();
        location.href = PAGE_URL.SignIn;
      }
    }
    if (code === "TOKEN4001") {
      resetAccess();
      location.href = PAGE_URL.SignIn;
    }
  }
);
