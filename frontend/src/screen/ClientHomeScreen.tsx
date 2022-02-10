import React, { ReactElement } from "react";
import { Container, Link } from "@mui/material";
import {
  CLIENT_LOGIN_ROUTE,
  CLIENT_REGISTRATION_ROUTE,
} from "../constant/route";
import { ClientUnauthorizedHeader } from "../component/header/ClientUnauthorizedHeader";

export const ClientHomeScreen = (): ReactElement => {
  return (
    <Container maxWidth={false}>
      <ClientUnauthorizedHeader />
      Home Screen
      <br />
      <Link href={CLIENT_LOGIN_ROUTE}>login</Link>
      <br />
      <Link href={CLIENT_REGISTRATION_ROUTE}>registr</Link>
    </Container>
  );
};
