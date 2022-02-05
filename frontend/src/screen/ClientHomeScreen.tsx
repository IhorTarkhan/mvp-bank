import React, { ReactElement } from "react";
import { Box, Link } from "@mui/material";
import {
  CLIENT_LOGIN_ROUTE,
  CLIENT_REGISTRATION_ROUTE,
} from "../constant/route";

export const ClientHomeScreen = (): ReactElement => {
  return (
    <Box>
      Home Screen
      <br />
      <Link href={CLIENT_LOGIN_ROUTE}>login</Link>
      <br />
      <Link href={CLIENT_REGISTRATION_ROUTE}>registr</Link>
    </Box>
  );
};
