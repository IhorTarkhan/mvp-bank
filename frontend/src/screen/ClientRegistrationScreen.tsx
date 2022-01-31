import React, { ReactElement } from "react";
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

  const registrationLabel = "Registration";
  const emailLabel = "Email";
  const passwordLabel = "Password";
  const confirmPasswordLabel = "Confirm password";
  const submitLabel = "Submit";

  const required = "Required";
  const invalidEmailAddress = "Invalid email address";
  const chooseLongerPassword = "Choose a longer password, at less 8 characters";
  const passwordsNotMatch = "Passwords do not match";

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
    console.log(values);
  };

  return (
    <Box className={classes.root}>
      <Typography variant={"h4"} mb={"20px"}>
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
    </Box>
  );
};
