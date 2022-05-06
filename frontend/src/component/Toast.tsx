import React, { ReactElement } from "react";
import { Alert, Snackbar } from "@mui/material";

type Props = {
  children: string;
  isOpen: boolean;
  setIsOpen: (argument: boolean) => void;
  type?: "success" | "info" | "warning" | "error";
  duration?: number;
  vertical?: "top" | "bottom";
  horizontal?: "left" | "center" | "right";
};

export const Toast = (props: Props): ReactElement => {
  return (
    <Snackbar
      open={props.isOpen}
      autoHideDuration={props.duration || 6000}
      onClose={() => props.setIsOpen(false)}
      anchorOrigin={{
        vertical: props.vertical || "bottom",
        horizontal: props.horizontal || "right",
      }}
    >
      <Alert onClose={() => props.setIsOpen(false)} severity={props.type}>
        {props.children}
      </Alert>
    </Snackbar>
  );
};
