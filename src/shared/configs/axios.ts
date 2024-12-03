import axios from "axios";
import { PAGE_URL } from "./path";

export const API = axios.create({
  baseURL: '/api',
  headers: {
    "Content-Type": "application/json",
  },
});

export const FORMAPI = axios.create({
  baseURL: '/api',
  headers: {
    "Content-Type": "application/json",
  },
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

API.interceptors.request.use(
  (config) => {
    const token = getAccess();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Request Config:', {
      url: config.url,
      headers: config.headers,
      method: config.method
    });
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);



// FORMAPI도 동일하게 적용
FORMAPI.interceptors.request.use(
  (config) => {
    const token = getAccess();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
