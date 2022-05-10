import * as React from "react";
import { ReactElement } from "react";
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

export const UnauthorizedClientRouting = (): ReactElement => {
  return (
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
        <Route path={"/*"} element={<Navigate to={CLIENT_HOME_ROUTE} />} />
      </Routes>
    </BrowserRouter>
  );
};
