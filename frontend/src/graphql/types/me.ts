import { UserType } from "./userType";

export interface Me {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
  userType: UserType | null;
}
