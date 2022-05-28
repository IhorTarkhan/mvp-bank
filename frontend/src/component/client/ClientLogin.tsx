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
import { CLIENT_LOGIN_API } from "../../constant/api";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import { CLIENT_JWT_COOKIE } from "../../constant/cookie";
import { axios } from "../../util/AxiosInterceptor";
import { AxiosResponse } from "axios";
import { Toast } from "../Toast";
import { ClientLoginRequest } from "../../dto/request/client/ClientLoginRequest";
import { VALID_EMAIL_REGEX } from "../../constant/regex";
import { useLocale } from "../../i18n/i18n";
import { MAIN_APP_COLOR } from "../../constant/colors";
import { CLIENT_REGISTRATION_ROUTE } from "../../constant/route";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    marginInline: "auto",
    marginTop: "30px",
    rowGap: "7px",
  },
});

export const ClientLogin = (): ReactElement => {
  const classes = useStyles();
  const [locale] = useLocale();
  const [, setCookie] = useCookies([CLIENT_JWT_COOKIE]);
  const [isWarning, setIsWarning] = useState(false);

  type FormikData = {
    email: string;
    password: string;
    isShowPassword: boolean;
  };

  const initDate: FormikData = {
    email: "",
    password: "",
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
    }
    return errors;
  };

  const submit = (values: FormikData) => {
    const request: ClientLoginRequest = {
      username: values.email,
      password: values.password,
    };
    axios
      .post(BACKEND_URL + CLIENT_LOGIN_API, request)
      .then((response: AxiosResponse<JwtResponse>) => {
        const decoded = jwtDecode<{ exp: number }>(response.data.authorization);
        setCookie(CLIENT_JWT_COOKIE, response.data.authorization, {
          path: "/",
          expires: new Date(decoded.exp * 1000),
        });
        window.location.reload();
      })
      .catch(() => {
        setIsWarning(true);
      });
  };

  return (
    <Box className={classes.root}>
      <Typography variant={"h5"} marginBottom={"20px"}>
        {locale.homeScreen.login.loginLabel}
      </Typography>
      <Formik initialValues={initDate} validate={validate} onSubmit={submit}>
        {({ values, errors, touched, handleSubmit, setFieldValue }) => (
          <>
            <TextField
              variant={"outlined"}
              label={locale.homeScreen.login.emailLabel}
              value={values.email}
              onChange={(event) => setFieldValue("email", event.target.value)}
              error={!!(touched.email && errors.email)}
              helperText={
                touched.email && errors.email
                  ? getTranslateError(
                      locale.homeScreen.login.errors,
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
                {locale.homeScreen.login.passwordLabel}
              </InputLabel>
              <OutlinedInput
                id={"password"}
                label={locale.homeScreen.login.passwordLabel}
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
                      locale.homeScreen.login.errors,
                      errors.password
                    )
                  : " "}
              </FormHelperText>
            </FormControl>
            <Button
              variant={"contained"}
              onClick={() => handleSubmit()}
              style={{ background: MAIN_APP_COLOR }}
            >
              {locale.homeScreen.login.submitLabel}
            </Button>
          </>
        )}
      </Formik>
      <span>
        {locale.homeScreen.login.recommendSignUpPrefix}
        <Link href={CLIENT_REGISTRATION_ROUTE}>
          {locale.homeScreen.login.recommendSignUpLink}
        </Link>
      </span>
      <Toast type={"warning"} isOpen={isWarning} setIsOpen={setIsWarning}>
        {locale.homeScreen.login.errors.invalidCredentials}
      </Toast>
    </Box>
  );
};
