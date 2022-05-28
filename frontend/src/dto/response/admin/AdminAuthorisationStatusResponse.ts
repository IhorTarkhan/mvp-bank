import { AdminRoles } from "../../AdminRoles";

export type AdminAuthorisationStatusResponse = {
  id: number;
  email: string;
  roles: AdminRoles[];
};
