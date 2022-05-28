import * as React from "react";
import { ReactElement } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { MAIN_APP_COLOR } from "../../constant/colors";
import { Logo } from "../Logo";
import { useNavigate } from "react-router-dom";
import { LanguagesInHeader } from "./LanguagesInHeader";
import { SettingsInHeader } from "./SettingsInHeader";
import { PagesInMobileHeader } from "./PagesInMobileHeader";
import { PagesInDesktopHeader } from "./PagesInDesktopHeader";

type Props = {
  settings?: { name: string; onClick: () => void; icon?: ReactElement }[];
  pages?: { name: string; onClick: () => void; icon?: ReactElement }[];
  disableLanguage?: boolean;
};

export const AbstractHeader = (props: Props): ReactElement => {
  const navigate = useNavigate();

  return (
    <>
      <AppBar>
        <Toolbar style={{ background: MAIN_APP_COLOR }}>
          <>
            <Box display={["none", "none", "flex"]} flexGrow={1}>
              <Box
                marginRight={5}
                width={56}
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
                <Logo />
              </Box>
              {props.pages && (
                <Box display={"flex"} flexGrow={1}>
                  <PagesInDesktopHeader pages={props.pages} />
                </Box>
              )}
            </Box>
            <Box display={["flex", "flex", "none"]} flexGrow={1}>
              {props.pages && <PagesInMobileHeader pages={props.pages} />}
              <Box
                position={"fixed"}
                width={56}
                height={56}
                left={"calc(50% - 28px)"} // - 50% of width
                top={"14px"} // 25% of height
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
                <Logo />
              </Box>
            </Box>
            {props.disableLanguage || <LanguagesInHeader />}
            {props.settings && <SettingsInHeader settings={props.settings} />}
          </>
        </Toolbar>
      </AppBar>
      <Toolbar style={{ marginBottom: 15 }} />
    </>
  );
};
