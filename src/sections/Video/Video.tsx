import { useState } from "react";

import ModalVideo from "react-modal-video";
// import logo from "/public/assets/logoWhite.png";
import img1 from "/public/video/video.jpg";
import img2 from "/public/video/shape.svg";
import { useTranslation } from "react-i18next";
const Video = () => {
  const [isOpen, setOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <section className="relative z-[1]  px-[16px] lg:px-[96px] py-16 md:py-20 lg:py-28 bg-slate-200">
      <div className="container mx-auto" dir="rtl">
        <div className="container flex flex-col items-center  gap-3">
          <div
            className="wow fadeInUp max-w-[570px] mb-[100px] w-full mx-auto text-center"
            data-wow-delay=".1s"
          >
            <h2 className="mb-4 text-3xl font-[900] !leading-tight text-[#117C99] sm:text-4xl md:text-[48px]">
              {t("نبذة عن أجواء")}
            </h2>
            <p className="text-base !leading-relaxed text-[#000000] md:text-lg">
              {t("هذا الفيديو يوضح ما هي أجواء و عن المميزات التي تقدمها")}
            </p>
          </div>
        </div>
        <div className="-mx-4 flex flex-wrap ">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp mx-auto max-w-[770px] overflow-hidden rounded-lg"
              data-wow-delay=".15s"
            >
              <div className="relative aspect-[77/40] items-center justify-center">
                <img
                  src={img1}
                  alt="video image h-full "
                  style={{ width: "100%" }}
                />
                <div className="absolute top-0 right-0 flex h-full w-full items-center justify-center">
                  <button
                    onClick={() => setOpen(true)}
                    className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white bg-opacity-75 text-primary transition hover:bg-opacity-100"
                  >
                    <svg
                      width="16"
                      height="18"
                      viewBox="0 0 16 18"
                      className="fill-current"
                    >
                      <path d="M15.5 8.13397C16.1667 8.51888 16.1667 9.48112 15.5 9.86602L2 17.6603C1.33333 18.0452 0.499999 17.564 0.499999 16.7942L0.5 1.20577C0.5 0.43597 1.33333 -0.0451549 2 0.339745L15.5 8.13397Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <ModalVideo
          channel="youtube"
          isOpen={isOpen}
          videoId="EDcPgnWILHA"
          onClose={() => setOpen(false)}
          animationSpeed={500}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-[-1]">
        <img src={img2} alt="shape" className="w-full" />
      </div>
    </section>
  );
};

export default Video;
