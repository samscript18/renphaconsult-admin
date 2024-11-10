import { RoleNames } from "../enums/admin.enum";

export interface SignUpDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: RoleNames;
}

export interface LoginDTO {
  email: string;
  password: string;
}
