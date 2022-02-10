import React, { ReactElement } from "react";
import { Container, Typography } from "@mui/material";
import { ClientUnauthorizedHeader } from "../component/header/ClientUnauthorizedHeader";
import { useLocale } from "../i18n/i18n";

export const ClientAboutUsScreen = (): ReactElement => {
  const [local] = useLocale();

  return (
    <Container maxWidth={false}>
      <ClientUnauthorizedHeader />
      <Typography variant={"h4"}>{local.aboutUs.title}</Typography>
    </Container>
  );
};
