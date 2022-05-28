import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TOKEN_PARAM } from "../../constant/route-params";
import { Container } from "@mui/material";
import { axios } from "../../util/AxiosInterceptor";
import { BACKEND_URL } from "../../constant/environment";
import { CLIENT_CONFIRM_EMAIL_API } from "../../constant/api";
import { Spinner } from "../../component/Spinner";
import { ClientHeader } from "../../component/header/client/ClientHeader";
import { useLocale } from "../../i18n/i18n";

export const ClientConfirmEmailScreen = (): ReactElement => {
  const params = useParams();
  const token: string = params[TOKEN_PARAM]!;
  const [isLoading, setIsLoading] = useState(true);
  const [locale] = useLocale();

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
      <Container>
        <ClientHeader />
        <Spinner />
      </Container>
    );
  }

  return (
    <Container>
      <ClientHeader />
      {locale.clientConfirmEmailScreen.invalid}
    </Container>
  );
};
