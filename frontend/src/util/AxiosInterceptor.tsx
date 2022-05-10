import { CLIENT_JWT_COOKIE } from "../constant/cookie";
import { AxiosResponse } from "axios";

export const axios = require("axios");

axios.interceptors.request.use((req: { headers: any; url: string }) => {
  const clientHeader: string | undefined = document.cookie
    .split(";")
    .map((it) => it.trim())
    .filter((it) => it.startsWith(CLIENT_JWT_COOKIE + "="))
    .map((it) => it.substring(CLIENT_JWT_COOKIE.length + 1))
    .map((it) => it.split(",")[0].trim())
    .pop();
  req.headers["Authorization"] = clientHeader ? "Bearer " + clientHeader : "";
  return req;
});

axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    console.error(error);
    if (error.toJSON().status === 500) {
      alert(500);
    }
    return Promise.reject({ ...error }.response.status);
  }
);
