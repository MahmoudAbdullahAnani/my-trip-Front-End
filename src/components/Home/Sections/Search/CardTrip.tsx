import { EGP } from "../../../../Formater/FormatPrice";
import { FlightOffer } from "../../../../interface/MainData";
// Date
import { differenceInDays } from "date-fns";
import Ticket from "./Ticket";

function CardTrip({ itineraries, price, travelerPricings }: FlightOffer) {
  // Handle Data
  // const durationH = itineraries[0].duration.split("PT")[1].split("H")[0];
  // const durationM = itineraries[0].duration
  //   .split("PT")[1]
  //   .split("H")[1]
  //   .split("M")[0];

  const totalPrice = price.total;
  const cabin = travelerPricings[0].fareDetailsBySegment[0].cabin;
  const degree =
    cabin === "ECONOMY"
      ? "الاقتصادية"
      : cabin === "BUSINESS"
      ? "رجال الاعمال"
      : cabin === "PREMIUM"
      ? "الاقتصادية الممتازة"
      : cabin;
  // تاريخ الذهاب
  const departureDate = itineraries[0].segments[0].departure.at;

  // تاريخ العودة
  const returnDate = itineraries[0].segments[1].arrival.at;

  const daysDifference = differenceInDays(
    new Date(returnDate.slice(0, 10)),
    new Date(departureDate.slice(0, 10))
  );

  // بيانات الطائرة و الرحلة

  // كود الذهاب
  const outboundFlight = itineraries[0];
  const outboundSegments = outboundFlight.segments;
  // console.log(outboundSegments);

  // // بيانات الطائرة في الذهاب
  const outboundAircraft = outboundSegments.map((segment) => ({
    carrierCode: segment.carrierCode,
    flightNumber: segment.number,
    aircraftCode: segment.aircraft.code,
  }));
  console.log(outboundAircraft);

  // // كود العودة
  // const returnFlight = itineraries[1];
  // const returnSegments = returnFlight.segments;

  // // بيانات الطائرة في العودة
  // const returnAircraft = returnSegments.map((segment) => ({
  //   carrierCode: segment.carrierCode,
  //   flightNumber: segment.number,
  //   aircraftCode: segment.aircraft.code,
  // }));

  // // طباعة بيانات الطائرة
  // console.log("بيانات الطائرة في الذهاب:", outboundAircraft);
  // console.log("بيانات الطائرة في العودة:", returnAircraft);
  return (
    <div
      // lg:w-[548px] ll:w-[848px]
      className={`bg-[#FFF] hover:shadow-md shadow-[#D9D9D9]   hidden  rounded-[16px] relative h-[271px] lg:flex`}
    >
      <Ticket
        daysDifference={daysDifference}
        aircraftCode={outboundAircraft[0].aircraftCode}
        carrierCode={outboundAircraft[0].carrierCode}
        flightNumber={outboundAircraft[0].flightNumber}
        price={price.total}
      />

      <div className="w-[200px] ms-auto flex border-2 border-y-0 border-e-0 border-dashed ">
        {/* <hr
          className={`w-[1px] h-full border border-dashed border-slate-400 `}
        /> */}
        <div
          className={`flex flex-col items-center justify-center relative cornerTicket rounded-e-[16px] w-full`}
        >
          <div
            className={`text-[#117C99] text-[16px] font-[700] p-[8px] rounded-[8px] bg-[#B6E7FB] text-center`}
          >
            الدرجة {degree}
          </div>
          <div
            className={`mt-[11px] mb-[8px] text-[#117C99] text-[24px] font-[700]`}
          >
            {EGP.format(+totalPrice)}
          </div>
          <button
            className={`text-[#FFF] text-[20px] w-[154px] h-[48px] font-[700] py-[10px] px-[16px] rounded-[16px] duration-200 bg-[#117C99] hover:bg-[#117c99ba]`}
          >
            <span>اختار الرحلة</span>
          </button>
        </div>
      </div>

      {/* <hr className={``} /> */}
    </div>
  );
}

export default CardTrip;
