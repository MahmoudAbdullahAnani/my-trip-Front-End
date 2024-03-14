import { useEffect } from "react";
import { HotelChoose } from "../../data/RecoilState/Hotels/MainSearchData";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

function HotelsChoose() {
  const navigator = useNavigate();
  // const getHotelData = async () => {
  //   setLoading(true);
  //   const token = await getTokenForAmadeus();
  //   await axios
  //     .get(
  //       `${
  //         import.meta.env.VITE_PUBLIC_API_V3
  //       }/shopping/hotel-offers/${hotelId}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       const data: HotelOffer = res.data.data;
  //       setHotelData(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       const textError = err.response.data.errors[0]?.title.toLowerCase();
  //       navigator(`/search/hotel`);
  //       toast.error(capitalizeFirstLetter(textError) || "Error", {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };
  const [hotelChoose] = useRecoilState(HotelChoose);

  useEffect(() => {
    window.scroll(0, 0);
    if (!hotelChoose) {
      return navigator("/search/hotel");
    }
  }, [hotelChoose]);

  return <div>

  </div>;
}

export default HotelsChoose;
