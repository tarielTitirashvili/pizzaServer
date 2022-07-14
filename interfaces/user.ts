export interface IUser {
  _id?: string;
  name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  token?: string;
}
