import { CLIENT_JWT_COOKIE } from "../constant/cookie";

export const axios = require("axios");

axios.interceptors.request.use((req: { headers: any; url: string }) => {
  const clientHeader: string | undefined = document.cookie
    .split(";")
    .map((it) => it.trim())
    .filter((it) => it.startsWith(CLIENT_JWT_COOKIE + "="))
    .map((it) => it.split(",")[0].trim())
    .pop();
  req.headers["Authorization"] = clientHeader || "";
  return req;
});
