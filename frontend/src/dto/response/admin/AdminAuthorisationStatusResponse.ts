import { AdminRoles } from "../../AdminRoles";

export type AdminAuthorisationStatusResponse = {
  email: string;
  roles: AdminRoles[];
};
