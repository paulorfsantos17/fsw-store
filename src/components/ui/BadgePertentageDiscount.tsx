import { Badge } from "@/components/ui/badge";
import { ArrowDownIcon } from "lucide-react";

interface BadgePertentageDiscountProps {
  discountPercentage: number;
  classNames: string;
}

const BadgePertentageDiscount = ({
  discountPercentage,
  classNames,
}: BadgePertentageDiscountProps) => {
  return (
    <Badge className={classNames}>
      <ArrowDownIcon size={16} />
      {discountPercentage}%
    </Badge>
  );
};

export default BadgePertentageDiscount;
