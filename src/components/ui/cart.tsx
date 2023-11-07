import { Heading1, ShoppingCartIcon } from "lucide-react";
import BadgeTitle from "./BadgeTitle";
import { CartContext } from "@/providers/cart";
import { useContext } from "react";

const Cart = () => {
  const { products } = useContext(CartContext);

  return (
    <div>
      <BadgeTitle icon={<ShoppingCartIcon size={16} />} title="Carrinho" />

      {products.map((product) => (
        <h1 key={product.id}>{product.name} </h1>
      ))}
    </div>
  );
};

export default Cart;
