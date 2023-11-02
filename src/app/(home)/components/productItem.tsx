import { Badge } from "@/components/ui/badge";
import { ProductWithTotalPrice } from "@/helpers/product";

import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";

interface ProductItemProps {
  product: ProductWithTotalPrice;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="flex max-w-[156px] flex-col gap-4">
      <div className="relative flex  h-[170px] w-[156px] items-center justify-center rounded-lg bg-accent">
        <Image
          src={product.imageUrls[0]}
          height={0}
          width={0}
          sizes="100vw"
          alt={product.name}
          className="h-[90px] w-auto"
          style={{ objectFit: "contain" }}
        />
        {product.discountPercentage > 0 && (
          <Badge className="absolute left-3 top-3 flex gap-[3px] px-2 py-[2px]">
            <ArrowDownIcon size={16} />
            {product.discountPercentage}%
          </Badge>
        )}
      </div>
      <div>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
          {product.name}
        </p>
        <div className="flex flex items-center gap-2">
          {product.discountPercentage > 0 && (
            <>
              <p className="font-semibold">R${product.totalPrice.toFixed(2)}</p>
              <p className="text-xs line-through opacity-75">
                R${Number(product.basePrice.toFixed(2))}
              </p>
            </>
          )}

          {product.discountPercentage === 0 && (
            <p className="text-xs line-through opacity-75">
              R${Number(product.basePrice.toFixed(2))}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
