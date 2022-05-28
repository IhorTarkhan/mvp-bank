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
  ADMIN_SUPPORT_REQUESTS_ROUTE,
} from "../../../constant/route";

export const AdminHeader = (): ReactElement => {
  const [, , removeCookie] = useCookies([ADMIN_JWT_COOKIE]);
  const adminContext = useContext(AdminContext);
  const navigate = useNavigate();

  if (adminContext.isLoading || !adminContext.admin) {
    return <Spinner />;
  }

  const pages = [
    {
      name: "Admins",
      onClick: () => navigate(ADMIN_MANAGEMENT_ROUTE),
    },
    {
      name: "Request support",
      onClick: () => navigate(ADMIN_SUPPORT_REQUESTS_ROUTE),
    },
  ];

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
