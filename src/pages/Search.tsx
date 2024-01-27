// React
import { useEffect, useState } from "react";
// react-router-dom
import { useNavigate } from "react-router-dom";
// Data
import { useRecoilState } from "recoil";

import {
  dateGo,
  dateReturn,
  destinationSearch,
  originSearch,
  typeTravel,
} from "../data/RecoilState/FormHandling";
import {
  adultsData,
  // childrenData,
  // levelTravelData,
  // youthsData,
} from "../data/RecoilState/FormSearchData";

// Fetching Data
import axios from "axios";
import { getTokenForAmadeus } from "../Keys/GetTokenForAmadeus";
import { Loder } from "../components/loder/Loder";
import CardTrip from "../components/Home/Sections/Search/CardTrip";
import { iconArrowLeftWhite } from "../assets/icons/home";

// const exampleData = [
//   {
//     type: "flight-offer",
//     id: "1",
//     source: "GDS",
//     instantTicketingRequired: false,
//     nonHomogeneous: false,
//     oneWay: false,
//     lastTicketingDate: "2024-01-27",
//     lastTicketingDateTime: "2024-01-27",
//     numberOfBookableSeats: 7,
//     itineraries: [
//       {
//         duration: "PT5H10M",
//         segments: [
//           {
//             departure: {
//               iataCode: "CAI",
//               terminal: "2",
//               at: "2024-01-27T21:00:00",
//             },
//             arrival: {
//               iataCode: "BAH",
//               at: "2024-01-28T00:50:00",
//             },
//             carrierCode: "GF",
//             number: "80",
//             aircraft: {
//               code: "789",
//             },
//             operating: {
//               carrierCode: "GF",
//             },
//             duration: "PT2H50M",
//             id: "10",
//             numberOfStops: 0,
//             blacklistedInEU: false,
//           },
//           {
//             departure: {
//               iataCode: "BAH",
//               at: "2024-01-28T01:55:00",
//             },
//             arrival: {
//               iataCode: "DXB",
//               terminal: "1",
//               at: "2024-01-28T04:10:00",
//             },
//             carrierCode: "GF",
//             number: "500",
//             aircraft: {
//               code: "320",
//             },
//             operating: {
//               carrierCode: "GF",
//             },
//             duration: "PT1H15M",
//             id: "11",
//             numberOfStops: 0,
//             blacklistedInEU: false,
//           },
//         ],
//       },
//     ],
//     price: {
//       currency: "EUR",
//       total: "207.01",
//       base: "61.00",
//       fees: [
//         {
//           amount: "0.00",
//           type: "SUPPLIER",
//         },
//         {
//           amount: "0.00",
//           type: "TICKETING",
//         },
//       ],
//       grandTotal: "207.01",
//     },
//     pricingOptions: {
//       fareType: ["PUBLISHED"],
//       includedCheckedBagsOnly: true,
//     },
//     validatingAirlineCodes: ["GF"],
//     travelerPricings: [
//       {
//         travelerId: "1",
//         fareOption: "STANDARD",
//         travelerType: "ADULT",
//         price: {
//           currency: "EUR",
//           total: "207.01",
//           base: "61.00",
//         },
//         fareDetailsBySegment: [
//           {
//             segmentId: "10",
//             cabin: "ECONOMY",
//             fareBasis: "WDLIT4EG",
//             brandedFare: "ECOLITE",
//             brandedFareLabel: "ECONOMY LIGHT",
//             class: "W",
//             includedCheckedBags: {
//               quantity: 2,
//             },
//             amenities: [
//               {
//                 description: "STANDARD SEAT",
//                 isChargeable: true,
//                 amenityType: "PRE_RESERVED_SEAT",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "MEALS AND BEVERAGES",
//                 isChargeable: false,
//                 amenityType: "MEAL",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "EXTRA LEGROOM SEATS",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "REFUNDABLE TICKET",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "CHANGEABLE TICKET",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "PREFERRED SEATS",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "50 PERCENT MILES EARNED",
//                 isChargeable: false,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//             ],
//           },
//           {
//             segmentId: "11",
//             cabin: "ECONOMY",
//             fareBasis: "WDLIT4EG",
//             brandedFare: "ECOLITE",
//             brandedFareLabel: "ECONOMY LIGHT",
//             class: "W",
//             includedCheckedBags: {
//               quantity: 2,
//             },
//             amenities: [
//               {
//                 description: "STANDARD SEAT",
//                 isChargeable: true,
//                 amenityType: "PRE_RESERVED_SEAT",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "MEALS AND BEVERAGES",
//                 isChargeable: false,
//                 amenityType: "MEAL",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "EXTRA LEGROOM SEATS",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "REFUNDABLE TICKET",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "CHANGEABLE TICKET",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "PREFERRED SEATS",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "50 PERCENT MILES EARNED",
//                 isChargeable: false,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];

