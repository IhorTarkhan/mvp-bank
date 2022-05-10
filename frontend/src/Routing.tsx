import * as React from "react";
import { ReactElement } from "react";
import { useCookies } from "react-cookie";
import { CLIENT_JWT_COOKIE } from "./constant/cookie";
import { AuthorizedClientRouting } from "./routing/client/AuthorizedClientRouting";
import { UnauthorizedClientRouting } from "./routing/client/UnauthorizedClientRouting";

export const Routing = (): ReactElement => {
  const [cookie] = useCookies([CLIENT_JWT_COOKIE]);

  if (cookie[CLIENT_JWT_COOKIE]) {
    return <AuthorizedClientRouting />;
  }

  return <UnauthorizedClientRouting />;
};
