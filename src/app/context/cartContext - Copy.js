"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { get, post } from "@/app/_utils/api"

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Fetch the cart from the API on initial load
    useEffect(() => {
        const fetchCart = async () => {
            const res = await post('/carts'); // Replace with your cart API URL
            setCart(res);
        }
        fetchCart();
    }, []);

    // Add item to the cart and send it to the API
    const addToCart = async (product) => {
        const result = await post('/carts', { data: product }); // Replace with your actual endpoint
        setCart(result);
    }

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
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