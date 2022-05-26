import React, { ReactElement } from "react";
import { Container } from "@mui/material";
import { ClientHeader } from "../../component/header/client/ClientHeader";

export const ClientCabinetScreen = (): ReactElement => {
  return (
    <Container>
      <ClientHeader />
      Client Cabinet Screen
    </Container>
  );
};
