'use server'

import { prismaClient } from "@/lib/prisma";
import { CartProduct } from "@/providers/cart";
import { OrderProduct, User } from "@prisma/client";

interface IOrderProductsToCart extends Pick<OrderProduct,
  'basePrice' |
  'discountPercentage' |
  'quantity' |
  'productId'> { }

export const createOrder = async (cartProducts: CartProduct[], userId: string) => {
  const orderProducts: IOrderProductsToCart[] = cartProducts.map((product) => ({
    basePrice: product.basePrice,
    discountPercentage: product.discountPercentage,
    productId: product.id,
    quantity: product.quantity
  }))

  const order = await prismaClient.order.create({
    data: {
      userId: userId,
      status: 'WAITING_FOR_PAYMENT',
      orderProducts: {
        createMany: {
          data: orderProducts
        }

      }
    }
  })

  return order
}