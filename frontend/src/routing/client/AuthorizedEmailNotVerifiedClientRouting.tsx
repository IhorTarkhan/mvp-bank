import * as React from "react";
import { ReactElement } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  CLIENT_CONFIRM_EMAIL_ROUTE,
  CLIENT_REGISTRATION_SUCCESS_ROUTE,
} from "../../constant/route";
import { ClientConfirmEmailScreen } from "../../screen/ClientConfirmEmailScreen";
import { PREFIX_PARAM, TOKEN_PARAM } from "../../constant/route-params";
import { ClientRegistrationSuccessScreen } from "../../screen/ClientRegistrationSuccessScreen";

export const AuthorizedEmailNotVerifiedClientRouting = (): ReactElement => {
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
};
