import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TOKEN_PARAM } from "../constant/routeParams";
import { Box, CircularProgress } from "@mui/material";
import { axios } from "../util/AxiosInterceptor";
import { BACKEND_URL } from "../constant/environment";
import { CLIENT_CONFIRM_EMAIL_API } from "../constant/api";
import { CLIENT_CABINET_ROUTE } from "../constant/route";

export const ClientConfirmEmailScreen = (): ReactElement => {
  const params = useParams();
  const navigate = useNavigate();
  const token: string = params[TOKEN_PARAM]!;
  const [isLinkInvalid, setIsLinkInvalid] = useState(false);

  const invalidLink = "Invalid confirm email link, todo"; // TODO

  useEffect(() => {
    axios
      .post(BACKEND_URL + CLIENT_CONFIRM_EMAIL_API, { token })
      .then(() => {
        navigate(CLIENT_CABINET_ROUTE);
      })
      .catch(() => {
        setIsLinkInvalid(true);
      });
  }, []);

  return (
    <Box>
      {isLinkInvalid ? (
        <Box>{invalidLink}</Box>
      ) : (
        <CircularProgress
          style={{
            display: "flex",
            position: "fixed",
            top: "50%",
            left: "50%",
            marginTop: -20,
            marginLeft: -20,
          }}
        />
      )}
    </Box>
  );
};
