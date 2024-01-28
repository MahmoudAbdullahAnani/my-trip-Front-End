import PopularDestinationsCard from "./PopularDestinationsCard";
import exampleMainImage from "/public/assets/heroSection.jpeg";

import Slider from "react-slick";

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
];

function PopularDestinations() {
    const settings = {
      className: "center",
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 5,
      swipeToSlide: true,
      afterChange: function (index:number) {
        console.log(
          `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
        );
      },
    };
  return (
    <section className={`flex flex-col gap-[34px] mt-[107px] pe-[96px]`}>
      <h2 dir="rtl" className={`text-[#000] text-[24px] font-[700] `}>
        الوجهات الرائجة
      </h2>
      <Slider {...settings}  className={`flex gap-[24px]`}>
        {data.map((data) => (
          <PopularDestinationsCard
            {...data}
            key={`${data.id}----${Math.random()}`}
          />
        ))}
      </Slider>
    </section>
  );
}

export default PopularDestinations;
