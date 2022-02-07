import React, { ReactElement, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Formik } from "formik";
import { makeStyles } from "@mui/styles";
import { FormicErrors } from "../util/FormicUtil";
import { BACKEND_URL } from "../constant/environment";
import { JwtResponse } from "../dto/response/JwtResponse";
import { CLIENT_LOGIN_API } from "../constant/api";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import { CLIENT_JWT_COOKIE } from "../constant/cookie";
import { axios } from "../util/AxiosInterceptor";
import { AxiosResponse } from "axios";
import { CLIENT_CABINET_ROUTE } from "../constant/route";
import { useNavigate } from "react-router-dom";
import { Toast } from "../component/Toast";
import { ClientLoginRequest } from "../dto/request/ClientLoginRequest";

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

export const ClientLoginScreen = (): ReactElement => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [, setCookie] = useCookies([CLIENT_JWT_COOKIE]);
  const [isWarning, setIsWarning] = useState(false);

  const loginLabel = "Login";
  const emailLabel = "Email";
  const passwordLabel = "Password";

  const required = "Required";
  const invalidEmailAddress = "Invalid email address";

  const invalidCredentials = "Invalid credentials";

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
      errors.email = required;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = invalidEmailAddress;
    }
    if (!values.password) {
      errors.password = required;
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
      })
      .catch((reason: number) => {
        if (reason === 409) {
          setIsWarning(true);
        }
      });
  };

  return (
    <Box className={classes.root}>
      <Typography variant={"h4"} marginBottom={"20px"}>
        {loginLabel}
      </Typography>
      <Formik initialValues={initDate} validate={validate} onSubmit={submit}>
        {({ values, errors, touched, handleSubmit, setFieldValue }) => (
          <>
            <TextField
              variant={"outlined"}
              label={emailLabel}
              value={values.email}
              onChange={(event) => setFieldValue("email", event.target.value)}
              error={!!(touched.email && errors.email)}
              helperText={(touched.email && errors.email) || " "}
            />
            <FormControl
              variant={"outlined"}
              error={!!(touched.password && errors.password)}
            >
              <InputLabel htmlFor={"password"}>{passwordLabel}</InputLabel>
              <OutlinedInput
                id={"password"}
                label={passwordLabel}
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
                {(touched.password && errors.password) || " "}
              </FormHelperText>
            </FormControl>
            <Button variant={"contained"} onClick={() => handleSubmit()}>
              {loginLabel}
            </Button>
          </>
        )}
      </Formik>
      <Toast
        text={invalidCredentials}
        type={"warning"}
        isOpen={isWarning}
        setIsOpen={setIsWarning}
      />
    </Box>
  );
};
