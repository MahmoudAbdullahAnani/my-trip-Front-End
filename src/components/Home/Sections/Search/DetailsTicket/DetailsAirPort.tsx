interface InterfaceData {
  airPortImage: string;
  travelCode: string;
  airBusCode: string;
  degree: string;
}

function DetailsAirPort({
  airPortImage,
  travelCode,
  airBusCode,
  degree,
}: InterfaceData) {

  return (
    <div dir="rtl" className={`flex flex-col w-[144px] gap-[19px]`}>
      <div className={`flex flex-col gap-[8px]`}>
        <img src={airPortImage} alt={`${airBusCode}-Logo`} />
        <div className={`flex justify-between gap-[21px]`}>
          <span
            className={`text-[#4F4F4F] whitespace-nowrap text-[13px] font-[700]`}
          >
            {travelCode}
          </span>
          <span
            className={`text-[#4F4F4F] whitespace-nowrap text-[13px] font-[700]`}
          >
            {airBusCode}
          </span>
        </div>
      </div>
      <div
        className={`text-[#117C99] text-[16px] font-[700] p-[8px] rounded-[8px] bg-[#B6E7FB] text-center`}
      >
        الدرجة {degree}
      </div>
    </div>
  );
}

export default DetailsAirPort;
