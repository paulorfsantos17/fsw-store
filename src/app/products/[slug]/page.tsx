import { prismaClient } from "@/lib/prisma";
import { Product, Category } from "@prisma/client";
import React from "react";
import ProductsImage from "./components/productsImage";
import ProductDetails from "./components/productDetails";
import { computeProductTotalPrice } from "@/helpers/product";
import ProductList from "@/components/ui/productList";
import Loading from "@/components/ui/loading";

interface ProductDetailsProps {
  params: {
    slug: string;
  };
}
interface CategoryAddProduct extends Category {
  products: Product[];
}

interface ProductDetailsPrismaQuery extends Product {
  category: CategoryAddProduct;
}

const ProductsDetailsPage = async ({ params }: ProductDetailsProps) => {
  const product: ProductDetailsPrismaQuery | null =
    await prismaClient.product.findFirst({
      where: {
        slug: params.slug,
      },
      include: {
        category: {
          include: {
            products: {
              where: {
                slug: {
                  not: params.slug,
                },
              },
            },
          },
        },
      },
    });

  if (!product) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-8 pb-8">
      <ProductsImage imageUrls={product.imageUrls} name={product.name} />
      <ProductDetails product={computeProductTotalPrice(product)} />
      <div className="flex flex-col gap-2">
        <p className="mx-5 text-xl font-bold uppercase">
          Produtos Recomendados
        </p>
        <ProductList products={product.category.products} />
      </div>
    </div>
  );
};

export default ProductsDetailsPage;
