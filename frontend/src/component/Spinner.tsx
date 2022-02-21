import React, { ReactElement } from "react";
import { CircularProgress } from "@mui/material";
import { MAIN_APP_COLOR } from "../constant/colors";

export const Spinner = (): ReactElement => {
  return (
    <CircularProgress
      style={{
        display: "flex",
        position: "fixed",
        top: "50%",
        left: "50%",
        marginTop: -20,
        marginLeft: -20,
        color: MAIN_APP_COLOR,
      }}
    />
  );
};
