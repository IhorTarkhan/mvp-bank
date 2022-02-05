import React, { ReactElement } from "react";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  OutlinedInput,
  Snackbar,
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
import { ClientRegistrationRequest } from "../dto/request/ClientRegistrationRequest";
import { CLIENT_REGISTER_API } from "../constant/api";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import { CLIENT_JWT_COOKIE } from "../constant/cookie";
import { axios } from "../util/AxiosInterceptor";
import { AxiosResponse } from "axios";

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
  const [, setCookie] = useCookies([CLIENT_JWT_COOKIE]);
  const [isWarning, setIsWarning] = React.useState(false);

  const registrationLabel = "Registration";
  const emailLabel = "Email";
  const passwordLabel = "Password";
  const confirmPasswordLabel = "Confirm password";
  const submitLabel = "Submit";

  const required = "Required";
  const invalidEmailAddress = "Invalid email address";
  const chooseLongerPassword = "Choose a longer password, at less 8 characters";
  const passwordsNotMatch = "Passwords do not match";

  const duplicatingEmail = "Email already using!";

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
      errors.email = required;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = invalidEmailAddress;
    }
    if (!values.password) {
      errors.password = required;
    } else if (values.password.length < 8) {
      errors.password = chooseLongerPassword;
    }
    if (!errors.password) {
      if (!values.confirmPassword) {
        errors.confirmPassword = required;
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = passwordsNotMatch;
      }
    }
    return errors;
  };

  const submit = (values: FormikData) => {
    const request: ClientRegistrationRequest = {
      username: values.email,
      password: values.password,
    };
    axios
      .post(BACKEND_URL + CLIENT_REGISTER_API, request)
      .then((response: AxiosResponse<JwtResponse>) => {
        const decoded = jwtDecode<{ exp: number }>(
          response.data.authorization.substring(7)
        );
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
        {registrationLabel}
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
              <FormHelperText error id="accountId-error">
                {(touched.password && errors.password) || " "}
              </FormHelperText>
            </FormControl>
            <TextField
              variant={"outlined"}
              label={confirmPasswordLabel}
              type={values.isShowPassword ? "text" : "password"}
              value={values.confirmPassword}
              onChange={(event) =>
                setFieldValue("confirmPassword", event.target.value)
              }
              error={!!(touched.email && errors.confirmPassword)}
              helperText={(touched.email && errors.confirmPassword) || " "}
            />
            <Button variant={"contained"} onClick={() => handleSubmit()}>
              {submitLabel}
            </Button>
          </>
        )}
      </Formik>
      <Snackbar
        open={isWarning}
        autoHideDuration={6000}
        onClose={() => setIsWarning(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setIsWarning(false)} severity={"warning"}>
          {duplicatingEmail}
        </Alert>
      </Snackbar>
    </Box>
  );
};
