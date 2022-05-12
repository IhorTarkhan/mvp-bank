import * as React from "react";
import { ReactElement } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { AccountCircle } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { MAIN_APP_COLOR, TEXT_ON_MAIN_COLOR } from "../../constant/colors";
import { Logo } from "../Logo";
import { AreaWithSideMenu } from "../AreaWithSideMenu";
import { AriaWithPopupMenu } from "../AriaWithPopupMenu";
import { useNavigate } from "react-router-dom";
import { CLIENT_HOME_ROUTE } from "../../constant/route";
import { LanguagesInHeader } from "./LanguagesInHeader";
import { SettingsInHeader } from "./SettingsInHeader";

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
