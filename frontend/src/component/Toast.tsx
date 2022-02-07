import React, { ReactElement, useState } from "react";
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
import { CLIENT_REGISTRATION_SUCCESS_ROUTE } from "../constant/route";
import { useNavigate } from "react-router-dom";

type Props = {
  text: string;
  type: "success" | "info" | "warning" | "error";
  isOpen: boolean;
  setIsOpen: (argument: boolean) => void;
  duration?: number;
  vertical?: "top" | "bottom";
  horizontal?: "left" | "center" | "right";
};

export const Toast = (props: Props): ReactElement => {
  return (
    <Snackbar
      open={props.isOpen}
      autoHideDuration={props.duration || 6000}
      onClose={() => props.setIsOpen(false)}
      anchorOrigin={{
        vertical: props.vertical || "bottom",
        horizontal: props.horizontal || "right",
      }}
    >
      <Alert onClose={() => props.setIsOpen(false)} severity={props.type}>
        {props.text}
      </Alert>
    </Snackbar>
  );
};
