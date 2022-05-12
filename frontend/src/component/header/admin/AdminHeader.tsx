import * as React from "react";
import { ReactElement, useContext } from "react";
import { Spinner } from "../../Spinner";
import { AdminContext } from "../../../util/AdminContext";
import { AbstractHeader } from "../AbstractHeader";
import { ADMIN_JWT_COOKIE } from "../../../constant/cookie";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useCookies } from "react-cookie";
import InfoIcon from "@mui/icons-material/Info";

export const AdminHeader = (): ReactElement => {
  const [, , removeCookie] = useCookies([ADMIN_JWT_COOKIE]);
  const adminContext = useContext(AdminContext);

  if (adminContext.isLoading || !adminContext.admin) {
    return <Spinner />;
  }

  const pages = [
    {
      name: "test",
      onClick: () => alert(1),
      icon: <InfoIcon />,
    },
    {
      name: "test2",
      onClick: () => alert(2),
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
