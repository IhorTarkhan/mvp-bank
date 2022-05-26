import React, { ReactElement, useContext, useEffect, useState } from "react";
import {
  Box,
  ButtonBase,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { AdminHeader } from "../../component/header/admin/AdminHeader";
import { AdminContext } from "../../util/AdminContext";
import { Spinner } from "../../component/Spinner";
import { AdminInfoResponse } from "../../dto/response/AdminInfoResponse";
import { axios } from "../../util/AxiosInterceptor";
import { BACKEND_URL } from "../../constant/environment";
import { SUPER_ADMIN_MANAGEMENT_ADMIN_API } from "../../constant/api";
import { AxiosResponse } from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

export const AdminManagementScreen = (): ReactElement => {
  const adminContext = useContext(AdminContext);
  const [admins, setAdmins] = useState<AdminInfoResponse[] | null>(null);

  const updateAdmins = () => {
    axios
      .get(BACKEND_URL + SUPER_ADMIN_MANAGEMENT_ADMIN_API)
      .then((response: AxiosResponse<AdminInfoResponse[]>) => {
        setAdmins(response.data);
      })
      .catch((e: any) => {
        console.error(e);
      });
  };

  const deleteAdmins = (id: number) => {
    axios
      .delete(BACKEND_URL + SUPER_ADMIN_MANAGEMENT_ADMIN_API + "/" + id)
      .then(() => {
        updateAdmins();
      })
      .catch((error: any) => {
        if (error.response.status === 418) {
          alert("You can not remove yourself");
        }
        console.error(error);
      });
  };

  useEffect(() => {
    updateAdmins();
  }, []);

  if (adminContext.isLoading || !adminContext.admin) {
    return <Spinner />;
  }
  if (admins === null) {
    return <Spinner />;
  }

  return (
    <Container>
      <AdminHeader />
      <Box display={"flex"} justifyContent={"end"}>
        <ButtonBase onClick={() => alert("row.id")}>
          <AddIcon />
        </ButtonBase>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Actions</TableCell>
              <TableCell>Id</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Roles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <ButtonBase onClick={() => alert(row.id)}>
                    <EditIcon />
                  </ButtonBase>
                  <ButtonBase onClick={() => deleteAdmins(row.id)}>
                    <DeleteIcon />
                  </ButtonBase>
                </TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.roles.join(", ")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
