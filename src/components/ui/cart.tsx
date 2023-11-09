import { Heading1, ShoppingCartIcon } from "lucide-react";
import BadgeTitle from "./BadgeTitle";
import { CartContext } from "@/providers/cart";
import { useContext } from "react";
import CartItem from "./cartItem";
import { Separator } from "./separator";

const Cart = () => {
  const { products, subTotal, total, totalDiscount } = useContext(CartContext);

  return (
    <div className="w=full flex flex-col gap-8">
      <BadgeTitle icon={<ShoppingCartIcon size={16} />} title="Carrinho" />

      <div className="flex flex-col gap-5">
        {products.length > 0 ? (
          products.map((product) => (
            <CartItem product={product} key={product.id} />
          ))
        ) : (
          <p className="text-center font-bold">
            Carrinho vazio. <br /> Vamos fazer compras?
          </p>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <Separator />
        <div className="flex items-center justify-between">
          <p className="text-xs font-normal opacity-75">Subtotal</p>
          <p className="text-xs font-normal opacity-75">
            R$ {subTotal.toFixed(2)}
          </p>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <p className="text-xs font-normal opacity-75">Entrega</p>
          <p className="text-xs font-normal opacity-75">GRÁTIS</p>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <p className="text-xs font-normal opacity-75">Descontos</p>
          <p className="text-xs font-normal opacity-75">
            - R$ {totalDiscount.toFixed(2)}
          </p>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold ">Total</p>
          <p className="text-sm font-bold">R$ {total.toFixed(2)}</p>
        </div>
        <Separator />
      </div>
    </div>
  );
};

export default Cart;
