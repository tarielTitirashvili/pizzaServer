import { ObjectId } from 'mongoose';
import { Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  token?: string;
}

export interface ModelUser {
  name: string;
  last_name: string;
  email: string;
  password: string;
  token: string;
  role: string;
}

export interface ILoginBody {
  email: string;
  password: string;
}

export interface IReqBody extends ILoginBody {
  role: 'ADMIN' | 'user' | undefined;
  name: string;
  last_name: string;
}
