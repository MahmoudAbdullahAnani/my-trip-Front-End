import { useEffect, useState } from "react";
import TicketLoading from "../../components/loder/TicketLoading";
import {
  // dateGo,
  // originSearch,
  typeSystem,
} from "../../data/RecoilState/FormHandling";
import { useRecoilState } from "recoil";
import TicketsCarsMapped from "../../components/Car/TicketsCarsMapped";
// import axios from "axios";
// import {
//   AgeCars,
//   CityNameCars,
//   CountryNameCars,
//   GeoLocation,
//   MainDataCars,
// } from "../../data/RecoilState/car/MainDataCar";
// import { getTokenForAmadeus } from "../../Keys/GetTokenForAmadeus";
// import { Flip, toast } from "react-toastify";
// import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";

function SearchCars() {
  const [loading] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [, setTypeSystemState] = useRecoilState(typeSystem);
  // const [startLocationCode] = useRecoilState(originSearch);
  // const [dateGoState] = useRecoilState(dateGo);
  // const [cityNameCars] = useRecoilState(CityNameCars);
  // const [countryNameCars] = useRecoilState(CountryNameCars);
  // const [ageCars] = useRecoilState(AgeCars);
  // const [geo] = useRecoilState(GeoLocation);
  // const [, setMainDataCars] = useRecoilState(MainDataCars);

  // const { t } = useTranslation();
  // const navigator = useNavigate();
  // const getData = async () => {
  //   setLoading(true);
  //   const token = await getTokenForAmadeus();
  //   await axios
  //     .post(
  //       `${import.meta.env.VITE_PUBLIC_API}/shopping/transfer-offers`,
  //       {
  //         startLocationCode:
  //           startLocationCode === "CIR" ? "CAI" : startLocationCode,
  //         endAddressLine: cityNameCars,
  //         endCityName: cityNameCars,
  //         //   "endZipCode": "75007",
  //         endCountryCode: countryNameCars,
  //         //   "endName": "Sandoub Manoura",
  //         endGeoCode: `${geo.lat},${geo.long}`,
  //         transferType: "PRIVATE",
  //         startDateTime: dateGoState,
  //         //   "providerCodes": "TXO",
  //         //   "passengers": 2,
  //         stopOvers: [
  //           // {
  //           //   "duration": "PT2H30M",
  //           //   "sequenceNumber": 1,
  //           //   "addressLine": "Avenue de la Bourdonnais, 19",
  //           //   "countryCode": "FR",
  //           //   "cityName": "Paris",
  //           //   "zipCode": "75007",
  //           //   "name": "De La Tours",
  //           //   "geoCode": "48.859477,2.2976985",
  //           //   "stateCode": "FR"
  //           // }
  //         ],
  //         //   "startConnectedSegment": {
  //         //     "transportationType": "FLIGHT",
  //         //     "transportationNumber": "AF380",
  //         //     "departure": {
  //         //       "localDateTime": "2023-11-16T09:00:00",
  //         //       "iataCode": "RUH"
  //         //     },
  //         //     "arrival": {
  //         //       "localDateTime": "2024-3-16T10:00:00",
  //         //       "iataCode": "CAI"
  //         //     }
  //         //   },
  //         passengerCharacteristics: [
  //           {
  //             passengerTypeCode:
  //               startLocationCode === "CIR" ? "CAI" : startLocationCode,
  //             age: ageCars,
  //           },
  //         ],
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     )
  //     .then((data) => {
  //       setLoading(false);

  //       console.log({
  //         startLocationCode,
  //         dateGoState,
  //         cityNameCars,
  //         countryNameCars,
  //         ageCars,
  //         geo,
  //       });

  //       setMainDataCars(data.data.data);
  //       if (data.data.errors) {
  //         navigator("/car");
  //         return toast.error(t(data.data.errors[0].detail), {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //           transition: Flip,
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       setLoading(false);

  //       console.log("error car==>", error);
  //       if (error.response?.data.statusCode === 401) {
  //         localStorage.removeItem("token");
  //       }
  //     });
  // };
  useEffect(() => {
    window.scroll(0, 0);
    setTypeSystemState("car");
    // getData();
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
      <TicketsCarsMapped />
    </section>
  );
}

export default SearchCars;
