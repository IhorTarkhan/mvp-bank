import * as React from "react";
import { ReactElement } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { AccountCircle } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Language, useLocale } from "../../../i18n/i18n";
import { MAIN_APP_COLOR, TEXT_ON_MAIN_COLOR } from "../../../constant/colors";
import { Logo } from "../../Logo";
import { AreaWithSideMenu } from "../../AreaWithSideMenu";
import { AriaWithPopupMenu } from "../../AriaWithPopupMenu";
import { useNavigate } from "react-router-dom";
import { CLIENT_HOME_ROUTE } from "../../../constant/route";

type Props = {
  settings?: { name: string; onClick: () => void; icon?: ReactElement }[];
  pages?: { name: string; onClick: () => void; icon?: ReactElement }[];
};

export const AbstractClientHeader = (props: Props): ReactElement => {
  const navigate = useNavigate();
  const [locale, setLanguage] = useLocale();

  const languages = [
    {
      name: locale.header.language.english,
      onClick: () => setLanguage(Language.EN),
    },
    {
      name: locale.header.language.ukrainian,
      onClick: () => setLanguage(Language.UA),
    },
  ];

  return (
    <>
      <AppBar>
        <Toolbar style={{ background: MAIN_APP_COLOR }}>
          <Box display={["none", "none", "flex"]} flexGrow={1}>
            <Box
              marginRight={5}
              width={56}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(CLIENT_HOME_ROUTE)}
            >
              <Logo />
            </Box>
            {props.pages && (
              <Box display={"flex"} flexGrow={1}>
                {props.pages.map((page, index) => (
                  <Button
                    key={index}
                    onClick={page.onClick}
                    style={{ color: TEXT_ON_MAIN_COLOR }}
                  >
                    {page.name}
                  </Button>
                ))}
              </Box>
            )}
          </Box>
          <Box display={["flex", "flex", "none"]} flexGrow={1}>
            {props.pages && (
              <AreaWithSideMenu fields={props.pages}>
                <IconButton style={{ color: TEXT_ON_MAIN_COLOR }}>
                  <MenuIcon />
                </IconButton>
              </AreaWithSideMenu>
            )}
            <Box
              position={"fixed"}
              width={56}
              left={"calc(50% - 28px)"}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(CLIENT_HOME_ROUTE)}
            >
              <Logo />
            </Box>
          </Box>
          <AriaWithPopupMenu fields={languages}>
            <>{locale.header.language.languageLabel}</>
          </AriaWithPopupMenu>
          {props.settings && (
            <AriaWithPopupMenu fields={props.settings}>
              <IconButton style={{ color: TEXT_ON_MAIN_COLOR, marginLeft: 10 }}>
                <AccountCircle />
              </IconButton>
            </AriaWithPopupMenu>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar style={{ marginBottom: 15 }} />
    </>
  );
};
