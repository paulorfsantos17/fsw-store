import { prismaClient } from "@/lib/prisma";
import { Product } from "@prisma/client";
import React from "react";

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

  return <div>{product.name}</div>;
};

export default ProductsDetailsPage;
