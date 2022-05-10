import * as React from "react";
import { ReactElement, useContext } from "react";
import { ClientContext } from "../../../util/ClientContext";
import { Spinner } from "../../Spinner";
import { VerifiedEmailAuthorizedClientHeader } from "./VerifiedEmailAuthorizedClientHeader";
import { NotVerifiedEmailAuthorizedClientHeader } from "./NotVerifiedEmailAuthorizedClientHeader";
import { UnauthorizedClientHeader } from "./UnauthorizedClientHeader";

export const ClientHeader = (): ReactElement => {
  const userContext = useContext(ClientContext);

  if (userContext.isLoading) {
    return <Spinner />;
  }

  if (userContext.client) {
    if (userContext.client.emailVerified) {
      return <VerifiedEmailAuthorizedClientHeader />;
    } else {
      return <NotVerifiedEmailAuthorizedClientHeader />;
    }
  }

  return <UnauthorizedClientHeader />;
};
