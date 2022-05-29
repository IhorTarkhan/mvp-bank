import * as React from "react";
import { ReactElement, useContext } from "react";
import { Spinner } from "../../component/Spinner";
import { AdminContext } from "../../util/AdminContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  ADMIN_HOME_ROUTE,
  ADMIN_MANAGEMENT_ROUTE,
  ADMIN_MANAGER_TRANSACTIONS_ROUTE,
  ADMIN_SUPPORT_REQUESTS_ROUTE,
} from "../../constant/route";
import { AdminHomeScreen } from "../../screen/admin/AdminHomeScreen";
import { AdminManagementScreen } from "../../screen/admin/superadmin/AdminManagementScreen";
import { RequestSupportScreen } from "../../screen/admin/support/RequestSupportScreen";
import { ManagerTransactionScreen } from "../../screen/admin/manager/ManagerTransactionScreen";

export const AdminRouting = (): ReactElement => {
  const adminContext = useContext(AdminContext);

  if (adminContext.isLoading || !adminContext.admin) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ADMIN_HOME_ROUTE} element={<AdminHomeScreen />} />
        <Route
          path={ADMIN_MANAGEMENT_ROUTE}
          element={<AdminManagementScreen />}
        />
        <Route
          path={ADMIN_SUPPORT_REQUESTS_ROUTE}
          element={<RequestSupportScreen />}
        />
        <Route
          path={ADMIN_MANAGER_TRANSACTIONS_ROUTE}
          element={<ManagerTransactionScreen />}
        />
        <Route path={"/*"} element={<Navigate to={ADMIN_HOME_ROUTE} />} />
      </Routes>
    </BrowserRouter>
  );
};
