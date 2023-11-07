import { Badge } from "@/components/ui/badge";
import { prismaClient } from "@/lib/prisma";
import { ShapesIcon } from "lucide-react";
import React from "react";
import CategoryItem from "./components/categoryItem";
import BadgeTitle from "@/components/ui/BadgeTitle";

const CatalogPage = async () => {
  const categories = await prismaClient.category.findMany({});
  return (
    <div className="flex flex-col  gap-8 p-5">
      <BadgeTitle icon={<ShapesIcon size={16} />} title="Catálogo" />

      <div className="grid grid-cols-2 gap-8">
        {categories.map((category) => (
          <CategoryItem category={category} key={category.id} />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
