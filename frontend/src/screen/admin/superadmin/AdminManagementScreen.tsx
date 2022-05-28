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
import { AdminHeader } from "../../../component/header/admin/AdminHeader";
import { AdminContext } from "../../../util/AdminContext";
import { Spinner } from "../../../component/Spinner";
import { AdminInfoResponse } from "../../../dto/response/admin/superadmin/AdminInfoResponse";
import { axios } from "../../../util/AxiosInterceptor";
import { BACKEND_URL } from "../../../constant/environment";
import { SUPER_ADMIN_MANAGEMENT_ADMIN_API } from "../../../constant/api";
import { AxiosResponse } from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { AdminCreateRequest } from "../../../dto/request/admin/superadmin/AdminCreateRequest";
import { CreateAdminPopup } from "../../../component/superadmin/CreateAdminPopup";
import { AdminUpdateRequest } from "../../../dto/request/admin/superadmin/AdminUpdateRequest";
import { UpdateAdminPopup } from "../../../component/superadmin/UpdateAdminPopup";

export const AdminManagementScreen = (): ReactElement => {
  const adminContext = useContext(AdminContext);
  const [admins, setAdmins] = useState<AdminInfoResponse[] | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const [updatingAdmin, setUpdatingAdmin] = useState<AdminInfoResponse>();

  const getAdmins = () => {
    axios
      .get(BACKEND_URL + SUPER_ADMIN_MANAGEMENT_ADMIN_API)
      .then((response: AxiosResponse<AdminInfoResponse[]>) => {
        setAdmins(response.data);
      })
      .catch((e: any) => {
        console.error(e);
      });
  };

  const createAdmin = (request: AdminCreateRequest) => {
    axios
      .post(BACKEND_URL + SUPER_ADMIN_MANAGEMENT_ADMIN_API, request)
      .then(() => {
        getAdmins();
      })
      .catch((e: any) => {
        console.error(e);
      });
  };

  const updateAdmin = (request: AdminUpdateRequest) => {
    axios
      .put(BACKEND_URL + SUPER_ADMIN_MANAGEMENT_ADMIN_API, request)
      .then(() => {
        getAdmins();
      })
      .catch((e: any) => {
        console.error(e);
      });
  };

  const deleteAdmin = (id: number) => {
    axios
      .delete(BACKEND_URL + SUPER_ADMIN_MANAGEMENT_ADMIN_API + "/" + id)
      .then(() => {
        getAdmins();
      })
      .catch((error: any) => {
        if (error.response.status === 418) {
          alert("You can not remove yourself");
        }
        console.error(error);
      });
  };

  const openCreatePopup = () => {
    setIsCreateOpen(true);
  };

  const canselCreate = () => {
    setIsCreateOpen(false);
  };

  const agreeCreate = (request: AdminCreateRequest) => {
    createAdmin(request);
    setIsCreateOpen(false);
  };

  const openUpdatePopup = (row: AdminInfoResponse) => {
    setUpdatingAdmin(row);
    setIsUpdateOpen(true);
  };

  const canselUpdate = () => {
    setIsUpdateOpen(false);
  };

  const agreeUpdate = (request: AdminUpdateRequest) => {
    updateAdmin(request);
    setIsUpdateOpen(false);
  };

  useEffect(() => {
    getAdmins();
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
        <ButtonBase onClick={openCreatePopup}>
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
                  <ButtonBase onClick={() => openUpdatePopup(row)}>
                    <EditIcon />
                  </ButtonBase>
                  <ButtonBase onClick={() => deleteAdmin(row.id)}>
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
      <CreateAdminPopup
        isOpen={isCreateOpen}
        agree={agreeCreate}
        cansel={canselCreate}
      />
      <UpdateAdminPopup
        isOpen={isUpdateOpen}
        agree={agreeUpdate}
        cansel={canselUpdate}
        updatingAdmin={updatingAdmin}
      />
    </Container>
  );
};
