import { TUser } from ".";

export type TTodo = {
  id: string;
  user: TUser;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
  modifiedAt: Date;
};
