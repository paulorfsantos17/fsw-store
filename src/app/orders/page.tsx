import BadgeTitle from "@/components/ui/BadgeTitle";
import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { PackageSearchIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import OrderItem from "./components/orderItem";

const PageOrders = async () => {
  const user = getServerSession(authOptions);
  const orders = await prismaClient.order.findMany({
    where: {
      userId: (user as any).id,
    },
    include: {
      orderProducts: true,
    },
  });
  if (!user) {
    return <p>Access Denied</p>;
  }
  return (
    <div className="p-5">
      <BadgeTitle icon={<PackageSearchIcon size={16} />} title="Meus Pedidos" />
      <div className="mt-5 flex flex-col gap-5">
        {orders.map((order) => (
          <OrderItem order={order} key={order.id} />
        ))}
      </div>
    </div>
  );
};

export default PageOrders;
