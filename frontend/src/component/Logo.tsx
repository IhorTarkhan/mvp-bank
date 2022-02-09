import * as React from "react";
import { CSSProperties, ReactElement } from "react";

export const Logo = (props: CSSProperties): ReactElement => {
  return <img alt={"logo"} src={"image/logo.svg"} style={props} />;
};
