import * as React from "react";
import { ReactElement, useEffect, useState } from "react";
import { ClientAuthorisationStatusResponse } from "../../dto/response/ClientAuthorisationStatusResponse";
import { axios } from "../../util/AxiosInterceptor";
import { CLIENT_AUTHORISATION_STATUS_API } from "../../constant/api";
import { AxiosResponse } from "axios";
import { BACKEND_URL } from "../../constant/environment";
import { useCookies } from "react-cookie";
import { CLIENT_JWT_COOKIE } from "../../constant/cookie";
import { Spinner } from "../../component/Spinner";
import { AuthorizedEmailNotVerifiedClientRouting } from "./AuthorizedEmailNotVerifiedClientRouting";
import { AuthorizedEmailVerifiedClientRouting } from "./AuthorizedEmailVerifiedClientRouting";

export const AuthorizedClientRouting = (): ReactElement => {
  const [, , removeCookie] = useCookies([CLIENT_JWT_COOKIE]);
  const [client, setClient] =
    useState<ClientAuthorisationStatusResponse | null>(null);

  useEffect(() => {
    axios
      .get(BACKEND_URL + CLIENT_AUTHORISATION_STATUS_API)
      .then((response: AxiosResponse<ClientAuthorisationStatusResponse>) => {
        setClient(response.data);
      })
      .catch(() => {
        removeCookie(CLIENT_JWT_COOKIE);
      });
  }, [removeCookie]);

  if (client) {
    if (client.emailVerified) {
      return <AuthorizedEmailVerifiedClientRouting />;
    } else {
      return <AuthorizedEmailNotVerifiedClientRouting />;
    }
  } else {
    return <Spinner />;
  }
};
