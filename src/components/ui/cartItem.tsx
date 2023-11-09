import { CartContext, CartProduct } from "@/providers/cart";
import Image from "next/image";
import { Button } from "./button";
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface ICartItemProps {
  product: CartProduct;
}

const CartItem = ({ product }: ICartItemProps) => {
  const { decreaseProductQuantity } = useContext(CartContext);
  const handleDecreaseProductQuantity = () => {
    decreaseProductQuantity(product.id);
  };
  return (
    <div className=" flex items-center justify-between">
      <div className=" flex w-[70%] items-center gap-2">
        <div className="flex h-auto min-h-[77px] w-auto min-w-[77px] items-center justify-center rounded-lg bg-accent p-2">
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            sizes="100vw"
            width={0}
            height={0}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="flex flex-col">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs">
            {product.name}
          </p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold ">
              R${product.totalPrice.toFixed(2)}
            </p>
            {product.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-75 ">
                R$ {Number(product.basePrice).toFixed(2)}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={handleDecreaseProductQuantity}
            >
              <ArrowLeftIcon size={16} />
            </Button>
            <p>{product.quantity}</p>
            <Button size="icon" variant="outline" className="h-8 w-8">
              <ArrowRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>

      <Button size="icon" variant="outline">
        <TrashIcon size={16} />
      </Button>
    </div>
  );
};

export default CartItem;
