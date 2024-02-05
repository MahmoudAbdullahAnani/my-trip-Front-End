import { normalNumber } from "../../../../Formater/FormatPrice";

function DetailsBill({
  title,
  content,
}: {
  title: string;
  content: { price: string };
}) {
  const handlePrice = normalNumber.format(Math.floor(+content.price));

  return (
    <div className={`flex gap-2 justify-between`}>
      <div className={`text-[#117C99] font-bold`} dir="rtl">
        <span className={`text-[24px]`}>{Math.floor(+handlePrice)}</span>
        <span>.{Math.round(+content.price - Math.floor(+content.price))}</span>
        <span>جنية مصري </span>
      </div>
      <h2 className={`text-[#000] font-bold text-[20px]`}>{title}</h2>
    </div>
  );
}

export default DetailsBill;
