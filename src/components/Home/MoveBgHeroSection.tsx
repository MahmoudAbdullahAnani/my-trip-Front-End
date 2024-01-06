import React from "react";

function MoveBgHeroSection({ children }: { children: React.ReactNode }) {
  return (
    <div className={`h-[100vh] absolute w-full top-0 flex  bg-red-900 `}>
      <img
        className={` h-[100vh] absolute w-full top-0  bg-red-900 lg:object-fill object-cover`}
        src="/public/assets/heroSection.jpeg"
        alt=""
      />
      <div className={`w-full h-full z-10 flex justify-center items-center  `}>
        {children}
      </div>
    </div>
  );
}

export default MoveBgHeroSection;
