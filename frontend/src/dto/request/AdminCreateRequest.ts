import { AdminRoles } from "../AdminRoles";

export type AdminCreateRequest = {
  username: string;
  email: string;
  roles: AdminRoles[];
  password: string;
};
