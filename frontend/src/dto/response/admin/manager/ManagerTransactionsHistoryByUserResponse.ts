export type ManagerTransactionsHistoryByUserResponse = {
  id: number;
  fromCurrentUser: boolean;
  otherUserId: number;
  otherUserFullName: string;
  amount: number;
  time: Date;
  accepted: boolean | null;
};
