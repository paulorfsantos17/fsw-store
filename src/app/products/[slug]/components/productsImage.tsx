"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
  name: string;
  imageUrls: string[];
}

const ProductsImage = ({ imageUrls, name }: ProductImageProps) => {
  const [currentImage, setCurrentImage] = useState(imageUrls[0]);
  const handleImageClick = (imageUrl: string) => {
    setCurrentImage(imageUrl);
  };
  return (
    <div className="flex flex-col gap-4 rounded-t-xl">
      <div className="flex h-[380px] w-full  items-center justify-center bg-accent ">
        <Image
          src={currentImage}
          alt={name}
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%]"
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="flex justify-center gap-3 p-4">
        {imageUrls.map((imageUrl) => (
          <button
            key={imageUrl}
            className={`flex h-[100px] flex-1 items-center justify-center rounded-lg bg-accent
                      ${
                        currentImage === imageUrl &&
                        "border-2 border-solid border-primary"
                      }`}
            onClick={(e) => handleImageClick(imageUrl)}
          >
            <Image
              src={imageUrl}
              alt={name}
              height={0}
              width={0}
              sizes="100vw"
              className="h-auto max-h-[70%] w-auto max-w-[80%] "
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductsImage;
