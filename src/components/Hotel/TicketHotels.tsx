import { useTranslation } from "react-i18next";

interface HotelData {
  chainCode: string;
  iataCode: string;
  dupeId: number;
  name: string;
  hotelId: string;
  geoCode: {
    latitude: number;
    longitude: number;
  };
  address: {
    countryCode: string;
  };
  lastUpdate: string;
}
import "leaflet/dist/leaflet.css";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { capitalizeFirstLetter } from "../../pages/Hotels/SearchHotels";

function TicketHotels(data: HotelData) {
  const { t, i18n } = useTranslation();
  // const center = [data.geoCode.latitude, data.geoCode.longitude];
  const nameHotel = data.name.toLowerCase();
  return (
    <div
      className={`mx-auto w-full p-3 flex lg:flex-row flex-col lg:items-start items-end justify-between gap-5 bg-white border cursor-pointer hover:shadow-md shadow-[#D9D9D9] duration-300 rounded-lg overflow-hidden`}
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <div>
        {/* <MapContainer
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          center={center}
          zoom={13}
          style={{ height: "100", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[data.geoCode.latitude, data.geoCode.longitude]}>
            <Popup>{data.name}</Popup>
          </Marker>
        </MapContainer> */}
        <iframe
          style={{ border: "0" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          // width={"100%"}
          // height={"100%"}
          className={`rounded-lg`}
          src={`https://maps.google.com/maps?q=${data.geoCode.latitude},${data.geoCode.longitude}&output=embed`}
        ></iframe>
      </div>
      <div
        className={`flex flex-col items-${
          i18n.language === "ar" ? "end" : "start"
        } justify-center`}
      >
        <div className={`flex items-center justify-center gap-2`}>
          <p>{t("اسم الفندق")}</p>
          <p>{capitalizeFirstLetter(nameHotel)}</p>
        </div>

        <div className={`flex items-center justify-center gap-2`}>
          <span>
            <img
              src={`https://flagsapi.com/${data.address.countryCode}/flat/32.png`}
              alt={data.address.countryCode}
            />
          </span>
          <p>{data.address.countryCode}</p>
        </div>
        <div
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
          className={`flex items-center justify-center gap-2`}
        >
          <p>{t("اخر تحديث")}</p>
          <p>{data.lastUpdate}</p>
        </div>
        <div
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
          className={`flex items-center justify-center gap-2`}
        >
          <p>{t("كود الفندق")}</p>
          <p>{data.hotelId}</p>
        </div>

        {/* <p>{data.dupeId}</p>
        <p>{data.iataCode}</p>
        <p>{data.chainCode}</p> */}
      </div>
    </div>
  );
}
export default TicketHotels;

/*

  
*/
