import PopularDestinationsCard from "./PopularDestinationsCard";
import exampleMainImage from "/public/assets/heroSection.jpeg";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { Mousewheel, Pagination, Keyboard } from "swiper/modules";
import { useRef } from "react";
import SwiperType from "swiper";
import { iconLeftSwiper, iconRightSwiper } from "../../../../assets/icons/home";
import { useTranslation } from "react-i18next";

const data = [
  {
    id: 1,
    mainImage: exampleMainImage,
    titleAR: "مصر",
    titleEN: "Egypt",
    link: "/",
  },
  {
    id: 2,
    mainImage: exampleMainImage,
    titleAR: "مكة",
    titleEN: "Macca",
    link: "/",
  },
  {
    id: 1,
    mainImage: exampleMainImage,
    titleAR: "المغرب",
    titleEN: "Morocco",
    link: "/",
  },
  {
    id: 1,
    mainImage: exampleMainImage,
    titleAR: "القاهرة",
    titleEN: "Egypt",
    link: "/",
  },
  {
    id: 1,
    mainImage: exampleMainImage,
    titleAR: "القاهرة",
    titleEN: "Egypt",
    link: "/",
  },
  {
    id: 1,
    mainImage: exampleMainImage,
    titleAR: "القاهرة",
    titleEN: "Egypt",
    link: "/",
  },
  {
    id: 1,
    mainImage: exampleMainImage,
    titleAR: "القاهرة",
    titleEN: "Egypt",
    link: "/",
  },
];

function PopularDestinations() {
  // console.log(window.innerWidth);
  const swiperRef = useRef<SwiperType | null>(null);

  // Lang
  const { t, i18n } = useTranslation();

  return (
    <section
      className={`flex flex-col gap-[34px] mt-[107px] ${
        i18n.language === "ar"
          ? "lg:pe-[96px] pe-[16px]"
          : "lg:ps-[96px] ps-[16px]"
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
