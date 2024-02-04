interface InterfaceData {
  departureIataCode: string;
  title?: string;
  date?: string;
  iconHomeAntra: JSX.Element;
  airPort?: string;
  terminal?: string;
}
function DetailsTicket({
  departureIataCode,
  title = "المغادرة",
  date = "الاحد 16 فبراير 2024",
  iconHomeAntra,
  airPort = "القاهرة الدولي",
  terminal,
}: InterfaceData) {
  return (
    <div className={``}>
      <h4 className={`text-[20px] font-medium text-[#231F20]`}>{title}</h4>
      <h4 className={`text-[24px] font-bold text-[#141414]`}>
        {departureIataCode}
      </h4>
      <h4 className={`text-[20px] font-bold text-[#141414]`}>{date}</h4>
      <h4 className={`text-[15px] font-semibold text-[#231F20]`}>{airPort}</h4>
      <div
        className={`w-[96px] h-[40px] ms-auto mt-[19px] rounded-[8px] bg-[#B6E7FB] text-[#117C99] text-[15px] gap-[8px] font-bold flex justify-center items-center`}
      >
        <span>صالة {terminal}</span>
        <span>{iconHomeAntra}</span>
      </div>
    </div>
  );
}

export default DetailsTicket;
