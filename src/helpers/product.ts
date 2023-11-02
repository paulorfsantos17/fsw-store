import { Product } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

 export interface ProductWithTotalPrice  extends Product {
  totalPrice: number;
}

export const computeProductTotalPrice = (product: Product): ProductWithTotalPrice => {
  if (product.discountPercentage === 0) {
    return {
      ...product,
      totalPrice: Number(product.basePrice),
    }
  }

  const totalPrice = Number(product.basePrice) * (product.discountPercentage / 100)
  return {
    ...product,
    totalPrice: Number(product.basePrice)  - totalPrice
  }
}