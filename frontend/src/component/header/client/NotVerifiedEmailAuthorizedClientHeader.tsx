import * as React from "react";
import { ReactElement } from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useLocale } from "../../../i18n/i18n";
import { AbstractHeader } from "../AbstractHeader";
import { useCookies } from "react-cookie";
import { CLIENT_JWT_COOKIE } from "../../../constant/cookie";

export const NotVerifiedEmailAuthorizedClientHeader = (): ReactElement => {
  const [locale] = useLocale();
  const [, , removeCookie] = useCookies([CLIENT_JWT_COOKIE]);

  const settings = [
    {
      name: locale.header.settings.logout,
      onClick: () => {
        removeCookie(CLIENT_JWT_COOKIE, { path: "/" });
        window.location.reload();
      },
      icon: <ExitToAppIcon />,
    },
  ];

  return <AbstractHeader settings={settings} />;
};
