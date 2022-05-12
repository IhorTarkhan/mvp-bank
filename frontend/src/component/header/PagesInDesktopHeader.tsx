import * as React from "react";
import { ReactElement } from "react";
import Button from "@mui/material/Button";
import { TEXT_ON_MAIN_COLOR } from "../../constant/colors";

type Props = {
  pages: { name: string; onClick: () => void; icon?: ReactElement }[];
};

export const PagesInDesktopHeader = (props: Props): ReactElement => {
  return (
    <>
      {props.pages.map((page, index) => (
        <Button
          key={index}
          onClick={page.onClick}
          style={{ color: TEXT_ON_MAIN_COLOR }}
        >
          {page.name}
        </Button>
      ))}
    </>
  );
};
