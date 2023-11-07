import { prismaClient } from "@/lib/prisma";
import { Product } from "@prisma/client";
import React from "react";
import ProductsImage from "./components/productsImage";
import ProductDetails from "./components/productDetails";
import { computeProductTotalPrice } from "@/helpers/product";

interface ProductDetailsProps {
  params: {
    slug: string;
  };
}

const ProductsDetailsPage = async ({ params }: ProductDetailsProps) => {
  const product: Product | null = await prismaClient.product.findFirst({
    where: {
      slug: params.slug,
    },
  });

  if (!product) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8">
      <ProductsImage imageUrls={product.imageUrls} name={product.name} />
      <ProductDetails product={computeProductTotalPrice(product)} />
    </div>
  );
};

export default ProductsDetailsPage;
