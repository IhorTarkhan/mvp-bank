import React, { ReactElement, useContext } from "react";
import { Container, List, ListItem, Typography } from "@mui/material";
import { AdminHeader } from "../../component/header/admin/AdminHeader";
import { AdminContext } from "../../util/AdminContext";
import { Spinner } from "../../component/Spinner";

export const AdminHomeScreen = (): ReactElement => {
  const adminContext = useContext(AdminContext);

  if (adminContext.isLoading || !adminContext.admin) {
    return <Spinner />;
  }

  return (
    <Container>
      <AdminHeader />
      <Typography variant={"h4"}>
        Admin: <b>{adminContext.admin.email}</b>
      </Typography>
      <br />
      <Typography variant={"h5"}>Your roles</Typography>
      <List>
        {adminContext.admin.roles.map((role) => (
          <ListItem>{role}</ListItem>
        ))}
      </List>
    </Container>
  );
};
