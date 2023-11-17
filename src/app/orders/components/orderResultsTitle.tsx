interface OrderResultsTitleProps {
  title: string;
  value: number | string;
  bold?: boolean;
}

const OrderResultsTitle = ({
  title,
  value,
  bold = false,
}: OrderResultsTitleProps) => {
  return (
    <div
      className={`flex w-full justify-between py-3 text-xs ${
        bold === true && "text-sm font-bold"
      }`}
    >
      <p>{title}</p>
      <p>{value}</p>
    </div>
  );
};

export default OrderResultsTitle;
