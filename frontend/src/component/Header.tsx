import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Logo } from "./Logo";
import { AccountCircle } from "@mui/icons-material";
import { MAIN_APP_COLOR, TEXT_ON_MAIN_COLOR } from "../constant/colors";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);
  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
                  onClick={handleCloseNavMenu}
                  style={{ color: TEXT_ON_MAIN_COLOR }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Box>
          <Box display={["flex", "flex", "none"]} flexGrow={1}>
            <Box flexGrow={1}>
              <IconButton
                aria-controls={"menu-appbar"}
                onClick={handleOpenNavMenu}
                style={{ color: TEXT_ON_MAIN_COLOR }}
                aria-haspopup
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id={"menu-appbar"}
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign={"center"}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Logo flexGrow={1} />
          </Box>
          <Box>
            <IconButton
              aria-controls={"avatar-appbar"}
              onClick={handleOpenUserMenu}
              style={{ color: TEXT_ON_MAIN_COLOR }}
              aria-haspopup
            >
              <AccountCircle />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id={"avatar-appbar"}
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, id) => (
                <MenuItem key={id} onClick={handleCloseUserMenu}>
                  <Typography textAlign={"center"}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar style={{ marginBottom: 15 }} />
    </>
  );
};
