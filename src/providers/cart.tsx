"use client";

import { Product } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";
interface CartProduct extends Product {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartTotalPrice: number;
  cardTotalDiscount: number;
  cartBasePrice: number;
  addProductToCart: (product: CartProduct) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cardTotalDiscount: 0,
  cartTotalPrice: 0,
  cartBasePrice: 0,
  addProductToCart: () => {},
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const addProductToCart = (product: CartProduct) => {
    setProducts((prev) => [...prev, product]);
  };
  return (
    <CartContext.Provider
      value={{
        products: products,
        cardTotalDiscount: 0,
        cartTotalPrice: 0,
        cartBasePrice: 0,
        addProductToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
