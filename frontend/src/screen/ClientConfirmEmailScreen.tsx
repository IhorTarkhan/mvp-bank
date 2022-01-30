import React, { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { TOKEN_PARAM } from "../constant/routeParams";

export const ClientConfirmEmailScreen = (): ReactElement => {
  const params = useParams();
  const tokes: string = params[TOKEN_PARAM]!;
  return (
    <div>
      Client Confirm Email Screen
      <br />
      Your token is <code>{tokes}</code>
    </div>
  );
};
