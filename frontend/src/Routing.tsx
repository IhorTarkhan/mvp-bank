import * as React from "react";
import { ReactElement } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  CLIENT_CONFIRM_EMAIL_ROUTE,
  CLIENT_REGISTRATION_ROUTE,
  HOME_ROUTE,
} from "./constant/route";
import { ClientConfirmEmailScreen } from "./screen/ClientConfirmEmailScreen";
import { PREFIX_PARAM, TOKEN_PARAM } from "./constant/routeParams";
import { useCookies } from "react-cookie";
import { CLIENT_JWT_COOKIE } from "./constant/cookie";
import { ClientHomeScreen } from "./screen/ClientHomeScreen";
import { ClientRegistrationScreen } from "./screen/ClientRegistrationScreen";
import { ClientRouting } from "./ClientRouting";

export const Routing = (): ReactElement => {
  const [cookie] = useCookies([CLIENT_JWT_COOKIE]);

  if (cookie[CLIENT_JWT_COOKIE]) {
    return <ClientRouting />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME_ROUTE} element={<ClientHomeScreen />} />
        <Route
          path={CLIENT_REGISTRATION_ROUTE}
          element={<ClientRegistrationScreen />}
        />
        <Route
          path={CLIENT_CONFIRM_EMAIL_ROUTE + PREFIX_PARAM + TOKEN_PARAM}
          element={<ClientConfirmEmailScreen />}
        />
        <Route path={"/*"} element={<Navigate to={HOME_ROUTE} />} />
      </Routes>
    </BrowserRouter>
  );
};
