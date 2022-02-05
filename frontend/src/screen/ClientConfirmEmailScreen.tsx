import React, { ReactElement, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TOKEN_PARAM } from "../constant/routeParams";
import { Box, CircularProgress } from "@mui/material";
import { axios } from "../util/AxiosInterceptor";
import { BACKEND_URL } from "../constant/environment";
import { CLIENT_CONFIRM_EMAIL_API } from "../constant/api";
import { CLIENT_CABINET_ROUTE } from "../constant/route";
import { ClientEmailConfirmRequest } from "../dto/request/ClientEmailConfirmRequest";

export const ClientConfirmEmailScreen = (): ReactElement => {
  const params = useParams();
  const navigate = useNavigate();
  const token: string = params[TOKEN_PARAM]!;
  const request: ClientEmailConfirmRequest = { token: token };
  useEffect(
    () =>
      axios.post(BACKEND_URL + CLIENT_CONFIRM_EMAIL_API, request).then(() => {
        navigate(CLIENT_CABINET_ROUTE);
      }),
    []
  );
  return (
    <Box>
      <CircularProgress
        style={{
          display: "flex",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </Box>
  );
};
