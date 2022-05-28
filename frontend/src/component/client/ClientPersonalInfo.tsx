import React, { ReactElement, useContext } from "react";
import { Box, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ClientContext } from "../../util/ClientContext";
import { Spinner } from "../Spinner";
import grey from "@mui/material/colors/grey";

export const ClientPersonalInfo = (): ReactElement => {
  const userContext = useContext(ClientContext);

  if (!userContext.client) {
    return <Spinner />;
  }

  return (
    <Box
      width={["100%", "100%", "50%"]}
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"row"}
    >
      <Box>
        <AccountCircleIcon style={{ fontSize: "300px", color: grey[500] }} />
        <Typography variant={"h4"}>
          {`${userContext.client.firstName} ${userContext.client.lastName}`}
        </Typography>
        <Typography variant={"h5"}>{userContext.client.email}</Typography>
        <Typography variant={"h5"}>{userContext.client.cardNumber}</Typography>
      </Box>
    </Box>
  );
};
