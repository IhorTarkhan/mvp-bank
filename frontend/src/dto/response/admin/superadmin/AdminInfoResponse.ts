import { AdminRoles } from "../../../AdminRoles";

export type AdminInfoResponse = {
  id: number;
  username: string;
  email: string;
  roles: AdminRoles[];
};
