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

function CardTrip({ itineraries, price, travelerPricings, id }: FlightOffer) {
  const [storeCurrency] = useRecoilState(StoreCurrency);

  // Handle Data
  const durationH = itineraries[0].duration.split("PT")[1].split("H")[0];
  const durationM = itineraries[0].duration
    .split("PT")[1]
    .split("H")[1]
    .split("M")[0];

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

  const departureIataCode = itineraries[0].segments[0].departure.iataCode;
  const [arrivalIataCodeReturn, setArrivalIataCode] = useState(
    itineraries[0].segments[0].arrival.iataCode
  );

  // بيانات الطائرة و الرحلة

  // كود الذهاب
  const outboundFlight = itineraries[0];
  const outboundSegments = outboundFlight.segments;

  // // بيانات الطائرة في الذهاب
  const outboundAircraft = outboundSegments.map((segment) => ({
    carrierCode: segment.carrierCode,
    flightNumber: segment.number,
    aircraftCode: segment.aircraft.code,
  }));

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
  // console.log(itineraries);

  const [arrivalIataCodeReturnRound, setArrivalIataCodeReturn] = useState("");
  const [durationReturnH, setDurationReturnH] = useState("");
  const [durationReturnM, setDurationReturnM] = useState("");
  useEffect(() => {
    if (itineraries[0].segments.length > 1) {
      setArrivalIataCode(itineraries[0].segments[1].arrival.iataCode);
    }
    if (travelTypeState !== "oneWay") {
      // تاريخ العودة
      setDurationReturnH(itineraries[1].duration.split("PT")[1].split("H")[0]);
      setDurationReturnM(
        itineraries[1].duration.split("PT")[1].split("H")[1].split("M")[0]
      );

      const returnDate = itineraries[1].segments[0].arrival.at;

      setArrivalIataCodeReturn(itineraries[1].segments[0].arrival.iataCode);

      // eslint-disable-next-line react-hooks/exhaustive-deps
      setDaysDifference(
        differenceInDays(
          new Date(returnDate.slice(0, 10)),
          new Date(departureDate.slice(0, 10))
        )
      );

      const returnFlight = itineraries[1];

      const returnSegments = returnFlight.segments;
      const returnAircraft = returnSegments.map((segment) => ({
        carrierCode: segment.carrierCode,
        flightNumber: segment.number,
        aircraftCode: segment.aircraft.code,
      }));
      setDataAirReturn(returnAircraft);
    }
  }, []);

  return (
    <>
      {/* Desktop */}
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
            ticketId={id}
            dTerminal={itineraries[0].segments[0].departure.terminal || ""}
            aTerminal={itineraries[0].segments[1].arrival.terminal || ""}
            degree={degree}
            aircraftCode={outboundAircraft[0]?.aircraftCode || ""}
            carrierCode={outboundAircraft[0]?.carrierCode || ""}
            flightNumber={outboundAircraft[0]?.flightNumber || ""}
            departureIataCode={departureIataCode}
            arrivalIataCodeReturn={arrivalIataCodeReturn}
            durationH={durationH}
            durationM={durationM}
            departureDateGo={
              itineraries[0].segments[0]?.departure.at ||
              "2022-05-01T00:00:00.000Z"
            }
            arrivalDateReturn={
              itineraries[0].segments[1]?.arrival.at ||
              "2022-05-01T00:00:00.000Z"
            }
            isStope={itineraries[0].segments[0]?.numberOfStops || 0}
            price={+totalPriceEGP}
          />
        ) : (
          // رايح جاي
          <Ticket
            ticketId={id}
            d1Terminal={itineraries[0].segments[0]?.departure.terminal || ""}
            a1Terminal={itineraries[0].segments[1]?.arrival.terminal || ""}
            d2Terminal={itineraries[1].segments[0].departure.terminal || ""}
            a2Terminal={itineraries[1].segments[1]?.arrival.terminal || ""}
            degree={degree}
            daysDifference={daysDifference}
            aircraftCode={outboundAircraft[0]?.aircraftCode || ""}
            carrierCode={outboundAircraft[0]?.carrierCode || ""}
            flightNumber={outboundAircraft[0]?.flightNumber || ""}
            departureIataCode={departureIataCode}
            arrivalIataCodeReturnRound={arrivalIataCodeReturnRound}
            durationH={durationH}
            durationM={durationM}
            durationReturnH={durationReturnH}
            durationReturnM={durationReturnM}
            isStope1={itineraries[0].segments[0]?.numberOfStops || 0}
            isStope2={itineraries[1].segments[1]?.numberOfStops || 0}
            //travel 1
            departureDateGo1={
              itineraries[0].segments[0]?.departure.at ||
              "2022-05-01T00:00:00.000Z"
            }
            arrivalDateReturn1={
              itineraries[0].segments[1]?.arrival.at ||
              "2022-05-01T00:00:00.000Z"
            }
            //travel 2
            departureDateGo2={
              itineraries[1].segments[0]?.departure.at ||
              "2022-05-01T00:00:00.000Z"
            }
            arrivalDateReturn2={
              itineraries[1].segments[1]?.arrival.at || "2022-05-01T00:00:00.000Z"
            }
            //
            aircraftCodeReturn={dataAirReturn[0]?.aircraftCode || ""}
            carrierCodeReturn={dataAirReturn[0]?.carrierCode || ""}
            flightNumberReturn={dataAirReturn[0]?.flightNumber || ""}
            price={+totalPriceEGP}
          />
        )}

        <div className="xl:w-[200px] ms-auto xl:flex lg:block lg:w-full lg:pt-3 xl:bg-[#FFF] hidden rounded-e-[16px] border-2 border-b-0 xl:border-t-0 border-t-2 lg:border-l-0 xl:border-l-2 border-r-0 border-dashed">
          {/* <hr
          className={`w-[1px] h-full border border-dashed border-slate-400 `}
        /> */}

          <CheckOutTicket
            ticketId={id}
            degree={degree}
            totalPriceEGP={+totalPriceEGP}
          />
        </div>
      </div>
      {/* Mobile */}
      <div
        // lg:w-[548px] ll:w-[848px]
        className={`bg-[#FFF] hover:shadow-md shadow-[#D9D9D9] lg:hidden block  rounded-[16px] relative ${
          travelTypeState === "oneWay" ? "xl:h-[171px]" : "xl:h-[271px]"
        }  ${travelTypeState === "oneWay" ? "lg:h-[350px]" : "lg:h-[450px]"}`}
      >
        {travelTypeState === "oneWay" ? (
          // رايح
          <TicketOneWay
            ticketId={id}
            dTerminal={itineraries[0].segments[0].departure.terminal || ""}
            aTerminal={itineraries[0].segments[1].arrival.terminal || ""}
            degree={degree}
            isMobile={true}
            aircraftCode={outboundAircraft[0]?.aircraftCode || ""}
            carrierCode={outboundAircraft[0]?.carrierCode || ""}
            flightNumber={outboundAircraft[0]?.flightNumber || ""}
            departureIataCode={departureIataCode}
            arrivalIataCodeReturn={arrivalIataCodeReturn}
            durationH={durationH}
            durationM={durationM}
            departureDateGo={
              itineraries[0].segments[0]?.departure.at ||
              "2022-05-01T00:00:00.000Z"
            }
            arrivalDateReturn={
              itineraries[0].segments[1]?.arrival.at ||
              "2022-05-01T00:00:00.000Z"
            }
            isStope={itineraries[0].segments[0]?.numberOfStops || 0}
            price={+totalPriceEGP}
          />
        ) : (
          // رايح جاي
          <Ticket
            ticketId={id}
            d1Terminal={itineraries[0].segments[0]?.departure.terminal || ""}
            a1Terminal={itineraries[0].segments[1]?.arrival.terminal || ""}
            d2Terminal={itineraries[1].segments[0].departure.terminal || ""}
            a2Terminal={itineraries[1].segments[1]?.arrival.terminal || ""}
            degree={degree}
            isMobile={true}
            daysDifference={daysDifference}
            aircraftCode={outboundAircraft[0]?.aircraftCode || ""}
            carrierCode={outboundAircraft[0]?.carrierCode || ""}
            flightNumber={outboundAircraft[0]?.flightNumber || ""}
            departureIataCode={departureIataCode}
            arrivalIataCodeReturnRound={arrivalIataCodeReturnRound}
            durationH={durationH}
            durationM={durationM}
            durationReturnH={durationReturnH}
            durationReturnM={durationReturnM}
            isStope1={itineraries[0].segments[0]?.numberOfStops || 0}
            isStope2={itineraries[1].segments[1]?.numberOfStops || 0}
            //travel 1
            departureDateGo1={
              itineraries[0].segments[0]?.departure.at ||
              "2022-05-01T00:00:00.000Z"
            }
            arrivalDateReturn1={
              itineraries[0].segments[1]?.arrival.at ||
              "2022-05-01T00:00:00.000Z"
            }
            //travel 2
            departureDateGo2={
              itineraries[1].segments[0]?.departure.at ||
              "2022-05-01T00:00:00.000Z"
            }
            arrivalDateReturn2={
              itineraries[1].segments[1]?.arrival.at ||
              "2022-05-01T00:00:00.000Z"
            }
            //
            aircraftCodeReturn={dataAirReturn[0]?.aircraftCode || ""}
            carrierCodeReturn={dataAirReturn[0]?.carrierCode || ""}
            flightNumberReturn={dataAirReturn[0]?.flightNumber || ""}
            price={+totalPriceEGP}
          />
        )}

        <div className="xl:w-[200px] ms-auto xl:flex lg:block lg:w-full lg:pt-3 xl:bg-[#FFF] hidden rounded-e-[16px] border-2 border-b-0 xl:border-t-0 border-t-2 lg:border-l-0 xl:border-l-2 border-r-0 border-dashed">
          {/* <hr
          className={`w-[1px] h-full border border-dashed border-slate-400 `}
        /> */}
          <CheckOutTicket
            ticketId={id}
            degree={degree}
            totalPriceEGP={+totalPriceEGP}
          />
        </div>
        <div className="xl:w-[200px] ms-auto lg:hidden flex  lg:w-full lg:pt-3 xl:bg-[#FFF]  rounded-e-[16px] border-2 border-b-0  border-t-2 border-x-0 border-dashed">
          {/* <hr
          className={`w-[1px] h-full border border-dashed border-slate-400 `}
        /> */}
          <CheckOutTicket
            ticketId={id}
            isMobile={true}
            degree={degree}
            totalPriceEGP={+totalPriceEGP}
          />
        </div>
      </div>
    </>
  );
}

export default CardTrip;
