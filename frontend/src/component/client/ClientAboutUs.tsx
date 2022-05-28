import React, { ReactElement } from "react";
import { Box, Typography } from "@mui/material";
import { useLocale } from "../../i18n/i18n";

export const ClientAboutUs = (): ReactElement => {
  const [local] = useLocale();

  return (
    <Box>
      <Typography variant={"h5"}>{local.homeScreen.aboutUs.title}</Typography>
    </Box>
  );
};
