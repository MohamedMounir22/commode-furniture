"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("commode-cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("commode-cart", JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  //  دالة اضافة منتج
  const addToCart = (product) => {
    setCart((prev) => {
      //بشوف المنتج موجود اصلا ولا لا لو موجود بزود عليه 1
      const existingItem = prev.find((item) => item._id === product._id);
      if (existingItem) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      //   لو مش موجود ودا منتج جديد بضيف المنتج علي المنتجات الموجوده في السله
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ..................................................................................................

  //   دالة ازالة منتج بال اي دي
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item._id !== productId));
  };

  //....................................................................................................

  // دالة زيادة او انقاص عدد منتج موجود في السله وملهاش علاقه بحذف المنتج دا بيحصل بداله تانيه
  const updateQuantity = (productId, amount) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item,
      ),
    );
  };

  //.......................................................................................................

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
