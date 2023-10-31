"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Categories from "./components/categories";

export default function Home() {
  return (
    <div className="p-5">
      <Image
        src="/banner-.01.png"
        alt="até 55% de desconto este mês"
        height={0}
        width={0}
        className="h-auto w-full"
        sizes="100vw"
      ></Image>

      <div className="mt-8">
        <Categories />
      </div>
    </div>
  );
}
