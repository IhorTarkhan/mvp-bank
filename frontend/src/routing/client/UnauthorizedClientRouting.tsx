import * as React from "react";
import { ReactElement } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  ADMIN_LOGIN_ROUTE,
  CLIENT_CONFIRM_EMAIL_ROUTE,
  CLIENT_HOME_ROUTE,
  CLIENT_REGISTRATION_ROUTE,
} from "../../constant/route";
import { ClientHomeScreen } from "../../screen/client/ClientHomeScreen";
import { ClientRegistrationScreen } from "../../screen/client/ClientRegistrationScreen";
import { PREFIX_PARAM, TOKEN_PARAM } from "../../constant/route-params";
import { ClientConfirmEmailScreen } from "../../screen/client/ClientConfirmEmailScreen";
import { AdminLoginScreen } from "../../screen/admin/AdminLoginScreen";

export const UnauthorizedClientRouting = (): ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={CLIENT_HOME_ROUTE} element={<ClientHomeScreen />} />
        <Route
          path={CLIENT_REGISTRATION_ROUTE}
          element={<ClientRegistrationScreen />}
        />
        <Route
          path={CLIENT_CONFIRM_EMAIL_ROUTE + PREFIX_PARAM + TOKEN_PARAM}
          element={<ClientConfirmEmailScreen />}
        />
        <Route path={ADMIN_LOGIN_ROUTE} element={<AdminLoginScreen />} />
        <Route path={"/*"} element={<Navigate to={CLIENT_HOME_ROUTE} />} />
      </Routes>
    </BrowserRouter>
  );
};
