import * as React from "react";
import { ReactElement } from "react";
import InfoIcon from "@mui/icons-material/Info";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useLocale } from "../../i18n/i18n";
import { ClientAbstractHeader } from "./CleentAbstractHeader";
import { useNavigate } from "react-router-dom";
import { CLIENT_ABOUT_US_ROUTE } from "../../constant/route";
import { useCookies } from "react-cookie";
import { CLIENT_JWT_COOKIE } from "../../constant/cookie";

export const ClientAuthorizedNotConfirmedHeader = (): ReactElement => {
  const [locale] = useLocale();
  const [, , removeCookie] = useCookies([CLIENT_JWT_COOKIE]);
  const navigate = useNavigate();

  const pages = [
    {
      name: locale.pages.about,
      onClick: () => navigate(CLIENT_ABOUT_US_ROUTE),
      icon: <InfoIcon />,
    },
  ];

  const settings = [
    {
      name: locale.settings.logout,
      onClick: () => removeCookie(CLIENT_JWT_COOKIE, { path: "/" }),
      icon: <ExitToAppIcon />,
    },
  ];

  return <ClientAbstractHeader pages={pages} settings={settings} />;
};
