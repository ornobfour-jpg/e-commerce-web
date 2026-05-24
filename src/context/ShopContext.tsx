import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order } from '../types';
import { INITIAL_PRODUCTS } from '../data';

interface ShopContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, amount: number) => void;
  clearCart: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  removeOrder: (id: string) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  userEmail: string | null;
  setUserEmail: (email: string | null) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-12345',
      date: new Date().toISOString(),
      items: [],
      total: 1298,
      deliveryCharge: 80,
      status: 'Pending',
      customerInfo: { name: 'John Doe', phone: '01711223344', division: 'Dhaka', zilla: 'Dhaka', thana: 'Mirpur', address: '123 Main St' }
    }
  ]);
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('isAdmin') === 'true');
  const [userEmail, setUserEmail] = useState<string | null>(() => localStorage.getItem('userEmail'));

  useEffect(() => {
    localStorage.setItem('isAdmin', String(isAdmin));
  }, [isAdmin]);

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem('userEmail', userEmail);
    } else {
      localStorage.removeItem('userEmail');
    }
  }, [userEmail]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, amount: number) => {
    setCart((prev) => prev.map((i) => {
      if (i.id === id) {
        const newQ = Math.max(1, i.quantity + amount);
        return { ...i, quantity: newQ };
      }
      return i;
    }));
  };

  const clearCart = () => setCart([]);
  const addOrder = (order: Order) => setOrders((prev) => [order, ...prev]);
  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
  };
  const removeOrder = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };
  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
  };
  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };
  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter(p => p.id !== id));
  };

  return (
    <ShopContext.Provider value={{
      products, setProducts, cart, addToCart, removeFromCart, updateQuantity, clearCart, 
      orders, addOrder, updateOrderStatus, removeOrder, addProduct, updateProduct, removeProduct,
      isAdmin, setIsAdmin, userEmail, setUserEmail
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within ShopProvider');
  return context;
};
