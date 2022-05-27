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
import { FormicErrors } from "../../util/FormicUtil";
import { BACKEND_URL } from "../../constant/environment";
import { JwtResponse } from "../../dto/response/JwtResponse";
import { ADMIN_LOGIN_API } from "../../constant/api";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import { ADMIN_JWT_COOKIE } from "../../constant/cookie";
import { axios } from "../../util/AxiosInterceptor";
import { AxiosResponse } from "axios";
import { Toast } from "../../component/Toast";
import { AdminLoginRequest } from "../../dto/request/admin/AdminLoginRequest";
import { VALID_EMAIL_REGEX } from "../../constant/regex";
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
});

export const AdminLoginScreen = (): ReactElement => {
  const classes = useStyles();
  const [, setCookie] = useCookies([ADMIN_JWT_COOKIE]);
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
    const request: AdminLoginRequest = {
      username: values.email,
      password: values.password,
    };
    axios
      .post(BACKEND_URL + ADMIN_LOGIN_API, request)
      .then((response: AxiosResponse<JwtResponse>) => {
        const decoded = jwtDecode<{ exp: number }>(response.data.authorization);
        setCookie(ADMIN_JWT_COOKIE, response.data.authorization, {
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
      <Typography variant={"h4"} marginBottom={"20px"}>
        {"Admin login"}
      </Typography>
      <Formik initialValues={initDate} validate={validate} onSubmit={submit}>
        {({ values, errors, touched, handleSubmit, setFieldValue }) => (
          <>
            <TextField
              variant={"outlined"}
              label={"email"}
              value={values.email}
              onChange={(event) => setFieldValue("email", event.target.value)}
              error={!!(touched.email && errors.email)}
              helperText={touched.email && errors.email ? errors.email : " "}
            />
            <FormControl
              variant={"outlined"}
              error={!!(touched.password && errors.password)}
            >
              <InputLabel htmlFor={"password"}>password</InputLabel>
              <OutlinedInput
                id={"password"}
                label={"password"}
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
                {touched.password && errors.password ? errors.password : " "}
              </FormHelperText>
            </FormControl>
            <Button
              variant={"contained"}
              onClick={() => handleSubmit()}
              style={{ background: MAIN_APP_COLOR }}
            >
              Submit
            </Button>
          </>
        )}
      </Formik>
      <Toast type={"warning"} isOpen={isWarning} setIsOpen={setIsWarning}>
        Invalid credentials
      </Toast>
    </Box>
  );
};
