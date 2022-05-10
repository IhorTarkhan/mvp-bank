import React, { ReactElement, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useLocale } from "../i18n/i18n";
import { Toast } from "../component/Toast";
import { axios } from "../util/AxiosInterceptor";
import { BACKEND_URL } from "../constant/environment";
import { CLIENT_RESEND_CONFIRM_EMAIL_API } from "../constant/api";
import { ClientHeader } from "../component/header/client/ClientHeader";

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
  const [fullLocale, , language] = useLocale();
  const locale = fullLocale.registrationSuccessScreen;
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(true);

  const resendEmail = () => {
    setIsEmailSending((prevState) => !prevState);
    axios
      .post(BACKEND_URL + CLIENT_RESEND_CONFIRM_EMAIL_API, {
        language: language,
      })
      .then(() => {
        setIsMessageOpen(true);
      })
      .finally(() => {
        setIsEmailSending(false);
      });
  };

  return (
    <Box className={classes.root}>
      <ClientHeader />
      <Typography variant={"h4"}>{locale.title}</Typography>
      <Typography>{locale.text}</Typography>
      <Typography>
        <Button onClick={resendEmail} disabled={isEmailSending}>
          {locale.resendEmail}
        </Button>
      </Typography>
      <Toast isOpen={isMessageOpen} setIsOpen={setIsMessageOpen}>
        {locale.emailSent}
      </Toast>
    </Box>
  );
};
