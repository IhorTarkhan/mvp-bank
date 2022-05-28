import * as React from "react";
import { ReactElement } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  CLIENT_CABINET_ROUTE,
  CLIENT_SUPPORT_REQUEST_ROUTE,
} from "../../constant/route";
import { ClientCabinetScreen } from "../../screen/client/ClientCabinetScreen";
import { ClientSupportRequestScreen } from "../../screen/client/ClientSupportRequestScreen";

export const VerifiedEmailAuthorizedClientRouting = (): ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={CLIENT_CABINET_ROUTE} element={<ClientCabinetScreen />} />
        <Route
          path={CLIENT_SUPPORT_REQUEST_ROUTE}
          element={<ClientSupportRequestScreen />}
        />
        <Route path={"/*"} element={<Navigate to={CLIENT_CABINET_ROUTE} />} />
      </Routes>
    </BrowserRouter>
  );
};
