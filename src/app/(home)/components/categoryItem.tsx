"use client";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_ICONS } from "@/constants/category-icons";
import { Category } from "@prisma/client";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link href={`/category/${category.slug}`}>
      <Badge
        variant="outline"
        className="flex justify-center gap-2 rounded-lg py-3"
      >
        {CATEGORY_ICONS[category.slug as keyof typeof CATEGORY_ICONS]}
        <span className="text-bold text-xs">{category.name}</span>
      </Badge>
    </Link>
  );
};

export default CategoryItem;
