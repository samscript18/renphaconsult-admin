import { DefaultModel } from ".";
import { RoleNames } from "../enums/admin.enum";

export interface Admin extends DefaultModel {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  profilePicture: string;
  role: RoleNames;
}
