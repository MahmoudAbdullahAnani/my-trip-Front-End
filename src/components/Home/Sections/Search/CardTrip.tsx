import { FlightOffer } from "../../../../interface/MainData";
// Date
import { differenceInDays } from "date-fns";
import Ticket from "./Ticket";
import { useRecoilState } from "recoil";
import { StoreCurrency } from "../../../../data/Fetching/StoreCurrency";
import CheckOutTicket from "./CardTicketComponents/CheckOutTicket";
import { typeTravel } from "../../../../data/RecoilState/FormHandling";
import TicketOneWay from "./TicketOneWay";
import { useEffect, useState } from "react";

function CardTrip({ itineraries, price, travelerPricings }: FlightOffer) {
  const [storeCurrency] = useRecoilState(StoreCurrency);

  // Handle Data
  // const durationH = itineraries[0].duration.split("PT")[1].split("H")[0];
  // const durationM = itineraries[0].duration
  //   .split("PT")[1]
  //   .split("H")[1]
  //   .split("M")[0];

  // const totalPriceEUR = price.total;
  const totalPriceUSD = +price.total * +storeCurrency.rates.EUR;
  const totalPriceEGP = totalPriceUSD * +storeCurrency.rates.EGP;

  const cabin = travelerPricings[0].fareDetailsBySegment[0].cabin;
  const degree =
    cabin === "ECONOMY"
      ? "الاقتصادية"
      : cabin === "BUSINESS"
      ? "رجال الاعمال"
      : cabin === "PREMIUM_ECONOMY"
      ? "الاقتصادية الممتازة"
      : cabin;
  // تاريخ الذهاب
  const departureDate = itineraries[0].segments[0].departure.at;

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
  // console.log(outboundAircraft);

  const [travelTypeState] = useRecoilState(typeTravel);
  const [dataAirReturn, setDataAirReturn] = useState<
    {
      carrierCode: string;
      flightNumber: string;
      aircraftCode: string;
    }[]
  >([
    {
      carrierCode: "",
      flightNumber: "",
      aircraftCode: "",
    },
  ]);
  // let daysDifference = 0;
  const [daysDifference, setDaysDifference] = useState(0);
  useEffect(() => {
    if (travelTypeState !== "oneWay") {
      // تاريخ العودة
      const returnDate = itineraries[1].segments[0].arrival.at;

      // eslint-disable-next-line react-hooks/exhaustive-deps
      setDaysDifference(
        differenceInDays(
          new Date(returnDate.slice(0, 10)),
          new Date(departureDate.slice(0, 10))
        )
      );
      // console.log(daysDifference);

      const returnFlight = itineraries[1];
      // console.log(returnFlight);

      const returnSegments = returnFlight.segments;
      // // بيانات الطائرة في العودة
      const returnAircraft = returnSegments.map((segment) => ({
        carrierCode: segment.carrierCode,
        flightNumber: segment.number,
        aircraftCode: segment.aircraft.code,
      }));
      setDataAirReturn(returnAircraft);
    }
  }, []);
  // console.log("returnAircraft==> ", dataAirReturn);

  // // كود العودة
  // console.log(dataAirReturn);
  // console.log("travelTypeState==> ", travelTypeState);

  // // طباعة بيانات الطائرة
  // console.log("بيانات الطائرة في الذهاب:", outboundAircraft);
  // console.log("بيانات الطائرة في العودة:", returnAircraft);
  return (
    <div
      // lg:w-[548px] ll:w-[848px]
      className={`bg-[#FFF] hover:shadow-md shadow-[#D9D9D9] hidden  rounded-[16px] relative ${
        travelTypeState === "oneWay" ? "xl:h-[171px]" : "xl:h-[271px]"
      }  ${
        travelTypeState === "oneWay" ? "lg:h-[350px]" : "lg:h-[450px]"
      }  xl:flex lg:grid `}
    >
      {travelTypeState === "oneWay" ? (
        // رايح
        <TicketOneWay
          aircraftCode={outboundAircraft[0].aircraftCode}
          carrierCode={outboundAircraft[0].carrierCode}
          flightNumber={outboundAircraft[0].flightNumber}
          price={+totalPriceEGP}
        />
      ) : (
        // رايح جاي
        <Ticket
          daysDifference={daysDifference}
          aircraftCode={outboundAircraft[0].aircraftCode}
          carrierCode={outboundAircraft[0].carrierCode}
          flightNumber={outboundAircraft[0].flightNumber}
          // Data Return

          aircraftCodeReturn={dataAirReturn[0].aircraftCode}
          carrierCodeReturn={dataAirReturn[0].carrierCode}
          flightNumberReturn={dataAirReturn[0].flightNumber}
          price={+totalPriceEGP}
        />
      )}

      <div className="xl:w-[200px] ms-auto xl:flex lg:block lg:w-full lg:pt-3 xl:bg-[#FFF] hidden border-2 border-b-0 xl:border-t-0 border-t-2 lg:border-l-0 xl:border-l-2 border-r-0 border-dashed">
        {/* <hr
          className={`w-[1px] h-full border border-dashed border-slate-400 `}
        /> */}
        <CheckOutTicket degree={degree} totalPriceEGP={+totalPriceEGP} />
      </div>
    </div>
  );
}

export default CardTrip;
