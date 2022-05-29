import React, { ReactElement, useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { ClientContext } from "../../util/ClientContext";
import { Spinner } from "../Spinner";
import { TransactionInfoResponse } from "../../dto/response/TransactionInfoResponse";
import { axios } from "../../util/AxiosInterceptor";
import { BACKEND_URL } from "../../constant/environment";
import { CLIENT_TRANSACTION_API } from "../../constant/api";
import { AxiosResponse } from "axios";
import { FormicErrors, getTranslateError } from "../../util/FormicUtil";
import { MAIN_APP_COLOR } from "../../constant/colors";
import { Formik } from "formik";
import { useLocale } from "../../i18n/i18n";
import { Toast } from "../Toast";
import { ClientTransactionRequest } from "../../dto/request/client/ClientTransactionRequest";
import DownloadingIcon from "@mui/icons-material/Downloading";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import moment from "moment";

export const ClientTransactions = (): ReactElement => {
  const userContext = useContext(ClientContext);
  const [locale] = useLocale();
  const [transactions, setTransactions] = useState<TransactionInfoResponse[]>();
  const [isWarning, setIsWarning] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const getStatusIcon = (transaction: TransactionInfoResponse) => {
    if (transaction.accepted === null) {
      return <DownloadingIcon color={"info"} />;
    }
    if (transaction.accepted) {
      return <CheckIcon color={"success"} />;
    }

    return <CloseIcon color={"error"} />;
  };

  const getDirectionIcon = (transaction: TransactionInfoResponse) => {
    if (transaction.idFrom === userContext.client?.id) {
      return <ArrowForwardIcon color={"info"} />;
    }
    if (transaction.idTo === userContext.client?.id) {
      return <ArrowBackIcon color={"success"} />;
    }

    return <></>;
  };

  const getOtherUsername = (transaction: TransactionInfoResponse) => {
    if (transaction.idFrom === userContext.client?.id) {
      return transaction.usernameTo;
    }
    if (transaction.idTo === userContext.client?.id) {
      return transaction.usernameFrom;
    }

    return <></>;
  };

  type FormikData = {
    toCard: string;
    amount: number;
  };

  const initDate: FormikData = {
    toCard: "",
    amount: 0,
  };

  const getTransactions = () => {
    axios
      .get(BACKEND_URL + CLIENT_TRANSACTION_API)
      .then((response: AxiosResponse<TransactionInfoResponse[]>) => {
        setTransactions(response.data);
      })
      .catch((e: any) => {
        console.error(e);
      });
  };

  const validate = (values: FormikData) => {
    const errors: FormicErrors<FormikData> = {};
    if (!values.toCard) {
      errors.toCard = "required";
    }
    if (!+values.amount) {
      errors.amount = "required";
    }
    return errors;
  };

  const submit = (values: FormikData) => {
    const request: ClientTransactionRequest = {
      toCard: values.toCard,
      amount: values.amount,
    };
    axios
      .post(BACKEND_URL + CLIENT_TRANSACTION_API, request)
      .then(() => {
        setIsSuccess(true);
        getTransactions();
      })
      .catch((error: any) => {
        console.error(error);
        if (error.response.status === 400) {
          setIsError(true);
        } else if (error.response.status === 404) {
          setIsWarning(true);
        }
      });
  };

  useEffect(() => {
    getTransactions();
  }, []);

  if (!userContext.client || !transactions) {
    return <Spinner />;
  }

  return (
    <>
      <Typography variant={"h4"} marginY={2}>
        {locale.cabinetScreen.transactionsTitle}
      </Typography>
      <Formik initialValues={initDate} validate={validate} onSubmit={submit}>
        {({ values, errors, touched, handleSubmit, setFieldValue }) => (
          <Box display={"flex"} flexDirection={"column"}>
            <TextField
              variant={"outlined"}
              label={locale.cabinetScreen.toCardTitle}
              value={values.toCard}
              onChange={(event) => setFieldValue("toCard", event.target.value)}
              error={!!(touched.toCard && errors.toCard)}
              helperText={
                touched.toCard && errors.toCard
                  ? getTranslateError(
                      locale.cabinetScreen.errors,
                      errors.toCard
                    )
                  : " "
              }
            />
            <FormControl error={!!touched.amount && !!errors.amount}>
              <InputLabel>{locale.cabinetScreen.amountTitle}</InputLabel>
              <OutlinedInput
                type={"number"}
                value={values.amount}
                onChange={(event) => {
                  setFieldValue("amount", `${+event.target.value}`);
                }}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label={locale.cabinetScreen.amountTitle}
              />
              <FormHelperText error id={"accountId-error"}>
                {touched.amount && errors.amount
                  ? getTranslateError(
                      locale.cabinetScreen.errors,
                      errors.amount
                    )
                  : " "}
              </FormHelperText>
            </FormControl>
            <Button
              variant={"contained"}
              onClick={() => handleSubmit()}
              style={{ background: MAIN_APP_COLOR }}
            >
              {locale.cabinetScreen.transferTitle}
            </Button>
          </Box>
        )}
      </Formik>
      <Toast type={"warning"} isOpen={isWarning} setIsOpen={setIsWarning}>
        {locale.cabinetScreen.errors.incorrectCardNumber}
      </Toast>
      <Toast type={"error"} isOpen={isError} setIsOpen={setIsError}>
        {locale.cabinetScreen.errors.notEnoughMoney}
      </Toast>
      <Toast type={"success"} isOpen={isSuccess} setIsOpen={setIsSuccess}>
        {locale.cabinetScreen.success}
      </Toast>
      {transactions.length === 0 && (
        <Typography marginY={2}>
          {locale.cabinetScreen.noTransactionTitle}
        </Typography>
      )}
      <List>
        {transactions.map((t) => (
          <ListItem key={t.id}>
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              width={"100%"}
            >
              {getDirectionIcon(t)}
              <Typography>{`${getOtherUsername(t)} ($${t.amount})`}</Typography>
              <Box>
                {getStatusIcon(t)} {moment(t.time).format("HH:mm DD.MM.YY")}
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </>
  );
};
