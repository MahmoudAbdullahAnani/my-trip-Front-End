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
import isLoading from "../data/RecoilState/Loading";

function Search() {
  // Statement Data of trip
  const [trip, setTrip] = useState([]);
  const [, setLoading] = useRecoilState(isLoading);
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
    setLoading(true);
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
        console.log(data);
        setTrip(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        navigator("/");
      });
  };

  console.log(trip);
  const navigator = useNavigate();
  useEffect(() => {
    if (!originLocationCode || !destinationLocationCode || !departureDate) {
      navigator(`/`);
    } else {
      getDataSearch();
    }
  }, []);
  return <section></section>;
}

export default Search;
