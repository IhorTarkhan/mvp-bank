import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TOKEN_PARAM } from "../constant/routeParams";
import { Box } from "@mui/material";
import { axios } from "../util/AxiosInterceptor";
import { BACKEND_URL } from "../constant/environment";
import { CLIENT_CONFIRM_EMAIL_API } from "../constant/api";
import { Spinner } from "../component/Spinner";

export const ClientConfirmEmailScreen = (): ReactElement => {
  const params = useParams();
  const token: string = params[TOKEN_PARAM]!;
  const [isLinkInvalid, setIsLinkInvalid] = useState(false);

  const invalidLink = "Invalid confirm email link, todo"; // TODO

  useEffect(() => {
    axios
      .post(BACKEND_URL + CLIENT_CONFIRM_EMAIL_API, { token })
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        setIsLinkInvalid(true);
      });
  }, []);

  if (!isLinkInvalid) {
    return <Spinner />;
  }

  return <Box>{invalidLink}</Box>;
};
