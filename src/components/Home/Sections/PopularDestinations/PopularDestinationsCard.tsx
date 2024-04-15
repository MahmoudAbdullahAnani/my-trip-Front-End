interface DataInterface {
  id: number;
  img: string;
  titleAR: string;
  titleEN: string;
}
function PopularDestinationsCard({ img, titleAR, titleEN }: DataInterface) {
  return (
    <div className={`h-full`}>
      <img
        className={`h-full object-fill`}
        src={img}
        alt="ajwaa"

        // width={100}
        // height={100}
      />
      <div
        className={`text-[32px] font-[700] text-[#FFF] flex flex-col sm:gap-[21px] gap-[1px] items-center justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`}
      >
        <span>{titleAR}</span>
        <span>{titleEN}</span>
      </div>
    </div>
  );
}

export default PopularDestinationsCard;
