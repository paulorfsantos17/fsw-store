import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import OrderProductItem from "./orderProductsItem";
import { Separator } from "@/components/ui/separator";
import OrderResultsTitle from "./orderResultsTitle";
import { useMemo } from "react";
import {
  computeSubtotalProductsToCart,
  computeTotalProductsToCart,
  computeTotalProductsToOrderProducts,
} from "@/helpers/product";
import { getOrderStatus } from "../helpers/status";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const OrderItem = ({ order }: OrderItemProps) => {
  const subTotal = useMemo(() => {
    return computeSubtotalProductsToCart(order.orderProducts);
  }, [order.orderProducts]);

  const total: number = useMemo(() => {
    return computeTotalProductsToOrderProducts(order.orderProducts);
  }, [order.orderProducts]);

  const totalDiscount = subTotal - total;
  return (
    <Card className="px-5">
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value={order.id}>
          <AccordionTrigger>
            <div className="flex flex-col gap-1 text-left">
              <p className="font-bold uppercase">
                Pedido com {order.orderProducts.length} produto(s)
              </p>
              <span className="text-sm opacity-60">
                Feito em {format(order.createAt, "d/MM/y 'às' HH:mm")}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <div className="font-bold">
                  <p className="uppercase">Status</p>
                  <p className="text-[#8162FF]">
                    {" "}
                    {getOrderStatus(order.status)}
                  </p>
                </div>
                <div>
                  <p className="font-bold uppercase">Data</p>
                  <p className="opacity-60">
                    {format(order.createAt, "d/MM/y")}
                  </p>
                </div>
                <div>
                  <p className="font-bold uppercase">Pagamento</p>
                  <p className="opacity-60">Cartão</p>
                </div>
              </div>
              {order.orderProducts.map((orderProduct) => (
                <OrderProductItem
                  orderProducts={orderProduct}
                  key={orderProduct.id}
                />
              ))}

              <div className="flex flex-col gap-1">
                <Separator />
                <OrderResultsTitle
                  title="Subtotal"
                  value={`R$ ${subTotal.toFixed(2)}`}
                />
                <Separator />
                <OrderResultsTitle title="Entrega" value="GRÁTIS" />
                <Separator />
                <OrderResultsTitle
                  title="Descontos"
                  value={`-R$ ${totalDiscount.toFixed(2)}`}
                />
                <Separator />
                <OrderResultsTitle
                  title="Total"
                  value={`R$ ${total.toFixed(2)}`}
                  bold={true}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default OrderItem;
