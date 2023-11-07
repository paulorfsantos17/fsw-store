import { ReactNode } from "react";
import { Badge } from "./badge";

interface IBadgeTitleProps {
  title: string;
  icon: ReactNode;
}
const BadgeTitle = ({ icon, title }: IBadgeTitleProps) => {
  return (
    <Badge
      variant="outline"
      className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
    >
      {icon}
      {title}
    </Badge>
  );
};

export default BadgeTitle;
