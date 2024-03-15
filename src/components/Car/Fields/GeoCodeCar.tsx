import { useTranslation } from "react-i18next";
import ExternalStateExample from "./ExternalStateExample";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { GeoLocation } from "../../../data/RecoilState/car/MainDataCar";
import Modal from "@mui/material/Modal";
function GeoCodeCar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t, i18n } = useTranslation();
  const [, setGeo] = useRecoilState(GeoLocation);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      setGeo({
        lat,
        long,
      });
    });
  }, []);

  return (
    <>
      <div
        dir={i18n.language !== "ar" ? "rtl" : "ltr"}
        className={`flex flex-col gap-[6.15px] justify-start items-end `}
      >
        <h4
          onClick={handleOpen}
          className={`text-[#000]  text-[20px] font-[500] hidden sm:block `}
        >
          {t("الخريطة")}
        </h4>
        <button
          onClick={handleOpen}
          className={`bg-[#FFF] w-full text-center z-50 shadow-lg focus:border border-[#117C99] focus:shadow-[#58a8f752] hover:shadow-[#58a8f752] duration-200 sm:w-[188px] h-[48px] rounded-[8px] sm:text-center sm:px-0 p-[10px] focus-visible:outline-none text-[#117C99] text-[14px] placeholder:text-[14px] font-[500] placeholder:font-[500]`}
        >
          {t("فتح الخريطة")}
        </button>
      </div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <div
          className={`absolute overflow-scroll bg-white rounded-xl w-[80%] h-[80%] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]`}
        >
          {open && <ExternalStateExample />}
        </div>
      </Modal>
    </>
  );
}

export default GeoCodeCar;
