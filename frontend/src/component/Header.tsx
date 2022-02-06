import * as React from "react";
import { ReactElement } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { Logo } from "./Logo";
import { AccountCircle } from "@mui/icons-material";
import { MAIN_APP_COLOR, TEXT_ON_MAIN_COLOR } from "../constant/colors";
import { AriaWithPopupMenu } from "./AriaWithPopupMenu";
import { IconButton } from "@mui/material";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export const Header = (): ReactElement => {
  return (
    <>
      <AppBar>
        <Toolbar style={{ background: MAIN_APP_COLOR }}>
          <Box display={["none", "none", "flex"]} flexGrow={1}>
            <Logo marginRight={5} />
            <Box display={"flex"} flexGrow={1}>
              {pages.map((page, index) => (
                <Button
                  key={index}
                  onClick={() => console.log("page =", page)}
                  style={{ color: TEXT_ON_MAIN_COLOR }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Box>
          <Box display={["flex", "flex", "none"]} flexGrow={1}>
            <AriaWithPopupMenu
              fields={pages.map((page) => ({
                name: page,
                onClick: () => console.log("page =", page),
              }))}
            >
              <IconButton style={{ color: TEXT_ON_MAIN_COLOR }}>
                <MenuIcon />
              </IconButton>
            </AriaWithPopupMenu>
            <Logo flexGrow={1} justifySelf={"center"} alignSelf={"center"} />
          </Box>
          <AriaWithPopupMenu
            fields={settings.map((set) => ({
              name: set,
              onClick: () => console.log("settings =", set),
            }))}
          >
            <IconButton style={{ color: TEXT_ON_MAIN_COLOR }}>
              <AccountCircle />
            </IconButton>
          </AriaWithPopupMenu>
        </Toolbar>
      </AppBar>
      <Toolbar style={{ marginBottom: 15 }} />
    </>
  );
};
