import React, { ReactElement } from "react";

export const Second = (): ReactElement => {
  console.log(process.env);

  return <div>Second</div>;
};
