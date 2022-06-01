import { ManagerTransactionsHistoryByUserResponse } from "./ManagerTransactionsHistoryByUserResponse";

export type ManagerTransactionsInfoResponse = {
  userId: number;
  userFullName: string;
  history: ManagerTransactionsHistoryByUserResponse[];
};
