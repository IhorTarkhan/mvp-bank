import * as React from "react";
import { ReactElement } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./screen/HomeScreen";
import {
  CLIENT_CABINET,
  CLIENT_CONFIRM_EMAIL,
  CLIENT_REGISTRATION,
  HOME,
} from "./constant/route";
import { ClientCabinetScreen } from "./screen/ClientCabinetScreen";
import { ClientConfirmEmailScreen } from "./screen/ClientConfirmEmailScreen";
import { PARAM_PREFIX, TOKEN_PARAM } from "./constant/routeParams";
import { ClientRegistrationScreen } from "./screen/ClientRegistrationScreen";

export const Routing = (): ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME} element={<HomeScreen />} />
        <Route path={CLIENT_CABINET} element={<ClientCabinetScreen />} />
        <Route
          path={CLIENT_REGISTRATION}
          element={<ClientRegistrationScreen />}
        />
        <Route
          path={CLIENT_CONFIRM_EMAIL + PARAM_PREFIX + TOKEN_PARAM}
          element={<ClientConfirmEmailScreen />}
        />
        <Route path={"/*"} element={<Navigate to={HOME} />} />
      </Routes>
    </BrowserRouter>
  );
};
