'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { CartEntry } from '@/lib/types';

interface CartContextValue {
  items: CartEntry[];
  addItem: (item: Omit<CartEntry, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateNote: (id: string, note: string) => void;
  clearCart: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'salted_cart';

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const addItem = useCallback((item: Omit<CartEntry, 'id'>) => {
    setItems((prev) => {
      const existing = prev.find(
        (e) => e.menuItemId === item.menuItemId && e.variantId === item.variantId
      );
      if (existing) {
        return prev.map((e) =>
          e.id === existing.id ? { ...e, quantity: e.quantity + item.quantity } : e
        );
      }
      return [...prev, { ...item, id: generateId() }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((e) => e.id !== id));
    } else {
      setItems((prev) => prev.map((e) => (e.id === id ? { ...e, quantity } : e)));
    }
  }, []);

  const updateNote = useCallback((id: string, note: string) => {
    setItems((prev) => prev.map((e) => (e.id === id ? { ...e, note } : e)));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce((sum, e) => sum + e.unitPrice * e.quantity, 0);
  const count = items.reduce((sum, e) => sum + e.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, updateNote, clearCart, total, count }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
