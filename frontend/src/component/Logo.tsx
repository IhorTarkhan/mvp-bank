import * as React from "react";
import Typography from "@mui/material/Typography";
import { BoxProps } from "@mui/material/Box/Box";
import { Box } from "@mui/material";

export const Logo = (props: BoxProps) => {
  return (
    <Box marginY={"auto"} marginX={"auto"} {...props}>
      <Typography variant={"h6"}>LOGO (in dev)</Typography>
    </Box>
  );
};
