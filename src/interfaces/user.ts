import { ObjectId } from 'mongoose';
import { Types, Document } from 'mongoose';

export interface IUser extends Document {
  _id?: Types.ObjectId;
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

export interface LoginBody {
  email: string;
  password: string;
}

export interface ReqBody extends LoginBody {
  name: string;
  last_name: string;
}
