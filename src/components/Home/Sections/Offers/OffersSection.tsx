import { useTranslation } from "react-i18next";
import OfferCard from "./OfferCard";

// Data
const OffersData = [
  {
    mainImg: "./../assets/Rectangle 27.png",
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
    mainImg: "./../assets/Rectangle 27.png",
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
    mainImg: "./../assets/Rectangle 27.png",
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
    mainImg: "./../assets/Rectangle 27.png",
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
    mainImg: "./../assets/Rectangle 27.png",
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
  }
];
function OffersSection() {
  // Lang
  const { t, i18n } = useTranslation();

  return (
    <section
      className={`flex flex-col gap-[34px]  mt-[100px]`}
    >
      <h2 dir={i18n.language === "ar" ? "rtl" : "ltr"} className={`text-[#000] text-[24px] font-[700] `} >
        {t("عروض")}
      </h2>
      <div
        className={`grid gap-[16px]  2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 justify-center items-center`}
      >
        {OffersData.map((item, index) => (
          <OfferCard {...item} key={`${index}---${Math.random()}`} />
        ))}
      </div>
    </section>
  );
}

export default OffersSection;
