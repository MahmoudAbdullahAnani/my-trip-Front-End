import { useRecoilState } from "recoil";
import {
  Rateing,
  adultsData,
  childrenData,
} from "../../data/RecoilState/FormSearchData";
import {
  dateGo,
  dateReturn,
  originSearch,
} from "../../data/RecoilState/FormHandling";
// import { getTokenForAmadeus } from "../../Keys/GetTokenForAmadeus";
import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import {
//   ChooseCityNameHotel,
//   // ChooseHotelIDs,
//   SerpAPIHotels,
//   // SetTicketsHotels,
// } from "../../data/RecoilState/Hotels/MainSearchData";
import TicketLoading from "../../components/loder/TicketLoading";
// import { useNavigate } from "react-router-dom";
import TicketsHotelsMapped from "../../components/Hotel/TicketsHotelsMapped";
// import { useTranslation } from "react-i18next";

export function capitalizeFirstLetter(str: string) {
  return (
    str ||
    "".replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    })
  );
}

// async function getOffersTicketsHotels(data: string[]) {
//   const res = await axios
//     .get(
//       `${
//         import.meta.env.VITE_PUBLIC_API_V3
//       }/shopping/hotel-offers?hotelIds=${data}`,
//       {
//         headers: {
//           Authorization: `Bearer ${await getTokenForAmadeus()}`,
//         },
//       }
//     )
//     .catch((err) => {
//       console.log(err);
//     });

//   return res;
// }
function SearchHotels() {
  const [locationFrom] = useRecoilState(originSearch);
  const [dateGoState] = useRecoilState(dateGo);
  const [dateReturnState] = useRecoilState(dateReturn);
  const [childrenDataState] = useRecoilState(childrenData);
  const [adultsDataState] = useRecoilState(adultsData);
  const [RateingState] = useRecoilState(Rateing);
  console.log({
    locationFrom,
    dateGoState,
    dateReturnState,
    childrenDataState,
    adultsDataState,
    RateingState,
  });
  // const [, setTicketsHotels] = useRecoilState(SetTicketsHotels);
  // const [, setChooseHotelIDs] = useRecoilState(ChooseHotelIDs);
  // SepAPI
  // const [, setHotelsData] = useRecoilState(SerpAPIHotels);
  // const [chooseCityNameHotel] = useRecoilState(ChooseCityNameHotel);

  // const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);
  const [loading] = useState(false);
  // // In
  // const storeDateGoY = `${dateGoState}`.split("/")[2];
  // const storeDateGoMonth = `${dateGoState}`.split("/")[1];
  // const storeDateGoDay = `${dateGoState}`.split("/")[0];
  // // Out
  // const storeDateOutY = `${dateReturnState}`.split("/")[2];
  // const storeDateOutMonth = `${dateReturnState}`.split("/")[1];
  // const storeDateOutDay = `${dateReturnState}`.split("/")[0];
  // const getHotelsDataSearch = async () => {
  //   if (!locationFrom) {
  //     return navigate("/");
  //   }
  //   setLoading(true);
  //   const cityCode = `cityCode=${locationFrom}`;

  //   // const checkInDate = `checkInDate=${storeDateGoY}-${storeDateGoMonth}-${storeDateGoDay}`;
  //   // const checkOutDate = `checkOutDate=${storeDateOutY}-${storeDateOutMonth}-${storeDateOutDay}`;
  //   // const rate = `rate=${RateingState}`;
  //   // const adults = `adults=${adultsDataState}`;
  //   // const children = `children=${childrenDataState}`;

  //   let dataOfQuery = `${cityCode}`;
  //   // if (dateReturnState) {
  //   //   dataOfQuery += `&${checkOutDate}`;
  //   // }
  //   const ratings =
  //     RateingState === 0
  //       ? ""
  //       : RateingState === 1
  //       ? "1"
  //       : RateingState === 2
  //       ? "1,2"
  //       : RateingState === 3
  //       ? "1,2,3"
  //       : RateingState === 4
  //       ? "1,2,3,4"
  //       : RateingState === 5
  //       ? "1,2,3,4,5"
  //       : "";

  //   if (RateingState !== 0) {
  //     dataOfQuery += `&ratings=${ratings}`;
  //   }
  //   // if (adultsDataState) {
  //   //   dataOfQuery += `&${adults}`;
  //   // }
  //   // if (childrenDataState) {
  //   //   dataOfQuery += `&${children}`;
  //   // }
  //   console.log({ dataOfQuery });

  //   const token = await getTokenForAmadeus();
  //   console.log(
  //     `${
  //       import.meta.env.VITE_PUBLIC_API
  //     }/reference-data/locations/hotel?keyword=${chooseCityNameHotel}&subType=HOTEL_LEISURE`
  //   );

  //   await axios
  //     .get(
  //       `${
  //         import.meta.env.VITE_PUBLIC_API
  //       }/reference-data/locations/hotel?keyword=${chooseCityNameHotel}&subType=HOTEL_LEISURE`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     )
  //     .then(({ data }) => {
  //       setLoading(false);
  //       const hotelIDs = data.data
  //         .map(({ hotelIds }: { hotelIds: string }) => hotelIds[0])
  //         .join(",");
  //       setChooseHotelIDs(hotelIDs);
  //       getOffersTicketsHotels(hotelIDs);
  //     })
  //     .catch((err) => {
  //       console.log("search Hotels ===> ", err);
  //       toast.error(err.response?.data.errors[0]?.title || "Error", {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //     });
  // };
  // const { i18n } = useTranslation();
  // const getHotelsData = async () => {
  //   const token = localStorage.getItem("token") || "";
  //   setLoading(true);
  //   await axios
  //     .post(
  //       import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
  //         ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/hotel`
  //         : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}/hotel`,
  //       {
  //         chooseCityNameHotel,
  //         dateGoState,
  //         dateReturnState:
  //           dateReturnState === "" ? dateGoState : dateReturnState,
  //         adultsDataState,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     )
  //     .then(({ data }) => {
  //       // console.log("hotels ===>", data.properties);
  //       setLoading(false);

  //       setHotelsData(data.properties);
  //     })
  //     .catch((err) => {
  //       console.log("search Hotels ===> ", err);
  //       navigate("/");
  //       toast.error("لا توجد بيانات" || "Error", {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //     });
  // };

  useEffect(() => {
    // getHotelsDataSearch();
    // getHotelsData();
  }, []);

  if (loading) {
    return (
      <>
        <div className={`py-10 flex flex-col gap-5`}>
          <TicketLoading />
          <TicketLoading />
          <TicketLoading />
          <TicketLoading />
        </div>
      </>
    );
  }

  return (
    <section className={``}>
      <div className={``}>{/* <HeaderSearch /> */}</div>
      <TicketsHotelsMapped />
    </section>
  );
}

export default SearchHotels;
