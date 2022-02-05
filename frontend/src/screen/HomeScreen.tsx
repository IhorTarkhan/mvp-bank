import React, { ReactElement } from "react";
import { Box, Link } from "@mui/material";
import { CLIENT_REGISTRATION_ROUTE } from "../constant/route";

export const HomeScreen = (): ReactElement => {
  return (
    <Box>
      Home Screen
      <br />
      <Link href={CLIENT_REGISTRATION_ROUTE}>registr</Link>
    </Box>
  );
};
