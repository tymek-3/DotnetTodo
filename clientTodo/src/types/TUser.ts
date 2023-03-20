import { TTodo } from "./TTodo";

export type TUser = {
  id: string;
  createdAt: Date;
  modifiedAt: Date;
  username: string;
  todos?: TTodo[];
};
