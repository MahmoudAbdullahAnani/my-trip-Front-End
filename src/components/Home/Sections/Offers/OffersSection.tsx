import OfferCard from "./OfferCard";

// Data
const OffersData = [
  {
    mainImg: "./assets/Rectangle 27.png",
    title: "رحله الي مدينة ذهب",
    date: "Feb16,2024",
    price: 3000,
    detailDate: {
      from: "CAl",
      to: "DHB",
      timeFrom: "9:00",
      timeTo: "10:00",
      timeTaken: "1hr",
      airPortFrom: "CAI",
      airPortTo: "DHB",
      titleAirPortFrom: "مطار القاهرة الدولي",
      titleAirPortTo: "مطار ذهب الدولي",
      cityFrom: "القاهرة",
      cityTo: "ذهب",
    },
  },
  {
    mainImg: "./assets/Rectangle 27.png",
    title: "رحله الي مدينة ذهب",
    date: "Feb16,2024",
    price: 3000,
    detailDate: {
      from: "CAl",
      to: "DHB",
      timeFrom: "9:00",
      timeTo: "10:00",
      timeTaken: "1hr",
      airPortFrom: "CAI",
      airPortTo: "DHB",
      titleAirPortFrom: "مطار القاهرة الدولي",
      titleAirPortTo: "مطار ذهب الدولي",
      cityFrom: "القاهرة",
      cityTo: "ذهب",
    },
  },
  {
    mainImg: "./assets/Rectangle 27.png",
    title: "رحله الي مدينة ذهب",
    date: "Feb16,2024",
    price: 3000,
    detailDate: {
      from: "CAl",
      to: "DHB",
      timeFrom: "9:00",
      timeTo: "10:00",
      timeTaken: "1hr",
      airPortFrom: "CAI",
      airPortTo: "DHB",
      titleAirPortFrom: "مطار القاهرة الدولي",
      titleAirPortTo: "مطار ذهب الدولي",
      cityFrom: "القاهرة",
      cityTo: "ذهب",
    },
  },
  {
    mainImg: "./assets/Rectangle 27.png",
    title: "رحله الي مدينة ذهب",
    date: "Feb16,2024",
    price: 3000,
    detailDate: {
      from: "CAl",
      to: "DHB",
      timeFrom: "9:00",
      timeTo: "10:00",
      timeTaken: "1hr",
      airPortFrom: "CAI",
      airPortTo: "DHB",
      titleAirPortFrom: "مطار القاهرة الدولي",
      titleAirPortTo: "مطار ذهب الدولي",
      cityFrom: "القاهرة",
      cityTo: "ذهب",
    },
  },
];
function OffersSection() {
  return (
    <section
      className={`flex flex-col gap-[20px] px-[16px] lg:px-[96px] mt-[26px]`}
    >
      <h2 dir="rtl" className={`text-[#000] text-[20px] font-bold `}>
        عروض
      </h2>
      <div
        className={`grid gap-[16px] lg:grid-cols-2 grid-cols-1 justify-center items-center`}
      >
        {OffersData.map((item, index) => (
          <OfferCard {...item} key={index} />
        ))}
      </div>
    </section>
  );
}

export default OffersSection;
