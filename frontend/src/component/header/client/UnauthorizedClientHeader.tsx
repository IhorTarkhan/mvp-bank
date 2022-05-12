import * as React from "react";
import { ReactElement } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { useLocale } from "../../../i18n/i18n";
import { AbstractHeader } from "../AbstractHeader";
import { useNavigate } from "react-router-dom";
import { CLIENT_ABOUT_US_ROUTE } from "../../../constant/route";

export const UnauthorizedClientHeader = (): ReactElement => {
  const [locale] = useLocale();
  const navigate = useNavigate();

  const pages = [
    {
      name: locale.header.pages.about,
      onClick: () => navigate(CLIENT_ABOUT_US_ROUTE),
      icon: <InfoIcon />,
    },
  ];

  return <AbstractHeader pages={pages} />;
};
