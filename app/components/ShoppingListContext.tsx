'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/lib/notion';

interface ShoppingListContextType {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearList: () => void;
  isInList: (productId: string) => boolean;
  getTotalPrice: () => number;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(undefined);

export function ShoppingListProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  // ローカルストレージから読み込み
  useEffect(() => {
    const saved = localStorage.getItem('mosva-shopping-list');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load shopping list:', e);
      }
    }
  }, []);

  // ローカルストレージに保存
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('mosva-shopping-list', JSON.stringify(items));
    } else {
      localStorage.removeItem('mosva-shopping-list');
    }
  }, [items]);

  const addItem = (product: Product) => {
    setItems((prev) => {
      if (prev.find((p) => p.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearList = () => {
    setItems([]);
  };

  const isInList = (productId: string) => {
    return items.some((p) => p.id === productId);
  };

  const getTotalPrice = () => {
    return items.reduce((sum, item) => sum + (item.price || 0), 0);
  };

  return React.createElement(
    ShoppingListContext.Provider,
    { value: { items, addItem, removeItem, clearList, isInList, getTotalPrice } },
    children
  );
}

export function useShoppingList() {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error('useShoppingList must be used within ShoppingListProvider');
  }
  return context;
}
