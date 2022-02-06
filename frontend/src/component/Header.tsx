import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { Logo } from "./Logo";
import { AccountCircle } from "@mui/icons-material";
import { MAIN_APP_COLOR, TEXT_ON_MAIN_COLOR } from "../constant/colors";
import { AriaWithPopupMenu } from "./AriaWithPopupMenu";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export const Header = () => {
  return (
    <>
      <AppBar>
        <Toolbar style={{ background: MAIN_APP_COLOR }}>
          <Box display={["none", "none", "flex"]} flexGrow={1}>
            <Logo marginRight={5} />
            <Box display={"flex"} flexGrow={1}>
              {pages.map((page, id) => (
                <Button
                  key={id}
                  onClick={() => console.log("page =", page)}
                  style={{ color: TEXT_ON_MAIN_COLOR }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Box>
          <Box display={["flex", "flex", "none"]} flexGrow={1}>
            <Box flexGrow={1}>
              <AriaWithPopupMenu
                fields={pages.map((page) => ({
                  name: page,
                  onClick: () => console.log("page =", page),
                }))}
                iconStyles={{ color: TEXT_ON_MAIN_COLOR }}
              >
                <MenuIcon />
              </AriaWithPopupMenu>
            </Box>
            <Logo flexGrow={1} />
          </Box>
          <Box>
            <AriaWithPopupMenu
              fields={settings.map((set) => ({
                name: set,
                onClick: () => console.log("settings =", set),
              }))}
              iconStyles={{ color: TEXT_ON_MAIN_COLOR }}
            >
              <AccountCircle />
            </AriaWithPopupMenu>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar style={{ marginBottom: 15 }} />
    </>
  );
};
