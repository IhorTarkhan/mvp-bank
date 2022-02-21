import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TOKEN_PARAM } from "../constant/routeParams";
import { Container } from "@mui/material";
import { axios } from "../util/AxiosInterceptor";
import { BACKEND_URL } from "../constant/environment";
import { CLIENT_CONFIRM_EMAIL_API } from "../constant/api";
import { Spinner } from "../component/Spinner";
import { ClientAuthorizedNotConfirmedHeader } from "../component/header/ClientAuthorizedNotConfirmedHeader";
import { useCookies } from "react-cookie";
import { CLIENT_JWT_COOKIE } from "../constant/cookie";
import { ClientUnauthorizedHeader } from "../component/header/ClientUnauthorizedHeader";

export const ClientConfirmEmailScreen = (): ReactElement => {
  const params = useParams();
  const [cookie] = useCookies([CLIENT_JWT_COOKIE]);
  const token: string = params[TOKEN_PARAM]!;
  const [isLoading, setIsLoading] = useState(true);

  let Header: () => ReactElement;
  if (cookie[CLIENT_JWT_COOKIE]) {
    Header = ClientAuthorizedNotConfirmedHeader;
  } else {
    Header = ClientUnauthorizedHeader;
  }

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
        <Header />
        <Spinner />
      </Container>
    );
  }

  return (
    <Container maxWidth={false}>
      <Header />
      {invalidLink}
    </Container>
  );
};
