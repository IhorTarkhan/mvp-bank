import * as React from "react";
import { ReactElement } from "react";
import { useCookies } from "react-cookie";
import { ADMIN_JWT_COOKIE } from "./constant/cookie";
import { AdminRouting } from "./routing/admin/AdminRouting";
import { ClientProvider } from "./util/ClientContext";
import { ClientRouting } from "./routing/client/ClientRouting";
import { AdminProvider } from "./util/AdminContext";

export const Routing = (): ReactElement => {
  const [cookie] = useCookies([ADMIN_JWT_COOKIE]);

  if (cookie[ADMIN_JWT_COOKIE]) {
    return (
      <AdminProvider>
        <AdminRouting />
      </AdminProvider>
    );
  }

  return (
    <ClientProvider>
      <ClientRouting />
    </ClientProvider>
  );
};
