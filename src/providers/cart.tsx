"use client";

import { ProductWithTotalPrice } from "@/helpers/product";

import { ReactNode, createContext, useMemo, useState } from "react";

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartTotalPrice: number;
  cardTotalDiscount: number;
  cartBasePrice: number;
  total: number;
  subTotal: number;
  totalDiscount: number;
  addProductToCart: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cardTotalDiscount: 0,
  cartTotalPrice: 0,
  cartBasePrice: 0,
  total: 0,
  subTotal: 0,
  totalDiscount: 0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductFromCart: () => {},
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const addProductToCart = (product: CartProduct) => {
    const productIsAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );

    if (productIsAlreadyOnCart) {
      setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            };
          }
          return cartProduct;
        }),
      );
      return;
    }

    setProducts((prev) => [...prev, product]);
  };

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prev) =>
      prev
        .map((cartProduct) => {
          if (cartProduct.id === productId) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity - 1,
            };
          }
          return cartProduct;
        })
        .filter((cartProduct) => cartProduct.quantity > 0),
    );
  };

  const increaseProductQuantity = (productId: string) => {
    setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }
        return cartProduct;
      }),
    );
  };

  const removeProductFromCart = (productId: string) => {
    setProducts((prev) =>
      prev.filter((cartProduct) => cartProduct.id !== productId),
    );
  };

  const subTotal = useMemo(() => {
    return products.reduce(
      (acc, product) => acc + Number(product.basePrice) * product.quantity,
      0,
    );
  }, [products]);

  const total = useMemo(() => {
    return products.reduce(
      (acc, product) => acc + Number(product.totalPrice) * product.quantity,
      0,
    );
  }, [products]);

  const totalDiscount = subTotal - total;

  return (
    <CartContext.Provider
      value={{
        products: products,
        cardTotalDiscount: 0,
        cartTotalPrice: 0,
        cartBasePrice: 0,
        total,
        subTotal,
        totalDiscount,
        decreaseProductQuantity,
        addProductToCart,
        increaseProductQuantity,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
