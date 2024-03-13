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
import { getTokenForAmadeus } from "../../Keys/GetTokenForAmadeus";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SetTicketsHotels } from "../../data/RecoilState/Hotels/MainSearchData";
import TicketLoading from "../../components/loder/TicketLoading";
import { useNavigate } from "react-router-dom";
import TicketsHotelsMapped from "../../components/Hotel/TicketsHotelsMapped";

export function capitalizeFirstLetter(str: string) {
  return (
    str ||
    "".replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    })
  );
}
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
  const [, setTicketsHotels] = useRecoilState(SetTicketsHotels);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const getHotelsDataSearch = async () => {
    if (!locationFrom) {
      return navigate("/");
    }
    setLoading(true);
    const cityCode = `cityCode=${locationFrom}`;
    // In
    // const storeDateGoY = `${dateGoState}`.split("/")[2];
    // const storeDateGoMonth = `${dateGoState}`.split("/")[1];
    // const storeDateGoDay = `${dateGoState}`.split("/")[0];
    // Out
    // const storeDateOutY = `${dateGoState}`.split("/")[2];
    // const storeDateOutMonth = `${dateGoState}`.split("/")[1];
    // const storeDateOutDay = `${dateGoState}`.split("/")[0];

    // const checkInDate = `checkInDate=${storeDateGoY}-${storeDateGoMonth}-${storeDateGoDay}`;
    // const checkOutDate = `checkOutDate=${storeDateOutY}-${storeDateOutMonth}-${storeDateOutDay}`;
    // const rate = `rate=${RateingState}`;
    // const adults = `adults=${adultsDataState}`;
    // const children = `children=${childrenDataState}`;

    let dataOfQuery = `${cityCode}`;
    // if (dateReturnState) {
    //   dataOfQuery += `&${checkOutDate}`;
    // }
    const ratings =
      RateingState === 0
        ? ""
        : RateingState === 1
        ? "1"
        : RateingState === 2
        ? "1,2"
        : RateingState === 3
        ? "1,2,3"
        : RateingState === 4
        ? "1,2,3,4"
        : RateingState === 5
        ? "1,2,3,4,5"
        : "";

    if (RateingState !== 0) {
      dataOfQuery += `&ratings=${ratings}`;
    }
    // if (adultsDataState) {
    //   dataOfQuery += `&${adults}`;
    // }
    // if (childrenDataState) {
    //   dataOfQuery += `&${children}`;
    // }
    // console.log({ dataOfQuery });

    const token = await getTokenForAmadeus();
    await axios
      .get(
        `${
          import.meta.env.VITE_PUBLIC_API
        }/reference-data/locations/hotels/by-city?${dataOfQuery}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        setLoading(false);

        // console.log(data);
        setTicketsHotels(data.data);
      })
      .catch((err) => {
        console.log("search Hotels ===> ", err);
        toast.error(err.response.data.errors[0]?.title || "Error", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  useEffect(() => {
    getHotelsDataSearch();
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
      <div className={`py-`}>{/* <HeaderSearch /> */}</div>
      <TicketsHotelsMapped />
    </section>
  );
}

export default SearchHotels;
