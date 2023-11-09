import { Heading1, ShoppingCartIcon } from "lucide-react";
import BadgeTitle from "./BadgeTitle";
import { CartContext } from "@/providers/cart";
import { useContext } from "react";
import CartItem from "./cartItem";

const Cart = () => {
  const { products } = useContext(CartContext);

  return (
    <div className="w=full flex flex-col gap-8">
      <BadgeTitle icon={<ShoppingCartIcon size={16} />} title="Carrinho" />

      <div className="flex flex-col gap-5">
        {products.map((product, indice) => (
          <CartItem product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
