import React, { ReactElement, useEffect, useState } from "react";
import { Spinner } from "../../../component/Spinner";
import { TransactionInfoResponse } from "../../../dto/response/TransactionInfoResponse";
import { axios } from "../../../util/AxiosInterceptor";
import { BACKEND_URL } from "../../../constant/environment";
import {
  MANAGER_TRANSACTION_ACCEPT_API,
  MANAGER_TRANSACTION_API,
  MANAGER_TRANSACTION_CLOSE_API,
} from "../../../constant/api";
import { AxiosResponse } from "axios";
import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { AdminHeader } from "../../../component/header/admin/AdminHeader";
import DownloadingIcon from "@mui/icons-material/Downloading";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";

export const ManagerTransactionScreen = (): ReactElement => {
  const [transactions, setTransactions] = useState<TransactionInfoResponse[]>();

  const getStatusIcon = (transaction: TransactionInfoResponse) => {
    if (transaction.accepted === null) {
      return <DownloadingIcon color={"info"} />;
    }
    if (transaction.accepted) {
      return <CheckIcon color={"success"} />;
    }

    return <CloseIcon color={"error"} />;
  };

  const getTransactions = () => {
    axios
      .get(BACKEND_URL + MANAGER_TRANSACTION_API)
      .then((response: AxiosResponse<TransactionInfoResponse[]>) => {
        setTransactions(response.data);
      })
      .catch((e: any) => {
        console.error(e);
      });
  };

  const acceptTransactions = (id: number) => {
    axios
      .put(BACKEND_URL + MANAGER_TRANSACTION_ACCEPT_API + "/" + id)
      .then((response: AxiosResponse<TransactionInfoResponse[]>) => {
        getTransactions();
      })
      .catch((e: any) => {
        console.error(e);
      });
  };

  const closeTransactions = (id: number) => {
    axios
      .put(BACKEND_URL + MANAGER_TRANSACTION_CLOSE_API + "/" + id)
      .then((response: AxiosResponse<TransactionInfoResponse[]>) => {
        getTransactions();
      })
      .catch((e: any) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getTransactions();
    setInterval(getTransactions, 10_000);
  }, []);

  if (!transactions) {
    return <Spinner />;
  }

  return (
    <Container>
      <AdminHeader />
      <Typography variant={"h4"}>Client transactions</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>
                  {moment(row.time).format("HH:mm:ss DD.MM.YYYY")}
                </TableCell>
                <TableCell>{`(id=${row.idFrom}) ${row.usernameFrom}`}</TableCell>
                <TableCell>{`(id=${row.idTo}) ${row.usernameTo}`}</TableCell>
                <TableCell>
                  $ {parseFloat(`${row.amount}`).toFixed(2)}
                </TableCell>
                <TableCell>{getStatusIcon(row)}</TableCell>
                <TableCell>
                  {row.accepted === null && (
                    <>
                      <Button
                        variant={"outlined"}
                        color={"secondary"}
                        onClick={() => acceptTransactions(row.id)}
                        style={{ margin: "3px" }}
                      >
                        Accept
                      </Button>
                      <Button
                        variant={"outlined"}
                        color={"error"}
                        onClick={() => closeTransactions(row.id)}
                        style={{ margin: "3px" }}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
