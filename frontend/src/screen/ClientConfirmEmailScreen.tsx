import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TOKEN_PARAM } from "../constant/route-params";
import { Container } from "@mui/material";
import { axios } from "../util/AxiosInterceptor";
import { BACKEND_URL } from "../constant/environment";
import { CLIENT_CONFIRM_EMAIL_API } from "../constant/api";
import { Spinner } from "../component/Spinner";
import { ClientHeader } from "../component/header/client/ClientHeader";

export const ClientConfirmEmailScreen = (): ReactElement => {
  const params = useParams();
  const token: string = params[TOKEN_PARAM]!;
  const [isLoading, setIsLoading] = useState(true);

  const invalidLink = "Invalid confirm email link, todo"; // TODO

  useEffect(() => {
    axios
      .post(BACKEND_URL + CLIENT_CONFIRM_EMAIL_API, { token: token })
      .then(() => {
        window.location.reload();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token]);

  if (isLoading) {
    return (
      <Container maxWidth={false}>
        <ClientHeader />
        <Spinner />
      </Container>
    );
  }

  return (
    <Container maxWidth={false}>
      <ClientHeader />
      {invalidLink}
    </Container>
  );
};
