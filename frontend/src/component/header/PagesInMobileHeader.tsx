import * as React from "react";
import { ReactElement } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { TEXT_ON_MAIN_COLOR } from "../../constant/colors";
import { AreaWithSideMenu } from "../AreaWithSideMenu";

type Props = {
  pages: { name: string; onClick: () => void; icon?: ReactElement }[];
};

export const PagesInMobileHeader = (props: Props): ReactElement => {
  return (
    <AreaWithSideMenu fields={props.pages}>
      <IconButton style={{ color: TEXT_ON_MAIN_COLOR }}>
        <MenuIcon />
      </IconButton>
    </AreaWithSideMenu>
  );
};
