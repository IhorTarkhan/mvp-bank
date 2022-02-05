import * as React from "react";
import { ReactElement } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./screen/HomeScreen";
import {
  CLIENT_CABINET_ROUTE,
  CLIENT_CONFIRM_EMAIL_ROUTE,
  CLIENT_REGISTRATION_ROUTE,
  CLIENT_REGISTRATION_SUCCESS_ROUTE,
  HOME_ROUTE,
} from "./constant/route";
import { ClientCabinetScreen } from "./screen/ClientCabinetScreen";
import { ClientConfirmEmailScreen } from "./screen/ClientConfirmEmailScreen";
import { PREFIX_PARAM, TOKEN_PARAM } from "./constant/routeParams";
import { ClientRegistrationScreen } from "./screen/ClientRegistrationScreen";
import { useCookies } from "react-cookie";
import { CLIENT_JWT_COOKIE } from "./constant/cookie";
import { ClientRegistrationSuccessScreen } from "./screen/ClientRegistrationSuccessScreen";

export const Routing = (): ReactElement => {
  const [cookie] = useCookies([CLIENT_JWT_COOKIE]);
  console.log("cookie", cookie);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME_ROUTE} element={<HomeScreen />} />
        <Route path={CLIENT_CABINET_ROUTE} element={<ClientCabinetScreen />} />
        <Route
          path={CLIENT_REGISTRATION_ROUTE}
          element={<ClientRegistrationScreen />}
        />
        <Route
          path={CLIENT_REGISTRATION_ROUTE}
          element={<ClientRegistrationScreen />}
        />
        <Route
          path={CLIENT_REGISTRATION_SUCCESS_ROUTE}
          element={<ClientRegistrationSuccessScreen />}
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
