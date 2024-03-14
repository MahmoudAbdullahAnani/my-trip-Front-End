import { useTranslation } from "react-i18next";

import "leaflet/dist/leaflet.css";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { capitalizeFirstLetter } from "../../pages/Hotels/SearchHotels";
import SimpleMap from "./SimpleMap";
{
  /* <SimpleMap
          latitude={data.gps_coordinates.latitude}
          longitude={data.gps_coordinates.longitude}
          className={`h-[300px] lg:h-[500px] rounded-lg border-none outline-none`}
        /> */
}
// import { format } from "date-fns";
// import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { HotelData } from "./interfaces/MainDataHotels.interface";
import { useRef, useState } from "react";
import {
  FreeMode,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
  Thumbs,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperType from "swiper";
// import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Rating } from "@mui/material";
import { useRecoilState } from "recoil";
import { HotelChoose } from "../../data/RecoilState/Hotels/MainSearchData";
import Modal from "@mui/material/Modal";
import HotelDetails from "./HotelDetails";
function TicketHotels(data: HotelData) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { t, i18n } = useTranslation();
  const [, setHotelChoose] = useRecoilState(HotelChoose);
  // const center = [data.geoCode.latitude, data.geoCode.longitude];
  // const nameHotel = data.name.toLowerCase();
  // const date = format(new Date(data.lastUpdate), "dd/MM/yyyy");
  // const navigator = useNavigate();
  console.log(data);
  const [thumbsSwiper] = useState(null);

  const swiperRef = useRef<SwiperType | null>(null);

  const images = data.images;
  return (
    <div
      className={`mx-auto w-full lg:h-[650px] p-3 flex flex-col lg:items-start items-end justify-between gap-5 bg-white border  hover:shadow-md shadow-[#D9D9D9] duration-300 rounded-lg overflow-hidden`}
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <div className={`w-full rounded-lg overflow-hidden`}>
        {/* <img src={images[0].thumbnail} alt="صورة" lang="ar" /> */}

        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          cssMode={true}
          pagination={window.innerWidth < 576}
          mousewheel={true}
          keyboard={true}
          modules={[
            Mousewheel,
            FreeMode,
            Pagination,
            Navigation,
            Keyboard,
            Thumbs,
          ]}
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
          className={`mySwiper relative w-full h-[200px] `}
          // navigation={true}
          spaceBetween={10}
          watchSlidesProgress={true}
          freeMode={true}
          slidesPerView={1}
          thumbs={{ swiper: thumbsSwiper }}
          onSlideChange={() => {}}
        >
          {images.map((img) => (
            <SwiperSlide
              dir="rtl"
              className={`rounded-[16px] overflow-hidden`}
              key={`${img.original_image}----${Math.random()}`}
            >
              {/* <ImageGallery
                items={[
                  { original: img.original_image, thumbnail: img.thumbnail },
                ]}
              /> */}
              <img
                src={img.original_image.split("=s")[0] + "=s1000"}
                className={`w-full h-full object-cover`}
                loading={"lazy"}
                lang="ar"
                // alt={img.thumbnail}
                decoding="async"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div
        className={` flex flex-col lg:items-${
          i18n.language === "ar" ? "end" : "start"
        } justify-center items-center`}
      >
        <div className=" ">
          <h1
            className={`text-[#117C99] text-[24px] text-center font-[700] mb-5`}
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
          >
            {data.name}
          </h1>
          <p
            className={`text-[#000] text-[16px] font-[500] mb-5`}
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
          >
            {data.description}
          </p>
        </div>

        {/* <p>{data.dupeId}</p>
        <p>{data.iataCode}</p>
      <p>{data.chainCode}</p> */}
      </div>
      <div className={`grid grid-cols-2 w-full`}>
        <div className={`flex flex-wrap items-center justify-center gap-3 `}>
          {(data.ratings || [{ stars: 0, count: 0 }]).map(
            ({ stars, count }) => (
              <div className="flex flex-col" key={`${stars}----${count}`}>
                <span>
                  {t("عدد الاشخاص")}: {count}
                </span>
                <Rating
                  name="read-only"
                  value={stars}
                  precision={0.5}
                  readOnly
                />
              </div>
            )
          )}
        </div>

        <div className={`flex flex-col justify-end items-center w-full h-full`}>
          <div className={`flex flex-col`}>
            {(data.essential_info || [""]).length > 0
              ? (data.essential_info || [""]).map((item) => (
                  <span key={`${item}----${Math.random()}`}>{item}</span>
                ))
              : (data.amenities || [""]).map((item) => (
                  <span key={`${item}----${Math.random()}`}>{item}</span>
                ))}
          </div>
          {data.check_in_time && (
            <div>
              {t("العمل من")} {data.check_in_time} {t("الي")}{" "}
              {data.check_out_time}
            </div>
          )}
          <div className={`flex gap-3`}>
            <button
              className={`px-3 py-2 rounded-lg mx-auto mt-10 bg-[#117C99] duration-200 text-white hover:bg-[#31B2E1]`}
              onClick={() => {
                setHotelChoose(data);
                handleOpen();
              }}
              // to={`/hotel/choose`}
            >
              {t("التفاصيل")}
            </button>
            <Link
              className={`px-3 py-2 rounded-lg mx-auto mt-10 bg-[#117C99] duration-200 text-white hover:bg-[#31B2E1]`}
              onClick={() => {
                setHotelChoose(data);
              }}
              to={data.link || ""}
              target="_blank"
            >
              {t("اختيار")}
            </Link>
          </div>
        </div>
      </div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <div
          className={`absolute overflow-scroll bg-white rounded-xl w-[80%] h-[80%] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]`}
        >
          <HotelDetails hotel={data} />
          <SimpleMap
            latitude={data.gps_coordinates.latitude}
            longitude={data.gps_coordinates.longitude}
            className={`h-[200px] rounded-lg border-none outline-none`}
          />
        </div>
      </Modal>
    </div>
  );
}
export default TicketHotels;
