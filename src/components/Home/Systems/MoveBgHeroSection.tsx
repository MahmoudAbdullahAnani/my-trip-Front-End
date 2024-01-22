import React from "react";
// Images
import mainImage1 from "./../../../../public/assets/heroSection.jpeg";
function MoveBgHeroSection({ children }: { children: React.ReactNode }) {
  return (
    <div className={`h-[100vh] absolute w-full top-0 flex  bg-red-[##b37948] `}>
      <img
        className={` h-[100vh] absolute w-full top-0  bg-red-[##b37948] lg:object-fill object-cover`}
        src={mainImage1}
        alt=""
      />
      <div className={`w-full h-full z-10 flex justify-center items-center  `}>
        {children}
      </div>
    </div>
  );
}

export default MoveBgHeroSection;
