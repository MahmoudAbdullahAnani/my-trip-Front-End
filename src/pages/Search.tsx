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

const exampleData = [
  {
    type: "flight-offer",
    id: "1",
    source: "GDS",
    instantTicketingRequired: false,
    nonHomogeneous: false,
    oneWay: false,
    lastTicketingDate: "2024-01-27",
    lastTicketingDateTime: "2024-01-27",
    numberOfBookableSeats: 9,
    itineraries: [
      {
        duration: "PT21H50M",
        segments: [
          {
            departure: {
              iataCode: "MAD",
              at: "2024-01-27T21:00:00",
            },
            arrival: {
              iataCode: "NCE",
              at: "2024-01-27T23:30:00",
            },
            carrierCode: "6X",
            number: "7829",
            aircraft: {
              code: "744",
            },
            operating: {
              carrierCode: "6X",
            },
            duration: "PT2H30M",
            id: "131",
            numberOfStops: 0,
            blacklistedInEU: false,
          },
          {
            departure: {
              iataCode: "NCE",
              terminal: "1",
              at: "2024-01-28T08:30:00",
            },
            arrival: {
              iataCode: "JFK",
              terminal: "4",
              at: "2024-01-28T12:50:00",
            },
            carrierCode: "6X",
            number: "7430",
            aircraft: {
              code: "744",
            },
            operating: {
              carrierCode: "6X",
            },
            duration: "PT10H20M",
            stops: [
              {
                iataCode: "LGW",
                duration: "PT1H",
                arrivalAt: "2024-01-28T09:30:00",
                departureAt: "2024-01-28T10:30:00",
              },
            ],
            id: "132",
            numberOfStops: 1,
            blacklistedInEU: false,
          },
        ],
      },
    ],
    price: {
      currency: "EUR",
      total: "363.50",
      base: "295.00",
      fees: [
        {
          amount: "0.00",
          type: "SUPPLIER",
        },
        {
          amount: "0.00",
          type: "TICKETING",
        },
      ],
      grandTotal: "363.50",
      additionalServices: [
        {
          amount: "1.00",
          type: "CHECKED_BAGS",
        },
      ],
    },
    pricingOptions: {
      fareType: ["PUBLISHED"],
      includedCheckedBagsOnly: true,
    },
    validatingAirlineCodes: ["6X"],
    travelerPricings: [
      {
        travelerId: "1",
        fareOption: "STANDARD",
        travelerType: "ADULT",
        price: {
          currency: "EUR",
          total: "363.50",
          base: "295.00",
        },
        fareDetailsBySegment: [
          {
            segmentId: "131",
            cabin: "BUSINESS",
            fareBasis: "J6XQSMIX",
            class: "J",
            includedCheckedBags: {
              quantity: 1,
            },
          },
          {
            segmentId: "132",
            cabin: "BUSINESS",
            fareBasis: "J6XQSMIX",
            class: "J",
            includedCheckedBags: {
              quantity: 1,
            },
          },
        ],
      },
    ],
  },
];

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
    // if (!originLocationCode || !destinationLocationCode || !departureDate) {
    //   return navigator(`/`);
    // }
    // getDataSearch();
  }, []);
  // if (loading) {
  //   return (
  //     <div
  //       className={`z-50 h-[100%] w-full absolute top-0 flex justify-center items-center bg-[#283965]`}
  //     >
  //       <Loder />
  //     </div>
  //   );
  // }
  // if (trip.length <= 0) {
  //   return <div>Not Found</div>;
  // }
  return (
    <section className={``}>
      <header
        className={`pt-[calc(25px+54px)] pb-[44px] relative bg-d[url('/public/assets/mapHeader.png')]`}
      >
        <div
          className={`lg:hidden flex flex-col gap-[20px] px-[16px] relative z-20 text-[#FFF]`}
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
      </header>
      {exampleData.map((trip) => {
        return <CardTrip {...trip} key={`${trip.id}--${Math.random()}`} />;
      })}
    </section>
  );
}

export default Search;
