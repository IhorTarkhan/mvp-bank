import * as React from "react";
import { createContext, ReactElement, useEffect, useState } from "react";
import { ADMIN_JWT_COOKIE } from "../constant/cookie";
import { useCookies } from "react-cookie";
import { axios } from "./AxiosInterceptor";
import { BACKEND_URL } from "../constant/environment";
import { ADMIN_AUTHORISATION_STATUS_API } from "../constant/api";
import { AxiosResponse } from "axios";
import { AdminAuthorisationStatusResponse } from "../dto/response/AdminAuthorisationStatusResponse";

type AdminContextData = {
  isLoading: boolean;
  admin: AdminAuthorisationStatusResponse | null;
};

export const AdminContext = createContext<AdminContextData>({
  isLoading: true,
  admin: null,
});

type Props = { children: ReactElement };

export const AdminProvider = (props: Props): ReactElement => {
  const [cookie, , removeCookie] = useCookies([ADMIN_JWT_COOKIE]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [admin, setAdmin] = useState<AdminAuthorisationStatusResponse | null>(
    null
  );

  useEffect(() => {
    if (!cookie[ADMIN_JWT_COOKIE]) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    axios
      .get(BACKEND_URL + ADMIN_AUTHORISATION_STATUS_API)
      .then((response: AxiosResponse<AdminAuthorisationStatusResponse>) => {
        setAdmin(response.data);
      })
      .catch(() => {
        removeCookie(ADMIN_JWT_COOKIE);
        window.location.reload();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [cookie, removeCookie]);

  return (
    <AdminContext.Provider
      value={{
        isLoading: isLoading,
        admin: admin,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};
