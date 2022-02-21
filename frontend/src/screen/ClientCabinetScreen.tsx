import React, { ReactElement } from "react";
import { Container } from "@mui/material";
import { ClientAuthorizedHeader } from "../component/header/ClientAuthorizedHeader";

export const ClientCabinetScreen = (): ReactElement => {
  return (
    <Container>
      <ClientAuthorizedHeader />
      Client Cabinet Screen
    </Container>
  );
};
