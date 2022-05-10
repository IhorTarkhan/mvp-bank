import React, { ReactElement } from "react";
import { Container, Typography } from "@mui/material";
import { useLocale } from "../i18n/i18n";
import { ClientHeader } from "../component/header/client/ClientHeader";

export const ClientAboutUsScreen = (): ReactElement => {
  const [local] = useLocale();

  return (
    <Container maxWidth={false}>
      <ClientHeader />
      <Typography variant={"h4"}>{local.aboutUsScreen.title}</Typography>
    </Container>
  );
};
