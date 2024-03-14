import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TicketLoading from "../../components/loder/TicketLoading";
import axios from "axios";
import { getTokenForAmadeus } from "../../Keys/GetTokenForAmadeus";
import { HotelOffer } from "../../interface/Hotel.interface";
import { toast } from "react-toastify";
import { capitalizeFirstLetter } from "./SearchHotels";

function HotelsChoose() {
  const { hotelId } = useParams();
  const [loading, setLoading] = useState(true);
  const [hotelData, setHotelData] = useState({});
  const navigator = useNavigate();
  const getHotelData = async () => {
    setLoading(true);
    const token = await getTokenForAmadeus();
    await axios
      .get(
        `${
          import.meta.env.VITE_PUBLIC_API_V3
        }/shopping/hotel-offers/${hotelId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const data: HotelOffer = res.data.data;
        setHotelData(data);
      })
      .catch((err) => {
        console.log(err);
        const textError = err.response.data.errors[0]?.title.toLowerCase();
        navigator(`/search/hotel`);
        toast.error(capitalizeFirstLetter(textError) || "Error", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  console.log(hotelData);

  useEffect(() => {
    getHotelData();
  }, []);
  if (loading) {
    return (
      <>
        <div className={`py-10 flex flex-col gap-5`}>
          <TicketLoading />
        </div>
      </>
    );
  }

  return <div></div>;
}

export default HotelsChoose;
