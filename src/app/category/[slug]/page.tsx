import ProductItem from "@/components/ui/productItem";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_ICONS } from "@/constants/category-icons";
import { computeProductTotalPrice } from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";
import { Category, Product } from "@prisma/client";

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
      <Badge
        variant="outline"
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
      >
        {CATEGORY_ICONS[params.slug as keyof typeof CATEGORY_ICONS]}
        {category?.name}
      </Badge>

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
