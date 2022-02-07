import React, { ReactElement } from "react";
import { Container, Link } from "@mui/material";
import {
  CLIENT_LOGIN_ROUTE,
  CLIENT_REGISTRATION_ROUTE,
} from "../constant/route";
import { Header } from "../component/Header";

export const ClientHomeScreen = (): ReactElement => {
  return (
    <Container maxWidth={false}>
      <Header />
      Home Screen
      <br />
      <Link href={CLIENT_LOGIN_ROUTE}>login</Link>
      <br />
      <Link href={CLIENT_REGISTRATION_ROUTE}>registr</Link>
    </Container>
  );
};
