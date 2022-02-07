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
import { AreaWithSideMenu } from "./AreaWithSideMenu";
import MailIcon from "@mui/icons-material/Mail";

export const Header = (): ReactElement => {
  const pages = [
    {
      name: "Products",
      onClick: () => console.log("page = Products"),
      icon: <MailIcon />,
    },
    {
      name: "Pricing",
      onClick: () => console.log("page = Pricing"),
      icon: undefined,
    },
    {
      name: "Blog",
      onClick: () => console.log("page = Blog"),
      icon: undefined,
    },
  ];
  const settings = [
    {
      name: "Profile",
      onClick: () => console.log("setting = Profile"),
    },
    {
      name: "Account",
      onClick: () => console.log("setting = Account"),
    },
    {
      name: "Dashboard",
      onClick: () => console.log("setting = Dashboard"),
    },
    {
      name: "Logout",
      onClick: () => console.log("setting = Logout"),
    },
  ];
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
                  onClick={page.onClick}
                  style={{ color: TEXT_ON_MAIN_COLOR }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
          </Box>
          <Box display={["flex", "flex", "none"]} flexGrow={1}>
            <AreaWithSideMenu fields={pages}>
              <IconButton style={{ color: TEXT_ON_MAIN_COLOR }}>
                <MenuIcon />
              </IconButton>
            </AreaWithSideMenu>
            <Logo flexGrow={1} justifySelf={"center"} alignSelf={"center"} />
          </Box>
          <AriaWithPopupMenu fields={settings}>
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
