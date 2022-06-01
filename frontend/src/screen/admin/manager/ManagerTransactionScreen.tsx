import * as React from "react";
import { ReactElement, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import moment from "moment";
import DownloadingIcon from "@mui/icons-material/Downloading";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Container } from "@mui/material";
import { AdminHeader } from "../../../component/header/admin/AdminHeader";
import { ManagerTransactionsInfoResponse } from "../../../dto/response/admin/manager/ManagerTransactionsInfoResponse";
import { ManagerTransactionsHistoryByUserResponse } from "../../../dto/response/admin/manager/ManagerTransactionsHistoryByUserResponse";
import { axios } from "../../../util/AxiosInterceptor";
import { BACKEND_URL } from "../../../constant/environment";
import {
  MANAGER_TRANSACTION_ACCEPT_API,
  MANAGER_TRANSACTION_API,
  MANAGER_TRANSACTION_CLOSE_API,
} from "../../../constant/api";
import { AxiosResponse } from "axios";
import { Spinner } from "../../../component/Spinner";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type RowProps = {
  row: ManagerTransactionsInfoResponse;
  updateAll: () => void;
};

const Row = (props: RowProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  const getStatusIcon = (
    transaction: ManagerTransactionsHistoryByUserResponse
  ) => {
    if (transaction.accepted === null) {
      return <DownloadingIcon color={"info"} />;
    }
    if (transaction.accepted) {
      return <CheckIcon color={"success"} />;
    }
    return <CloseIcon color={"error"} />;
  };

  const acceptTransactions = (id: number) => {
    axios
      .put(BACKEND_URL + MANAGER_TRANSACTION_ACCEPT_API + "/" + id)
      .then(() => {
        props.updateAll();
      })
      .catch((e: any) => {
        console.error(e);
      });
  };

  const getTotalIncome = (): ReactElement => {
    const accept = props.row.history
      .filter((x) => !x.fromCurrentUser)
      .filter((x) => x.accepted === true)
      .reduce((a, b) => a + b.amount, 0);
    const cancel = props.row.history
      .filter((x) => !x.fromCurrentUser)
      .filter((x) => x.accepted === false)
      .reduce((a, b) => a + b.amount, 0);
    const pending = props.row.history
      .filter((x) => !x.fromCurrentUser)
      .filter((x) => x.accepted === null)
      .reduce((a, b) => a + b.amount, 0);

    return (
      <>
        <span style={{ color: "green" }}>{accept}</span>/
        <span style={{ color: "red" }}>{cancel}</span>/
        <span style={{ color: "blue" }}>{pending}</span>
      </>
    );
  };

  const getTotalOutcome = (): ReactElement => {
    const accept = props.row.history
      .filter((x) => x.fromCurrentUser)
      .filter((x) => x.accepted === true)
      .reduce((a, b) => a + b.amount, 0);
    const cancel = props.row.history
      .filter((x) => x.fromCurrentUser)
      .filter((x) => x.accepted === false)
      .reduce((a, b) => a + b.amount, 0);
    const pending = props.row.history
      .filter((x) => x.fromCurrentUser)
      .filter((x) => x.accepted === null)
      .reduce((a, b) => a + b.amount, 0);

    return (
      <>
        <span style={{ color: "green" }}>{accept}</span>/
        <span style={{ color: "red" }}>{cancel}</span>/
        <span style={{ color: "blue" }}>{pending}</span>
      </>
    );
  };

  const getDirectionIcon = (fromCurrentUser: boolean) => {
    if (fromCurrentUser) {
      return <ArrowForwardIcon color={"info"} />;
    } else {
      return <ArrowBackIcon color={"success"} />;
    }
  };

  const closeTransactions = (id: number) => {
    axios
      .put(BACKEND_URL + MANAGER_TRANSACTION_CLOSE_API + "/" + id)
      .then(() => {
        props.updateAll();
      })
      .catch((e: any) => {
        console.error(e);
      });
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size={"small"} onClick={() => setIsOpen((prev) => !prev)}>
            {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{props.row.userId}</TableCell>
        <TableCell>{props.row.userFullName}</TableCell>
        <TableCell>{getTotalIncome()}</TableCell>
        <TableCell>{getTotalOutcome()}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Target</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.row.history.map((historyRow) => (
                    <TableRow key={historyRow.id}>
                      <TableCell>{historyRow.id}</TableCell>
                      <TableCell>
                        {getDirectionIcon(historyRow.fromCurrentUser)}
                        <>{historyRow.otherUserFullName}</>
                      </TableCell>
                      <TableCell>{historyRow.amount}</TableCell>
                      <TableCell>
                        {moment(historyRow.time).format("HH:mm:ss DD.MM.YYYY")}
                      </TableCell>
                      <TableCell>{getStatusIcon(historyRow)}</TableCell>
                      <TableCell>
                        {historyRow.accepted === null && (
                          <>
                            <Button
                              variant={"outlined"}
                              color={"secondary"}
                              onClick={() => acceptTransactions(historyRow.id)}
                              style={{ margin: "3px" }}
                            >
                              Accept
                            </Button>
                            <Button
                              variant={"outlined"}
                              color={"error"}
                              onClick={() => closeTransactions(historyRow.id)}
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
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export const ManagerTransactionScreen = (): ReactElement => {
  const [transactions, setTransactions] =
    useState<ManagerTransactionsInfoResponse[]>();

  const getTransactions = () => {
    axios
      .get(BACKEND_URL + MANAGER_TRANSACTION_API)
      .then((response: AxiosResponse<ManagerTransactionsInfoResponse[]>) => {
        setTransactions(response.data);
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Total Income</TableCell>
              <TableCell>Total Outcome</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row) => (
              <Row key={row.userId} row={row} updateAll={getTransactions} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
