import React from "react";
// Images
import mainImage1 from "./../../../../public/assets/heroSection.jpeg";
function MoveBgHeroSection({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`lg:h-[100vh] h-[90vh]  w-full  top-0 flex  bg-red-[#b37948]  `}
    >
      <img
        className={` lg:h-[100vh] h-[calc(78vh)]  w-full top-0 lg:object-fill object-cover`}
        src={mainImage1}
        alt=""
      />
      <div
        className={`w-full h-full z-10 flex flex-col px-[16px] lg:px-[96px] absolute lg:justify-center lg:items-center  `}
      >
        {children}
      </div>
    </div>
  );
}

export default MoveBgHeroSection;
