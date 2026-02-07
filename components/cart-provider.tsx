'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    category: string;
    customization?: {
        color?: string;
        fabric?: string;
        monogram?: string;
    };
}

interface CartContextType {
    items: CartItem[];
    addItem: (product: any, quantity?: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    itemCount: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('lui-michy-cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart', e);
            }
        }
    }, []);

    // Sync cart to localStorage on change
    useEffect(() => {
        localStorage.setItem('lui-michy-cart', JSON.stringify(items));
    }, [items]);

    const addItem = (product: any, quantity: number = 1) => {
        setItems((prev) => {
            const prodId = product.productId || product.id;
            const existing = prev.find((item) => item.productId === prodId);

            // For bespoke items, we always want a new entry if customizations differ
            // For simplicity, if it's bespoke, we just add it as a new item every time
            if (product.category === 'Bespoke' || product.customization) {
                return [
                    ...prev,
                    {
                        id: `${prodId}-${Date.now()}`,
                        productId: prodId,
                        name: product.name,
                        price: product.price,
                        image: product.image || (product.images && product.images[0]),
                        quantity: product.quantity || quantity,
                        category: product.category,
                        customization: product.customization
                    },
                ];
            }

            if (existing) {
                return prev.map((item) =>
                    item.productId === prodId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [
                ...prev,
                {
                    id: `${prodId}-${Date.now()}`,
                    productId: prodId,
                    name: product.name,
                    price: product.price,
                    image: product.image || (product.images && product.images[0]),
                    quantity,
                    category: product.category,
                },
            ];
        });
    };

    const removeItem = (productId: string) => {
        setItems((prev) => prev.filter((item) => item.productId !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(productId);
            return;
        }
        setItems((prev) =>
            prev.map((item) =>
                item.productId === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => setItems([]);

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                itemCount,
                totalPrice,
            }}
        >
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
