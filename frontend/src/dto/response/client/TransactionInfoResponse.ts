export type TransactionInfoResponse = {
  id: number;
  idFrom: number;
  usernameFrom: string;
  idTo: number;
  usernameTo: string;
  amount: number;
  time: Date;
  accepted: boolean | null;
};
