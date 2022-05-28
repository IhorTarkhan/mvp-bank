import * as React from "react";
import { ReactElement } from "react";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLocale } from "../../../i18n/i18n";
import { AbstractHeader } from "../AbstractHeader";
import { useNavigate } from "react-router-dom";
import {
  CLIENT_CABINET_ROUTE,
  CLIENT_SUPPORT_REQUEST_ROUTE,
} from "../../../constant/route";
import { useCookies } from "react-cookie";
import { CLIENT_JWT_COOKIE } from "../../../constant/cookie";

export const VerifiedEmailAuthorizedClientHeader = (): ReactElement => {
  const [locale] = useLocale();
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies([CLIENT_JWT_COOKIE]);

  const pages = [
    {
      name: locale.header.pages.requestSupport,
      onClick: () => navigate(CLIENT_SUPPORT_REQUEST_ROUTE),
      icon: <SupportAgentIcon />,
    },
  ];

  const settings = [
    {
      name: locale.header.settings.myCabinet,
      onClick: () => navigate(CLIENT_CABINET_ROUTE),
      icon: <AccountCircleIcon />,
    },
    {
      name: locale.header.settings.logout,
      onClick: () => {
        removeCookie(CLIENT_JWT_COOKIE, { path: "/" });
        window.location.reload();
      },
      icon: <ExitToAppIcon />,
    },
  ];

  return <AbstractHeader pages={pages} settings={settings} />;
};
