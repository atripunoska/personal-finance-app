export enum ModalType {
  ADD = "add",
  WITHDRAW = "withdraw",
  EDIT = "edit",
  DELETE = "delete",
  NONE = null,
}

export type Pages = {
  name: string;
  path: string;
  icon: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};
