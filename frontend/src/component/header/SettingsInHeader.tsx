import * as React from "react";
import { ReactElement } from "react";
import { AccountCircle } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { TEXT_ON_MAIN_COLOR } from "../../constant/colors";
import { AriaWithPopupMenu } from "../AriaWithPopupMenu";

type Props = {
  settings: { name: string; onClick: () => void; icon?: ReactElement }[];
};

export const SettingsInHeader = (props: Props): ReactElement => {
  return (
    <AriaWithPopupMenu fields={props.settings}>
      <IconButton style={{ color: TEXT_ON_MAIN_COLOR, marginLeft: 10 }}>
        <AccountCircle />
      </IconButton>
    </AriaWithPopupMenu>
  );
};
