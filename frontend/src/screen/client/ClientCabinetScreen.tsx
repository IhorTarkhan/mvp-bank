import React, { ReactElement, useContext } from "react";
import { Box, Container } from "@mui/material";
import { ClientHeader } from "../../component/header/client/ClientHeader";
import { ClientContext } from "../../util/ClientContext";
import { Spinner } from "../../component/Spinner";
import { ClientPersonalInfo } from "../../component/client/ClientPersonalInfo";
import { ClientCard } from "../../component/client/ClientCard";

export const ClientCabinetScreen = (): ReactElement => {
  const userContext = useContext(ClientContext);

  if (!userContext.client) {
    return <Spinner />;
  }

  return (
    <Container>
      <ClientHeader />
      <Box display={"flex"} flexDirection={["column", "column", "row"]}>
        <Box
          width={["100%", "100%", "50%"]}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"row"}
        >
          <ClientPersonalInfo />
        </Box>
        <Box
          width={["100%", "100%", "50%"]}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"row"}
        >
          <ClientCard />
        </Box>
      </Box>
    </Container>
  );
};
