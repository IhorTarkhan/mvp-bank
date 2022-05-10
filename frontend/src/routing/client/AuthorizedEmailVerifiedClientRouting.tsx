import * as React from "react";
import { ReactElement } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CLIENT_CABINET_ROUTE } from "../../constant/route";
import { ClientCabinetScreen } from "../../screen/ClientCabinetScreen";

export const AuthorizedEmailVerifiedClientRouting = (): ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={CLIENT_CABINET_ROUTE} element={<ClientCabinetScreen />} />
        <Route path={"/*"} element={<Navigate to={CLIENT_CABINET_ROUTE} />} />
      </Routes>
    </BrowserRouter>
  );
};
