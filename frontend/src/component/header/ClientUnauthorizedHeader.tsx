import * as React from "react";
import { ReactElement } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { useLocale } from "../../i18n/i18n";
import { ClientAbstractHeader } from "./CleentAbstractHeader";
import { useNavigate } from "react-router-dom";
import { CLIENT_ABOUT_US_ROUTE } from "../../constant/route";

export const ClientUnauthorizedHeader = (): ReactElement => {
  const [locale] = useLocale();
  const navigate = useNavigate();

  const pages = [
    {
      name: locale.pages.about,
      onClick: () => navigate(CLIENT_ABOUT_US_ROUTE),
      icon: <InfoIcon />,
    },
  ];

  return <ClientAbstractHeader pages={pages} />;
};
