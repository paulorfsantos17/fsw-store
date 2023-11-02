import ProductItem from "@/app/(home)/components/productItem";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_ICONS } from "@/constants/category-icons";
import { computeProductTotalPrice } from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";
import { Product } from "@prisma/client";

const CategoryProductsPage = async ({ params }: any) => {
  const category = await prismaClient.category.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      products: true,
    },
  });

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
