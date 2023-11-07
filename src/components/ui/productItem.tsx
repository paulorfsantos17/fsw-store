import { ProductWithTotalPrice } from "@/helpers/product";

import Image from "next/image";
import Link from "next/link";
import BadgePertentageDiscount from "./BadgePertentageDiscount";

interface ProductItemProps {
  product: ProductWithTotalPrice;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="flex   flex-col gap-4">
        <div className="relative flex h-[170px] w-full items-center justify-center rounded-lg bg-accent">
          <Image
            src={product.imageUrls[0]}
            height={0}
            width={0}
            sizes="100vw"
            alt={product.name}
            className="h- max-h-[70%] w-auto max-w-[80%]"
            style={{ objectFit: "contain" }}
          />
          {product.discountPercentage > 0 && (
            <BadgePertentageDiscount
              classNames="absolute left-3 top-3 flex gap-[3px] px-2 py-[2px]"
              discountPercentage={product.discountPercentage}
            />
          )}
        </div>
        <div>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {product.name}
          </p>
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            {product.discountPercentage > 0 && (
              <>
                <p className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                  R${product.totalPrice.toFixed(2)}
                </p>
                <p className="text-xs line-through opacity-75">
                  R${Number(product.basePrice.toFixed(2))}
                </p>
              </>
            )}

            {product.discountPercentage === 0 && (
              <p className="font-semibold">
                R${Number(product.basePrice.toFixed(2))}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
