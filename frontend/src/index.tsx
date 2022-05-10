import React from "react";
import ReactDOM from "react-dom";
import { Routing } from "./Routing";
import CssBaseline from "@mui/material/CssBaseline";
import { ClientProvider } from "./util/ClientContext";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ClientProvider>
      <Routing />
    </ClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
