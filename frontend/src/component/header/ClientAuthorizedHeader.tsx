import * as React from "react";
import { ReactElement } from "react";
import InfoIcon from "@mui/icons-material/Info";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLocale } from "../../i18n/i18n";
import { ClientAbstractHeader } from "./CleentAbstractHeader";
import { useNavigate } from "react-router-dom";
import {
  CLIENT_ABOUT_US_ROUTE,
  CLIENT_CABINET_ROUTE,
} from "../../constant/route";
import { useCookies } from "react-cookie";
import { CLIENT_JWT_COOKIE } from "../../constant/cookie";

export const ClientAuthorizedHeader = (): ReactElement => {
  const [locale] = useLocale();
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies([CLIENT_JWT_COOKIE]);

  const pages = [
    {
      name: locale.pages.about,
      onClick: () => navigate(CLIENT_ABOUT_US_ROUTE),
      icon: <InfoIcon />,
    },
  ];

  const settings = [
    {
      name: locale.settings.myCabinet,
      onClick: () => navigate(CLIENT_CABINET_ROUTE),
      icon: <AccountCircleIcon />,
    },
    {
      name: locale.settings.logout,
      onClick: () => {
        removeCookie(CLIENT_JWT_COOKIE, { path: "/" });
      },
      icon: <ExitToAppIcon />,
    },
  ];

  return <ClientAbstractHeader pages={pages} settings={settings} />;
};
