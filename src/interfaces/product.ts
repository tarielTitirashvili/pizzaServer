import { Types } from 'mongoose';

interface IBaseProduct {
  _id?: Types.ObjectId;
  images?: string[];
  title: string;
  category?: string;
  rating?: number;
  price?: number;
}

export interface IProduct extends IBaseProduct {
  types?: number[];
  sizes?: number[];
}
export interface ISelectedProduct extends IBaseProduct {
  types?: number;
  sizes?: number;
}
export interface ICartProduct extends ISelectedProduct {
  quantity?: number;
}
