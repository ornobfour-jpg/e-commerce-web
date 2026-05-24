export type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL';
export type Edition = 'Fan Edition' | 'Player Edition' | 'BD Premium Edition';

export interface ProductStock {
  S: number;
  M: number;
  L: number;
  XL: number;
  XXL: number;
}

export interface Product {
  id: string;
  name: string;
  country: string;
  description: string;
  images: string[];
  stock: ProductStock;
  isWorldCup2026: boolean;
}

export interface CartItem {
  id: string; // unique cart item id (product id + size + edition)
  productId: string;
  size: Size;
  edition: Edition;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  deliveryCharge: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  customerInfo: {
    name: string;
    phone: string;
    division: string;
    zilla: string;
    thana: string;
    address: string;
  };
}
