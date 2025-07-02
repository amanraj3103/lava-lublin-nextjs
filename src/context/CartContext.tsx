import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import type { CartItem } from '../types/Cart';

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: 'ADD_ITEM'; item: CartItem }
  | { type: 'REMOVE_ITEM'; id: string | number }
  | { type: 'UPDATE_QUANTITY'; id: string | number; quantity: number }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
} | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.item.id);
      if (existing) {
        return {
          items: state.items.map(i =>
            i.id === action.item.id ? { ...i, quantity: i.quantity + action.item.quantity } : i
          ),
        };
      }
      return { items: [...state.items, action.item] };
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter(i => i.id !== action.id) };
    case 'UPDATE_QUANTITY':
      return {
        items: state.items.map(i =>
          i.id === action.id ? { ...i, quantity: action.quantity } : i
        ).filter(i => i.quantity > 0),
      };
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const addItem = (item: CartItem) => dispatch({ type: 'ADD_ITEM', item: { ...item, category: item.category ?? undefined, color: item.color ?? undefined } });
  const removeItem = (id: string | number) => dispatch({ type: 'REMOVE_ITEM', id });
  const updateQuantity = (id: string | number, quantity: number) => dispatch({ type: 'UPDATE_QUANTITY', id, quantity });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ items: state.items, addItem, removeItem, updateQuantity, clearCart, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
} 