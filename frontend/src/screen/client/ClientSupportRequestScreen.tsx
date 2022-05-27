import React, { ReactElement, useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useLocale } from "../../i18n/i18n";
import { ClientHeader } from "../../component/header/client/ClientHeader";
import { makeStyles } from "@mui/styles";
import { MAIN_APP_COLOR } from "../../constant/colors";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "500px",
    marginInline: "auto",
    marginTop: "100px",
    rowGap: "7px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
});

export const ClientSupportRequestScreen = (): ReactElement => {
  const classes = useStyles();
  const [locale] = useLocale();
  const [title, setTitle] = useState<string>("");
  const [question, setQuestion] = useState<string>("");

  const handleSubmit = () => {
    console.log({ title, question });
    setTitle("");
    setQuestion("");
  };

  return (
    <Container className={classes.root}>
      <ClientHeader />
      <Typography variant={"h4"}>
        {locale.requestSupportScreen.screenTitle}
      </Typography>
      <Box className={classes.form}>
        <TextField
          variant={"outlined"}
          margin={"dense"}
          label={locale.requestSupportScreen.title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          variant={"outlined"}
          multiline
          rows={4}
          margin={"dense"}
          label={locale.requestSupportScreen.question}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </Box>
      <Button
        variant={"contained"}
        onClick={handleSubmit}
        style={{ background: MAIN_APP_COLOR }}
      >
        {locale.requestSupportScreen.send}
      </Button>
    </Container>
  );
};
