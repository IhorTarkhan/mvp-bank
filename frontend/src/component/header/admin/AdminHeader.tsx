import * as React from "react";
import { ReactElement, useContext } from "react";
import { Spinner } from "../../Spinner";
import { AdminContext } from "../../../util/AdminContext";
import { AbstractHeader } from "../AbstractHeader";
import { ADMIN_JWT_COOKIE } from "../../../constant/cookie";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import {
  ADMIN_MANAGEMENT_ROUTE,
  ADMIN_MANAGER_TRANSACTIONS_ROUTE,
  ADMIN_SUPPORT_REQUESTS_ROUTE,
} from "../../../constant/route";
import { AdminRoles } from "../../../dto/AdminRoles";

export const AdminHeader = (): ReactElement => {
  const [, , removeCookie] = useCookies([ADMIN_JWT_COOKIE]);
  const adminContext = useContext(AdminContext);
  const navigate = useNavigate();

  if (adminContext.isLoading || !adminContext.admin) {
    return <Spinner />;
  }

  const tmp = [
    {
      name: "Admins",
      navigate: ADMIN_MANAGEMENT_ROUTE,
      roleRequired: AdminRoles.SUPER_ADMIN,
    },
    {
      name: "Request support",
      navigate: ADMIN_SUPPORT_REQUESTS_ROUTE,
      roleRequired: AdminRoles.SUPPORT,
    },
    {
      name: "Transaction management",
      navigate: ADMIN_MANAGER_TRANSACTIONS_ROUTE,
      roleRequired: AdminRoles.CLIENT_MANAGER,
    },
  ];

  const pages = tmp
    .filter((t) => adminContext.admin?.roles.includes(t.roleRequired))
    .map((t) => ({
      name: t.name,
      onClick: () => navigate(t.navigate),
    }));

  const settings = [
    {
      name: "Logout",
      onClick: () => {
        removeCookie(ADMIN_JWT_COOKIE, { path: "/" });
        window.location.reload();
      },
      icon: <ExitToAppIcon />,
    },
  ];

  return <AbstractHeader pages={pages} settings={settings} disableLanguage />;
};
