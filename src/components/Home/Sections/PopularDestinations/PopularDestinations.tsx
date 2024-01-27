import PopularDestinationsCard from "./PopularDestinationsCard";

const data = [
  {
    id: 1,
    mainImage: "/public/assets/heroSection.jpeg",
    titleAR: "القاهرة",
    titleEN: "Egypt",
    link: "/",
  },
  {
    id: 2,
    mainImage: "/public/assets/heroSection.jpeg",
    titleAR: "القاهرة",
    titleEN: "Egypt",
    link: "/",
  },
  {
    id: 1,
    mainImage: "/public/assets/heroSection.jpeg",
    titleAR: "القاهرة",
    titleEN: "Egypt",
    link: "/",
  },
  {
    id: 1,
    mainImage: "/public/assets/heroSection.jpeg",
    titleAR: "القاهرة",
    titleEN: "Egypt",
    link: "/",
  },
];
function PopularDestinations() {
  return (
    <section
      className={`flex flex-col gap-[34px] mt-[107px]`}
    >
      <h2 dir="rtl" className={`text-[#000] text-[24px] font-[700] `}>
        الوجهات الرائجة
      </h2>
      <div className={`flex overflow-x-scroll gap-[24px]`}>
        {data.map((data) => (
          <PopularDestinationsCard {...data} key={`${data.id}----${Math.random()}`}/>
        ))}
      </div>
    </section>
  );
}

export default PopularDestinations;
