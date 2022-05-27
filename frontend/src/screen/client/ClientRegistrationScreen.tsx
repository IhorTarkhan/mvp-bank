import React, { ReactElement, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Formik } from "formik";
import { makeStyles } from "@mui/styles";
import { FormicErrors, getTranslateError } from "../../util/FormicUtil";
import { BACKEND_URL } from "../../constant/environment";
import { JwtResponse } from "../../dto/response/JwtResponse";
import { ClientRegistrationRequest } from "../../dto/request/client/ClientRegistrationRequest";
import { CLIENT_REGISTER_API } from "../../constant/api";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import { CLIENT_JWT_COOKIE } from "../../constant/cookie";
import { axios } from "../../util/AxiosInterceptor";
import { AxiosResponse } from "axios";
import { Toast } from "../../component/Toast";
import { useLocale } from "../../i18n/i18n";
import { VALID_EMAIL_REGEX } from "../../constant/regex";
import { MAIN_APP_COLOR } from "../../constant/colors";
import { ClientHeader } from "../../component/header/client/ClientHeader";
import { CLIENT_LOGIN_ROUTE } from "../../constant/route";

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

export const ClientRegistrationScreen = (): ReactElement => {
  const classes = useStyles();
  const [locale, , language] = useLocale();
  const [, setCookie] = useCookies([CLIENT_JWT_COOKIE]);
  const [isWarning, setIsWarning] = useState(false);

  type FormikData = {
    email: string;
    password: string;
    confirmPassword: string;
    isShowPassword: boolean;
  };

  const initDate: FormikData = {
    email: "",
    password: "",
    confirmPassword: "",
    isShowPassword: false,
  };

  const validate = (values: FormikData) => {
    const errors: FormicErrors<FormikData> = {};
    if (!values.email) {
      errors.email = "required";
    } else if (!VALID_EMAIL_REGEX.test(values.email)) {
      errors.email = "invalidEmailAddress";
    }
    if (!values.password) {
      errors.password = "required";
    } else if (values.password.length < 8) {
      errors.password = "chooseLongerPassword";
    }
    if (!errors.password) {
      if (!values.confirmPassword) {
        errors.confirmPassword = "required";
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "passwordsNotMatch";
      }
    }
    return errors;
  };

  const submit = (values: FormikData) => {
    const request: ClientRegistrationRequest = {
      username: values.email,
      password: values.password,
      language: language,
    };
    axios
      .post(BACKEND_URL + CLIENT_REGISTER_API, request)
      .then((response: AxiosResponse<JwtResponse>) => {
        const decoded = jwtDecode<{ exp: number }>(response.data.authorization);
        setCookie(CLIENT_JWT_COOKIE, response.data.authorization, {
          path: "/",
          expires: new Date(decoded.exp * 1000),
        });
        window.location.reload();
      })
      .catch((reason: any) => {
        if (reason.response.status === 409) {
          setIsWarning(true);
        }
      });
  };

  return (
    <Box className={classes.root}>
      <ClientHeader />
      <Typography variant={"h4"} marginBottom={"20px"}>
        {locale.registrationScreen.registrationLabel}
      </Typography>
      <Formik initialValues={initDate} validate={validate} onSubmit={submit}>
        {({ values, errors, touched, handleSubmit, setFieldValue }) => (
          <>
            <TextField
              variant={"outlined"}
              label={locale.registrationScreen.emailLabel}
              value={values.email}
              onChange={(event) => setFieldValue("email", event.target.value)}
              error={!!(touched.email && errors.email)}
              helperText={
                touched.email && errors.email
                  ? getTranslateError(
                      locale.registrationScreen.errors,
                      errors.email
                    )
                  : " "
              }
            />
            <FormControl
              variant={"outlined"}
              error={!!(touched.password && errors.password)}
            >
              <InputLabel htmlFor={"password"}>
                {locale.registrationScreen.passwordLabel}
              </InputLabel>
              <OutlinedInput
                id={"password"}
                label={locale.registrationScreen.passwordLabel}
                type={values.isShowPassword ? "text" : "password"}
                value={values.password}
                onChange={(event) =>
                  setFieldValue("password", event.target.value)
                }
                endAdornment={
                  <IconButton
                    onClick={() =>
                      setFieldValue("isShowPassword", !values.isShowPassword)
                    }
                  >
                    {values.isShowPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                }
              />
              <FormHelperText error id={"accountId-error"}>
                {touched.password && errors.password
                  ? getTranslateError(
                      locale.registrationScreen.errors,
                      errors.password
                    )
                  : " "}
              </FormHelperText>
            </FormControl>
            <TextField
              variant={"outlined"}
              label={locale.registrationScreen.confirmPasswordLabel}
              type={values.isShowPassword ? "text" : "password"}
              value={values.confirmPassword}
              onChange={(event) =>
                setFieldValue("confirmPassword", event.target.value)
              }
              error={!!(touched.confirmPassword && errors.confirmPassword)}
              helperText={
                touched.confirmPassword && errors.confirmPassword
                  ? getTranslateError(
                      locale.registrationScreen.errors,
                      errors.confirmPassword
                    )
                  : " "
              }
            />
            <Button
              variant={"contained"}
              onClick={() => handleSubmit()}
              style={{ background: MAIN_APP_COLOR }}
            >
              {locale.registrationScreen.submitLabel}
            </Button>
          </>
        )}
      </Formik>
      <span>
        {locale.registrationScreen.recommendLoginPrefix}
        <Link href={CLIENT_LOGIN_ROUTE}>
          {locale.registrationScreen.recommendLoginLink}
        </Link>
      </span>
      <Toast type={"warning"} isOpen={isWarning} setIsOpen={setIsWarning}>
        {locale.registrationScreen.errors.duplicatingEmail}
      </Toast>
    </Box>
  );
};
