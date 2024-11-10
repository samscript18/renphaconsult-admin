import axios from "axios";
import toast from "react-hot-toast";
import { TokenStorage, UserStorage } from "../utils/localStorage";
import secrets from "../constants/secrets.const";

export const http = axios.create({
  baseURL: secrets.apiUrl,
});

export const https = axios.create({
  baseURL: secrets.apiUrl,
});

https.interceptors.request.use((request) => {
  const accessToken = TokenStorage.get();

  if (accessToken) {
    request.headers["authorization"] = `Bearer ${accessToken}`;
  }

  return request;
});

https.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403) {
      TokenStorage.remove();
      UserStorage.remove();
      await toast.error("Session Expired", {
        duration: 3000,
      });
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
