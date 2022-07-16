interface BaseProduct {
  id: number;
  images: string[];
  title: string;
  category: number;
  rating: number;
  price: number;
}

export interface Product extends BaseProduct {
  types: number[];
  sizes: number[];
}
export interface SelectedProduct extends BaseProduct {
  types: number;
  sizes: number;
}
export interface CartProduct extends SelectedProduct {
  quantity: number;
}
