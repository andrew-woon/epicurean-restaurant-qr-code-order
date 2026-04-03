import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Dish } from './types';

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  timestamp: Date;
  status: 'Pending' | 'Preparing' | 'Served';
}

interface CartContextType {
  cart: CartItem[];
  orders: Order[];
  addToCart: (dish: Dish, quantity: number, customizations?: string[], specialInstructions?: string) => void;
  removeFromCart: (dishId: string) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  placeOrder: () => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (dish: Dish, quantity: number, customizations?: string[], specialInstructions?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === dish.id);
      if (existing) {
        return prev.map(item => 
          item.id === dish.id 
            ? { ...item, quantity: item.quantity + quantity, customizations, specialInstructions } 
            : item
        );
      }
      return [...prev, { ...dish, quantity, customizations, specialInstructions }];
    });
  };

  const removeFromCart = (dishId: string) => {
    setCart(prev => prev.filter(item => item.id !== dishId));
  };

  const updateQuantity = (dishId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(dishId);
      return;
    }
    setCart(prev => prev.map(item => item.id === dishId ? { ...item, quantity } : item));
  };

  const placeOrder = () => {
    if (cart.length === 0) return;
    
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const serviceFee = subtotal * 0.15;
    const gst = subtotal * 0.05;
    const total = subtotal + serviceFee + gst;

    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      items: [...cart],
      total,
      timestamp: new Date(),
      status: 'Pending'
    };

    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, orders, addToCart, removeFromCart, updateQuantity, placeOrder, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
