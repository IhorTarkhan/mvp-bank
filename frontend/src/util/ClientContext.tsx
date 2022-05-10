import * as React from "react";
import { createContext, ReactElement, useEffect, useState } from "react";
import { ClientAuthorisationStatusResponse } from "../dto/response/ClientAuthorisationStatusResponse";
import { CLIENT_JWT_COOKIE } from "../constant/cookie";
import { useCookies } from "react-cookie";
import { axios } from "./AxiosInterceptor";
import { BACKEND_URL } from "../constant/environment";
import { CLIENT_AUTHORISATION_STATUS_API } from "../constant/api";
import { AxiosResponse } from "axios";

type ClientContextData = {
  isLoading: boolean;
  client: ClientAuthorisationStatusResponse | null;
  updateClient: () => void;
};

export const ClientContext = createContext<ClientContextData>({
  isLoading: true,
  client: null,
  updateClient: () => {},
});

type Props = { children: ReactElement };

export const ClientProvider = (props: Props): ReactElement => {
  const [cookie, , removeCookie] = useCookies([CLIENT_JWT_COOKIE]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [client, setClient] =
    useState<ClientAuthorisationStatusResponse | null>(null);

  const updateClient = () => {
    if (!cookie[CLIENT_JWT_COOKIE]) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    axios
      .get(BACKEND_URL + CLIENT_AUTHORISATION_STATUS_API)
      .then((response: AxiosResponse<ClientAuthorisationStatusResponse>) => {
        setClient(response.data);
      })
      .catch(() => {
        removeCookie(CLIENT_JWT_COOKIE);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    updateClient();
  }, [removeCookie]);

  return (
    <ClientContext.Provider
      value={{
        isLoading: isLoading,
        client: client,
        updateClient: updateClient,
      }}
    >
      {props.children}
    </ClientContext.Provider>
  );
};
