import React, { ReactElement } from "react";

export const First = (): ReactElement => {
  console.log(process.env);

  return <div>First</div>;
};
