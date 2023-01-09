export interface IDbRecord {
  id: number;
}

export interface IUser extends IDbRecord {
  username: string;
  email: string;
  password: string;
}

export type ICreateUser = Pick<IUser, 'username'|'email'|'password'>;

export type ICreateSession = Pick<IUser, 'email'|'password'>;

export interface ISession {
  id_token: string;
}

export interface ICreateTransaction {
  name: string;
  amount: number;
}

export interface ITransaction extends IDbRecord {
  date: string;
  username: string;
  amount: number;
  balance: number;
}

export interface IUserInfo extends IDbRecord {
  name: string;
  email: string;
  balance: number;
}

export interface IUserListItem extends IDbRecord {
  name: string;
}
