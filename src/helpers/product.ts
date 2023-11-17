import { CartProduct } from "@/providers/cart";
import { OrderProduct, Product } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export interface ProductWithTotalPrice extends Product {
  totalPrice: number;
}

export const computeProductTotalPrice = (product: Product | OrderProduct) => {
  if (product.discountPercentage === 0) {
    return {
      ...product,
      totalPrice: Number(product.basePrice),
    }
  }

  const totalPrice = Number(product.basePrice) * (product.discountPercentage / 100)
  return {
    ...product,
    totalPrice: Number(product.basePrice) - totalPrice
  }
}

export const computeTotalProductsToCart = (products: CartProduct[]): number => {
  return products.reduce(
    (acc, product) => acc + Number(product.totalPrice) * product.quantity,
    0,
  );

}


export const computeTotalProductsToOrderProducts = (products: OrderProduct[]): number => {

  return products.reduce(
    (acc, product) => {
      const productWithTotalPrice = computeProductTotalPrice(product)
      return acc + Number(productWithTotalPrice.totalPrice) * product.quantity
    },0
  );
}
  



export const computeSubtotalProductsToCart = (products: CartProduct[] | OrderProduct[]): number => {
  return products.reduce(
    (acc, product) => acc + Number(product.basePrice) * product.quantity,
    0,
  );
}