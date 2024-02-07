import BookingSteps from "../../components/Home/Sections/Search/Headers/BookingSteps";
import HeaderSearch from "../../components/Home/Sections/Search/Headers/HeaderSearch";

function AirPay() {
  return (
    <section className={``}>
      <HeaderSearch />
      <div className={`h-[104px] mb-[25px] lg:block hidden`}>
        <BookingSteps />
      </div>
      {/* Content Page airData */}
      <div
        className={`flex justify-center xl:flex-nowrap flex-wrap sm:px-[95.5px] px-[5px]  gap-[24px]`}
      >
        <div
          className={`2xl:w-[547px] bg-[#FFF] xl:w-[547px] w-[347px] h-[636px] rounded-[16px] `}
        ></div>
        <div className={`w-[718px] bg-[#FFF] rounded-[16px] `}></div>
      </div>
    </section>
  );
}

export default AirPay;
