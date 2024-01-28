import PopularDestinationsCard from "./PopularDestinationsCard";
import exampleMainImage from "/public/assets/heroSection.jpeg";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";

const data = [
  {
    id: 1,
    mainImage: exampleMainImage,
    titleAR: "القاهرة",
    titleEN: "Egypt",
    link: "/",
  },
  {
    id: 2,
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
  return (
    <section
      className={`flex flex-col gap-[34px] mt-[107px] lg:pe-[96px] pe-[16px]`}
    >
      <h2 dir="rtl" className={`text-[#000] text-[24px] font-[700] `}>
        الوجهات الرائجة
      </h2>
      <Swiper
        dir="rtl"
        className={`mySwiper w-full md:h-[337px] sm:h-[200px] `}
        navigation={true}
        modules={[Navigation]}
        spaceBetween={24}
        slidesPerView={3.3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
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
      </Swiper>
    </section>
  );
}

export default PopularDestinations;
