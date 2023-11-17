import { computeProductTotalPrice } from "@/helpers/product";
import { OrderProduct, Prisma } from "@prisma/client";
import Image from "next/image";

interface OrderProductsItemProps {
  orderProducts: Prisma.OrderProductGetPayload<{
    include: {
      product: true;
    };
  }>;
}

const OrderProductItem = ({ orderProducts }: OrderProductsItemProps) => {
  const product = computeProductTotalPrice(orderProducts.product);
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-accent">
        <Image
          src={orderProducts.product.imageUrls[0]}
          alt={orderProducts.product.name}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto min-h-[80%] min-w-[80%] object-contain"
        />
      </div>
      <div className="flex w-full flex-col gap-1">
        <div className="flex w-fit rounded-md bg-accent px-3 py-1">
          <p className="text-[10px]">
            Vendido e entregue por <span className="font-bold">FSW store</span>
          </p>
        </div>
        <p className="text-xs">{orderProducts.product.name}</p>
        <div className="flex w-full items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            <p className="text-sm font-bold">
              R$ {product.totalPrice.toFixed(2)}
            </p>
            {product.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-60">
                R$ {Number(product.basePrice.toFixed(2))}
              </p>
            )}
          </div>

          <p>Qntd: {orderProducts.quantity}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderProductItem;
