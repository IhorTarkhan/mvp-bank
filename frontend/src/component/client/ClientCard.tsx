import React, { ReactElement, useContext } from "react";
import { Box, Typography } from "@mui/material";
import { ClientContext } from "../../util/ClientContext";
import { Spinner } from "../Spinner";
import lime from "@mui/material/colors/lime";

export const ClientCard = (): ReactElement => {
  const userContext = useContext(ClientContext);

  if (!userContext.client) {
    return <Spinner />;
  }

  return (
    <Box>
      <Box
        width={"400px"}
        height={"250px"}
        marginTop={"25px"}
        borderRadius={"25px"}
        style={{ background: lime[800] }}
      >
        <Box
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"row"}
          paddingTop={"66px"}
        >
          <Typography variant={"h4"} color={"aliceblue"}>
            {userContext.client.cardNumber.match(/.{1,4}/g)?.join(" ")}
          </Typography>
        </Box>

        <Box display={"flex"} justifyContent={"end"}>
          <Typography variant={"h4"} color={"aliceblue"} padding={"40px"}>
            $ {parseFloat("" + userContext.client.amount).toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
