import * as React from "react";
import { ReactElement, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  CLIENT_ABOUT_US_ROUTE,
  CLIENT_CONFIRM_EMAIL_ROUTE,
  CLIENT_HOME_ROUTE,
  CLIENT_LOGIN_ROUTE,
  CLIENT_REGISTRATION_ROUTE,
} from "../../constant/route";
import { ClientHomeScreen } from "../../screen/ClientHomeScreen";
import { ClientAboutUsScreen } from "../../screen/ClientAboutUsScreen";
import { ClientRegistrationScreen } from "../../screen/ClientRegistrationScreen";
import { ClientLoginScreen } from "../../screen/ClientLoginScreen";
import { PREFIX_PARAM, TOKEN_PARAM } from "../../constant/route-params";
import { ClientConfirmEmailScreen } from "../../screen/ClientConfirmEmailScreen";
import { ADMIN_JWT_COOKIE } from "../../constant/cookie";
import { axios } from "../../util/AxiosInterceptor";
import { BACKEND_URL } from "../../constant/environment";
import { ADMIN_AUTHORISATION_STATUS_API } from "../../constant/api";
import { AxiosResponse } from "axios";
import { useCookies } from "react-cookie";
import { Spinner } from "../../component/Spinner";
import { AdminAuthorisationStatusResponse } from "../../dto/response/AdminAuthorisationStatusResponse";
import { Typography } from "@mui/material";

export const AdminRouting = (): ReactElement => {
  const [, , removeCookie] = useCookies([ADMIN_JWT_COOKIE]);
  const [admin, setAdmin] = useState<AdminAuthorisationStatusResponse | null>(
    null
  );

  useEffect(() => {
    axios
      .get(BACKEND_URL + ADMIN_AUTHORISATION_STATUS_API)
      .then((response: AxiosResponse<AdminAuthorisationStatusResponse>) => {
        setAdmin(response.data);
      })
      .catch(() => {
        removeCookie(ADMIN_JWT_COOKIE);
        window.location.reload();
      });
  }, [removeCookie]);

  if (!admin) {
    return <Spinner />;
  }

  return (
    <Typography>admin</Typography>
    /*
    <BrowserRouter>
      <Routes>
        <Route path={CLIENT_HOME_ROUTE} element={<ClientHomeScreen />} />
        <Route path={CLIENT_ABOUT_US_ROUTE} element={<ClientAboutUsScreen />} />
        <Route
          path={CLIENT_REGISTRATION_ROUTE}
          element={<ClientRegistrationScreen />}
        />
        <Route path={CLIENT_LOGIN_ROUTE} element={<ClientLoginScreen />} />
        <Route
          path={CLIENT_CONFIRM_EMAIL_ROUTE + PREFIX_PARAM + TOKEN_PARAM}
          element={<ClientConfirmEmailScreen />}
        />
        <Route path={"/!*"} element={<Navigate to={CLIENT_HOME_ROUTE} />} />
      </Routes>
    </BrowserRouter>
    */
  );
};
