import { ComponentProps } from "react";

const SectionTitle = ({ children }: ComponentProps<"p">) => {
  return <p className="mb-2 pl-5 font-bold uppercase">{children}</p>;
};

export default SectionTitle;
