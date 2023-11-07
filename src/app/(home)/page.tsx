import Image from "next/image";
import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "@/components/ui/productList";
import SectionTitle from "./components/sectionTitle";
import PromoBanner from "./components/promoBanner";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });
  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });

  const phones = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "headphones",
      },
    },
  });

  return (
    <div className=" flex flex-col gap-8 py-8">
      <PromoBanner src="/banner-.01.png" alt="até 55% de desconto este mês" />

      <div className=" px-5">
        <Categories />
      </div>
      <div>
        <SectionTitle>Ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>

      <PromoBanner src="/banner-02.png" alt="até 55% de desconto em Mouses" />

      <div>
        <SectionTitle>Teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>

      <PromoBanner src="/banner-03.png" alt="até 55% de desconto em Phones" />

      <div>
        <SectionTitle>Fones</SectionTitle>
        <ProductList products={phones} />
      </div>
    </div>
  );
}
