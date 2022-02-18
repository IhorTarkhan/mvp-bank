import React, { ReactElement, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ClientAuthorizedNotConfirmedHeader } from "../component/header/ClientAuthorizedNotConfirmedHeader";
import { useLocale } from "../i18n/i18n";
import { Toast } from "../component/Toast";

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
  const [fullLocale] = useLocale();
  const locale = fullLocale.registrationSuccessScreen;
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(true);

  const resendEmail = () => {
    setIsEmailSending(!isEmailSending);
  };

  return (
    <Box className={classes.root}>
      <ClientAuthorizedNotConfirmedHeader />
      <Typography variant={"h4"}>{locale.title}</Typography>
      <Typography>{locale.text}</Typography>
      <Typography>
        <Button onClick={resendEmail} disabled={isEmailSending}>
          {locale.resendEmail}
        </Button>
      </Typography>
      <Toast isOpen={isMessageOpen} setIsOpen={setIsMessageOpen}>
        AAA
      </Toast>
    </Box>
  );
};
