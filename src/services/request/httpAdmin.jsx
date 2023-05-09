import axios from "axios";
import Cookie from "js-cookie";

const http = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_API_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    TokenCybersoft: process.env.REACT_APP_TOKEN,
  },
});

http.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${Cookie.get("ACCESS_TOKEN_ADMIN")}`,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
