interface IBaseProduct {
  id: number;
  images: string[];
  title: string;
  category: number;
  rating: number;
  price: number;
}

export interface IProduct extends IBaseProduct {
  types: number[];
  sizes: number[];
}
export interface ISelectedProduct extends IBaseProduct {
  types: number;
  sizes: number;
}
export interface ICartProduct extends ISelectedProduct {
  quantity: number;
}
