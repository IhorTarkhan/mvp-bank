import * as React from "react";
import { ReactElement } from "react";
import { ClientRouting } from "./routing/client/ClientRouting";
import { ClientProvider } from "./util/ClientContext";

export const Routing = (): ReactElement => {
  return (
    <ClientProvider>
      <ClientRouting />
    </ClientProvider>
  );
};
