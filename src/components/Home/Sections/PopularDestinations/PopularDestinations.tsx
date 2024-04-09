import PopularDestinationsCard from "./PopularDestinationsCard";
import exampleMainImage from "/public/assets/heroSection.jpeg";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { Mousewheel, Pagination, Keyboard } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import SwiperType from "swiper";
import { iconLeftSwiper, iconRightSwiper } from "../../../../assets/icons/home";
import { useTranslation } from "react-i18next";
import axios from "axios";

function PopularDestinations() {
  const [data, setData] = useState([
    {
      id: 1,
      img: exampleMainImage,
      titleAR: "مصر",
      titleEN: "Egypt",
    },
    {
      id: 2,
      img: exampleMainImage,
      titleAR: "مكة",
      titleEN: "Macca",
    },
    {
      id: 1,
      img: exampleMainImage,
      titleAR: "المغرب",
      titleEN: "Morocco",
    },
    {
      id: 1,
      img: exampleMainImage,
      titleAR: "القاهرة",
      titleEN: "Egypt",
    },
    {
      id: 1,
      img: exampleMainImage,
      titleAR: "القاهرة",
      titleEN: "Egypt",
    },
    {
      id: 1,
      img: exampleMainImage,
      titleAR: "القاهرة",
      titleEN: "Egypt",
    },
    {
      id: 1,
      img: exampleMainImage,
      titleAR: "القاهرة",
      titleEN: "Egypt",
    },
  ]);
  // console.log(window.innerWidth);
  const swiperRef = useRef<SwiperType | null>(null);

  // Lang
  const { t, i18n } = useTranslation();

  const getData = async () => {
    await axios
      .get(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${
              import.meta.env.VITE_PUBLIC_API_LOCAL
            }/static-sections/popular-destinations`
          : `${
              import.meta.env.VITE_PUBLIC_API_PRODUCTION
            }/static-sections/popular-destinations`
      )
      .then(async ({ data }) => {

        setData(data.data);
      })
      .catch((err) => {
        console.log("static-sections-PopularDestinations==> ", err);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <section
      className={` py-16 md:py-20 ${data.length<=0 && "hidden"} lg:py-28 flex flex-col gap-[34px] ${
        i18n.language === "ar"
          ? "pe-[16px] lg:pe-[96px]"
          : "ps-[16px] lg:ps-[96px]"
      }  `}
    >
      <h2
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        className={`text-[#000] text-[24px] font-[700] `}
      >
        {t("الوجهات الرائجة")}
      </h2>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        cssMode={true}
        pagination={window.innerWidth < 576}
        mousewheel={true}
        keyboard={true}
        modules={[Mousewheel, Pagination, Keyboard]}
        // pagination={{
        //   clickable: true,
        //   distance: 50, // تحديد مسافة البجنيشن هنا
        // }}
        // modules={[Pagination]}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        className={`mySwiper relative w-full md:h-[337px] sm:h-[200px] `}
        // navigation={true}
        // modules={[Navigation]}
        spaceBetween={window.innerWidth > 800 ? 24 : 12}
        slidesPerView={1}
        onSlideChange={() => {}}
      >
        {data.map((data) => (
          <SwiperSlide
            dir="rtl"
            className={`rounded-[16px] overflow-hidden`}
            key={`${data.id}----${Math.random()}`}
          >
            <PopularDestinationsCard {...data} />
          </SwiperSlide>
        ))}
        <div
          className="absolute  left-[6%]  hidden sm:block top-[40%] z-20  translate-[50%]  cursor-pointer "
          onClick={() => swiperRef.current?.slideNext()}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.30)",
              backdropFilter: "blur(5px)",
            }}
            className={`w-[48px] h-[48px] rounded-[48px] flex justify-center items-center rotate-180`}
          >
            <div className="rotate-180">{iconLeftSwiper}</div>
          </div>
        </div>
        <div
          className="absolute right-[0%]  hidden sm:block top-[40%] z-20  translate-[50%]  cursor-pointer "
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.30)",

              backdropFilter: "blur(5px)",
            }}
            className={`w-[48px] h-[48px] rounded-[48px] flex justify-center items-center `}
          >
            {iconRightSwiper}
          </div>
        </div>
      </Swiper>
    </section>
  );
}

export default PopularDestinations;
