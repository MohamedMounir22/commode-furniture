"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // تحميل السلة من الـ LocalStorage أول ما الصفحة تفتح
  useEffect(() => {
    // بيجيب المنتجات المتخزنه في اللوكال استوردج
    const savedCart = localStorage.getItem("commode-cart");

    // لو في منتجات متخزنه
    if (savedCart) {
      // بيحولها من جسون ل اوبجكت ويحدث قمية الكارد
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // بيتنفذ كل ما حالة الكارد تتغير اضافة منتج او ازالة منتج
  useEffect(() => {
    localStorage.setItem("commode-cart", JSON.stringify(cart));
  }, [cart]);

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
