import * as React from "react";
import { ReactElement, useContext } from "react";
import { ClientContext } from "../../util/ClientContext";
import { Spinner } from "../../component/Spinner";
import { VerifiedEmailAuthorizedClientRouting } from "./VerifiedEmailAuthorizedClientRouting";
import { NotVerifiedEmailAuthorizedClientRouting } from "./NotVerifiedEmailAuthorizedClientRouting";
import { UnauthorizedClientRouting } from "./UnauthorizedClientRouting";

export const ClientRouting = (): ReactElement => {
  const userContext = useContext(ClientContext);

  if (userContext.isLoading) {
    return <Spinner />;
  }

  if (userContext.client) {
    if (userContext.client.emailVerified) {
      return <VerifiedEmailAuthorizedClientRouting />;
    } else {
      return <NotVerifiedEmailAuthorizedClientRouting />;
    }
  }

  return <UnauthorizedClientRouting />;
};
