import { AdminRoles } from "../../../AdminRoles";

export type AdminUpdateRequest = {
  id: number;
  roles: AdminRoles[];
  password: string;
};
