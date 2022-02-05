import React, { ReactElement } from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "500px",
    marginInline: "auto",
    marginTop: "100px",
    rowGap: "7px",
  },
});

export const ClientRegistrationSuccessScreen = (): ReactElement => {
  const classes = useStyles();

  const clientRegistrationSuccess = "Success, todo"; // TODO

  return <Box className={classes.root}>{clientRegistrationSuccess}</Box>;
};
