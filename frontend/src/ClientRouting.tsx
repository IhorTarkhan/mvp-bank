import * as React from "react";
import { ReactElement, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  CLIENT_CABINET_ROUTE,
  CLIENT_CONFIRM_EMAIL_ROUTE,
  CLIENT_REGISTRATION_SUCCESS_ROUTE,
} from "./constant/route";
import { ClientCabinetScreen } from "./screen/ClientCabinetScreen";
import { ClientConfirmEmailScreen } from "./screen/ClientConfirmEmailScreen";
import { PREFIX_PARAM, TOKEN_PARAM } from "./constant/routeParams";
import { ClientRegistrationSuccessScreen } from "./screen/ClientRegistrationSuccessScreen";
import { ClientAuthorisationStatusResponse } from "./dto/response/ClientAuthorisationStatusResponse";
import { axios } from "./util/AxiosInterceptor";
import { CLIENT_AUTHORISATION_STATUS_API } from "./constant/api";
import { AxiosResponse } from "axios";
import { BACKEND_URL } from "./constant/environment";
import { useCookies } from "react-cookie";
import { CLIENT_JWT_COOKIE } from "./constant/cookie";
import { Spinner } from "./component/Spinner";

export const ClientRouting = (): ReactElement => {
  const [, , removeCookie] = useCookies([CLIENT_JWT_COOKIE]);
  const [client, setClient] =
    useState<ClientAuthorisationStatusResponse | null>(null);

  useEffect(() => {
    axios
      .get(BACKEND_URL + CLIENT_AUTHORISATION_STATUS_API)
      .then((response: AxiosResponse<ClientAuthorisationStatusResponse>) => {
        setClient(response.data);
      })
      .catch(() => {
        removeCookie(CLIENT_JWT_COOKIE);
      });
  }, []);

  if (!client) {
    return <Spinner />;
  }

  if (!client.emailVerified) {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path={CLIENT_REGISTRATION_SUCCESS_ROUTE}
            element={<ClientRegistrationSuccessScreen />}
          />
          <Route
            path={CLIENT_CONFIRM_EMAIL_ROUTE + PREFIX_PARAM + TOKEN_PARAM}
            element={<ClientConfirmEmailScreen />}
          />
          <Route
            path={"/*"}
            element={<Navigate to={CLIENT_REGISTRATION_SUCCESS_ROUTE} />}
          />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={CLIENT_CABINET_ROUTE} element={<ClientCabinetScreen />} />
        <Route path={"/*"} element={<Navigate to={CLIENT_CABINET_ROUTE} />} />
      </Routes>
    </BrowserRouter>
  );
};
