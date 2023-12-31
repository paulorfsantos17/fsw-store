import { ShoppingCartIcon } from "lucide-react";
import BadgeTitle from "./BadgeTitle";
import { CartContext } from "@/providers/cart";
import { useContext } from "react";
import CartItem from "./cartItem";
import { Separator } from "./separator";
import { Button } from "./button";
import { ScrollArea } from "./scroll-area";
import { createCheckout } from "@/actions/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { createOrder } from "@/actions/order";
import { useSession } from "next-auth/react";

const Cart = () => {
  const { data } = useSession();
  const { products, subTotal, total, totalDiscount } = useContext(CartContext);

  const handleFinishPurchaseClick = async () => {
    if (!data) {
      return;
    }
    const order = await createOrder(products, (data.user as any).id);

    const checkout = await createCheckout(products, order.id);

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    });
  };

  return (
    <div className="flex h-full w-full  flex-col gap-8 overflow-hidden">
      <BadgeTitle icon={<ShoppingCartIcon size={16} />} title="Carrinho" />
      <ScrollArea className="h-full">
        <div className="flex h-[70%] flex-col gap-5">
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
      </ScrollArea>

      <div className="flex w-full flex-col gap-3 ">
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
        <Button className="uppercase" onClick={handleFinishPurchaseClick}>
          Finalizar Compra
        </Button>
      </div>
    </div>
  );
};

export default Cart;
