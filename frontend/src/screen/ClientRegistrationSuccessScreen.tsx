import React, { ReactElement } from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ClientAuthorizedNotConfirmedHeader } from "../component/header/ClientAuthorizedNotConfirmedHeader";
import {useLocale} from "../i18n/i18n";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "500px",
    marginInline: "auto",
    marginTop: "50px",
    rowGap: "7px",
  },
});

export const ClientRegistrationSuccessScreen = (): ReactElement => {
  const classes = useStyles();
  const [locale] = useLocale()

  const clientRegistrationSuccess = "Success, todo"; // TODO

  return (
    <Box className={classes.root}>
      <ClientAuthorizedNotConfirmedHeader />
      {clientRegistrationSuccess}
    </Box>
  );
};
