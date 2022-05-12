import * as React from "react";
import { ReactElement, useContext } from "react";
import { Spinner } from "../../component/Spinner";
import { Typography } from "@mui/material";
import { AdminContext } from "../../util/AdminContext";
import { AdminHeader } from "../../component/header/admin/AdminHeader";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ADMIN_HOME_ROUTE } from "../../constant/route";

export const AdminRouting = (): ReactElement => {
  const adminContext = useContext(AdminContext);

  if (adminContext.isLoading || !adminContext.admin) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ADMIN_HOME_ROUTE}
          element={
            <>
              <AdminHeader />
              <Typography>admin</Typography>
            </>
          }
        />
        <Route path={"/*"} element={<Navigate to={ADMIN_HOME_ROUTE} />} />
      </Routes>
    </BrowserRouter>
  );
};
