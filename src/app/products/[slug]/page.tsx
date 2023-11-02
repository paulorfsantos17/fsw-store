import { prismaClient } from "@/lib/prisma";
import { Product } from "@prisma/client";
import React from "react";
import ProductsImage from "./components/productsImage";

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
    <div>
      <ProductsImage imageUrls={product.imageUrls} name={product.name} />
    </div>
  );
};

export default ProductsDetailsPage;
