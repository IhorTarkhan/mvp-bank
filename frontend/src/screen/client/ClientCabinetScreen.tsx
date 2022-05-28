import React, { ReactElement, useContext } from "react";
import { Box, Container, Typography } from "@mui/material";
import { ClientHeader } from "../../component/header/client/ClientHeader";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ClientContext } from "../../util/ClientContext";
import { Spinner } from "../../component/Spinner";
import grey from "@mui/material/colors/grey";
import lime from "@mui/material/colors/lime";

export const ClientCabinetScreen = (): ReactElement => {
  const userContext = useContext(ClientContext);

  if (!userContext.client) {
    return <Spinner />;
  }

  return (
    <Container>
      <ClientHeader />
      <Box display={"flex"} flexDirection={["column", "column", "row"]}>
        <Box
          width={["100%", "100%", "50%"]}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"row"}
        >
          <Box>
            <AccountCircleIcon
              style={{ fontSize: "300px", color: grey[500] }}
            />
            <Typography variant={"h4"}>
              {`${userContext.client.firstName} ${userContext.client.lastName}`}
            </Typography>
            <Typography variant={"h5"}>{userContext.client.email}</Typography>
            <Typography variant={"h5"}>
              {userContext.client.cardNumber}
            </Typography>
          </Box>
        </Box>
        <Box
          width={["100%", "100%", "50%"]}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"row"}
        >
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
        </Box>
      </Box>
    </Container>
  );
};
