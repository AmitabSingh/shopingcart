"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { get, post } from "@/app/_utils/api"

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Add item to the cart and send it to the API
    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    }

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter(item => item.id !== id));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};