import React, { ReactElement } from "react";
import { Container, Link } from "@mui/material";
import {
  CLIENT_LOGIN_ROUTE,
  CLIENT_REGISTRATION_ROUTE,
} from "../../constant/route";
import { ClientHeader } from "../../component/header/client/ClientHeader";

export const ClientHomeScreen = (): ReactElement => {
  return (
    <Container maxWidth={false}>
      <ClientHeader />
      Home Screen
      <br />
      <Link href={CLIENT_LOGIN_ROUTE}>login</Link>
      <br />
      <Link href={CLIENT_REGISTRATION_ROUTE}>registr</Link>
    </Container>
  );
};
