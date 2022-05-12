import { ADMIN_JWT_COOKIE, CLIENT_JWT_COOKIE } from "../constant/cookie";
import { AxiosResponse } from "axios";

export const axios = require("axios");

type Request = { headers: any; url: string };

function setToHeaderFrom(req: Request, cookie: string, header: string) {
  const clientHeader: string | undefined = document.cookie
    .split(";")
    .map((it) => it.trim())
    .filter((it) => it.startsWith(cookie + "="))
    .map((it) => it.substring(cookie.length + 1))
    .map((it) => it.split(",")[0].trim())
    .pop();
  req.headers[header] = clientHeader ? "Bearer " + clientHeader : "";
}

axios.interceptors.request.use((req: Request) => {
  setToHeaderFrom(req, CLIENT_JWT_COOKIE, "Authorization");
  setToHeaderFrom(req, ADMIN_JWT_COOKIE, "Authorization-Admin");
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
