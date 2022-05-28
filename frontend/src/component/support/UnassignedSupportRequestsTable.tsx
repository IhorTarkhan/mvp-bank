import React, { ReactElement } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { axios } from "../../util/AxiosInterceptor";
import { BACKEND_URL } from "../../constant/environment";
import { SUPPORT_SUPPORT_REQUEST_ACCEPT_API } from "../../constant/api";
import { SupportResponseResponse } from "../../dto/response/admin/support/SupportResponseResponse";
import moment from "moment";

interface Props {
  allRequests: SupportResponseResponse[];
  update: () => void;
}

export const UnassignedSupportRequestsTable = (props: Props): ReactElement => {
  const acceptSupportRequests = (id: number) => {
    axios
      .put(BACKEND_URL + SUPPORT_SUPPORT_REQUEST_ACCEPT_API + "/" + id)
      .then(() => {
        props.update();
      })
      .catch((e: any) => {
        console.error(e);
      });
  };

  return (
    <>
      <Typography variant={"h6"}>Unassigned requests</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Title</TableCell>
              <TableCell width={"300px"}>Question</TableCell>
              <TableCell>Client Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.allRequests
              .filter((r) => r.adminEmail === null)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>
                    {moment(row.createdAt).format("HH:mm:ss DD.MM.YYYY")}
                  </TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell width={"300px"}>{row.question}</TableCell>
                  <TableCell>{row.clientEmail}</TableCell>
                  <TableCell>
                    <Button
                      variant={"outlined"}
                      color={"secondary"}
                      onClick={() => acceptSupportRequests(row.id)}
                    >
                      Accept
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
