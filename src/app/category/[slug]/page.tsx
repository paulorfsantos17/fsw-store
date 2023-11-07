import ProductItem from "@/components/ui/productItem";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_ICONS } from "@/constants/category-icons";
import { computeProductTotalPrice } from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";
import { Category, Product } from "@prisma/client";
import BadgeTitle from "@/components/ui/BadgeTitle";

interface CategoryProductsProps {
  params: {
    slug: string;
  };
}

interface ProductsListByCategory extends Category {
  products: Product[];
}

const CategoryProductsPage = async ({ params }: CategoryProductsProps) => {
  const category: ProductsListByCategory | null =
    await prismaClient.category.findFirst({
      where: {
        slug: params.slug,
      },
      include: {
        products: true,
      },
    });

  if (!category) {
    return null;
  }

  return (
    <div className="flex flex-col  gap-8 p-5">
      <BadgeTitle
        icon={CATEGORY_ICONS[params.slug as keyof typeof CATEGORY_ICONS]}
        title={category?.name}
      />

      <div className="grid grid-cols-2 gap-8">
        {category?.products.map((product) => (
          <ProductItem
            product={computeProductTotalPrice(product)}
            key={product.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryProductsPage;
