import React, { ReactElement } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { SupportResponseResponse } from "../../dto/response/admin/support/SupportResponseResponse";
import moment from "moment";

interface Props {
  data: SupportResponseResponse[];
  update: () => void;
}

export const OtherSupportRequestsTable = (props: Props): ReactElement => {
  return (
    <>
      <Typography variant={"h6"}>Other requests</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Title</TableCell>
              <TableCell width={"300px"}>Question</TableCell>
              <TableCell>Client Email</TableCell>
              <TableCell>Admin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>
                  {moment(row.createdAt).format("HH:mm:ss DD.MM.YYYY")}
                </TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell width={"300px"}>{row.question}</TableCell>
                <TableCell>{row.clientEmail}</TableCell>
                <TableCell>{row.adminEmail}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