function Search() {
  // Statement Data of trip
  const [trip, setTrip] = useState([]);
  const [loading, setLoading] = useState(true);
  // Data For Search
  const [originLocationCode] = useRecoilState(originSearch);
  const [destinationLocationCode] = useRecoilState(destinationSearch);
  const [departureDate] = useRecoilState(dateGo);
  const [returnDate] = useRecoilState(dateReturn);
  // const [levelTravelDataState] = useRecoilState(levelTravelData);
  // const [childrenDataState] = useRecoilState(childrenData);
  // const [youthsDataState] = useRecoilState(youthsData);
  const [adults] = useRecoilState(adultsData);
  const [typeTravelState] = useRecoilState(typeTravel);

  // Fetching Data
  const getDataSearch = async () => {
    const originLocationCodeQuery = `originLocationCode=${originLocationCode}`;
    const destinationLocationCodeQuery = `destinationLocationCode=${destinationLocationCode}`;
    const adultsQuery = `adults=${adults}`;
    // handle Date
    let departureDateQuery = "";
    departureDateQuery = `${departureDate?.toString().split("/")[2]}-${
      departureDate?.toString().split("/")[1]
    }-${departureDate?.toString().split("/")[0]}`;

    departureDateQuery = `departureDate=${departureDateQuery}`;

    let dataOfQuery = "";
    dataOfQuery = `${originLocationCodeQuery}&${destinationLocationCodeQuery}&${departureDateQuery}&${adultsQuery}`;
    if (typeTravelState !== "oneWay") {
      let returnDateQuery = "";

      returnDateQuery = `${returnDate?.toString().split("/")[2]}-${
        returnDate?.toString().split("/")[1]
      }-${returnDate?.toString().split("/")[0]}`;

      returnDateQuery = `returnDate=${returnDateQuery}`;

      dataOfQuery = `${originLocationCodeQuery}&${destinationLocationCodeQuery}&${departureDateQuery}&${returnDateQuery}&${adultsQuery}`;
    }
    // console.log("dataOfQuery==> ", dataOfQuery);

    if (originLocationCode && destinationLocationCode && departureDate) {
      const token = await getTokenForAmadeus();

      await axios
        .get(
          `${
            import.meta.env.VITE_PUBLIC_API_V2
          }/shopping/flight-offers?${dataOfQuery}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(({ data }) => {
          setTrip(data.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          navigator("/");
        });
    }
  };

  // console.log("trip==> ", trip);
  const navigator = useNavigate();
  useEffect(() => {
    if (!originLocationCode || !destinationLocationCode || !departureDate) {
      return navigator(`/`);
    }
    getDataSearch();
  }, []);
  if (loading) {
    return (
      <div
        className={`z-50 h-[100%] w-full absolute top-0 flex justify-center items-center bg-[#283965]`}
      >
        <Loder />
      </div>
    );
  }
  if (trip.length <= 0) {
    return <div>Not Found</div>;
  }
  return (
    <section className={``}>
      <header
        className={`lg:hidden pt-[calc(25px+54px)] pb-[89px] relative bg-d[url('/public/assets/mapHeader.png')]`}
      >
        {/* <div className={`absolute bottom-0 w-full z-20`}>{iconHeaderSearch}</div> */}
        <div
          className={` flex flex-col gap-[20px] px-[16px] relative z-20 text-[#FFF]`}
        >
          <button
            onClick={() => navigator("/")}
            style={{
              backdropFilter: "blur(5px)",
            }}
            className={`w-[48px] h-[48px] bg-[#58a3b7] duration-150 hover:bg-[#58a3b7c4] flex justify-center items-center rounded-[48px] `}
          >
            {iconArrowLeftWhite}
          </button>
          <div className={`flex justify-between`}>
            <div className={`flex flex-col items-end gap-[9px]`}>
              <span>دبي , الإمارات</span>
              <span className={`text-[20px] font-[700]`}>
                {destinationLocationCode || "DXH"}
              </span>
            </div>
            <div></div>
            <div className={`flex flex-col items-end gap-[9px]`}>
              <span>دبي , الإمارات</span>
              <span className={`text-[20px] font-[700]`}>
                {originLocationCode || "DXH"}
              </span>
            </div>
          </div>
        </div>
        <img
          src="/public/assets/mapHeader.png"
          className={`absolute w-full h-full top-0 object-cover z-10`}
        />
        <img
          src="/public/assets/headMobile.png"
          className={`absolute w-full h-[50px] bottom-0  z-10`}
        />
      </header>
      <div>
        {trip.map((trip: { itineraries: [], id: string }) => {
          return (
            <CardTrip
              itineraries={trip.itineraries}
              key={`${trip.id}--${Math.random()}`}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Search;
