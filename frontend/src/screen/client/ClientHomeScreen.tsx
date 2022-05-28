import React, { ReactElement } from "react";
import { Box, Container } from "@mui/material";
import { ClientHeader } from "../../component/header/client/ClientHeader";
import { ClientLogin } from "../../component/client/ClientLogin";
import { ClientAboutUs } from "../../component/client/ClientAboutUs";

export const ClientHomeScreen = (): ReactElement => {
  return (
    <Container>
      <ClientHeader />
      <Box display={"flex"} flexDirection={["column", "column", "row"]}>
        <Box width={["100%", "100%", "50%"]}>
          <ClientAboutUs />
        </Box>
        <Box
          width={["100%", "100%", "50%"]}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
        >
          <ClientLogin />
        </Box>
      </Box>
    </Container>
  );
};
