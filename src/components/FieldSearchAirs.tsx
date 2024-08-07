import axios from "axios";
import { useRecoilState } from "recoil";
import {
  dateSearchDestination,
  dateSearchOrigin,
  destinationSearch,
  originSearch,
} from "../data/RecoilState/FormHandling";
import { Autocomplete, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const getData = async (route: string, query: string) => {
  console.log("loading.....");

  try {
    const res = await axios.get(
      `https://live-airport-city-search.onrender.com/${route}?${query}`,
      {
        cancelToken: source.token,
      }
    );
    console.log("finish");

    return res.data;
  } catch (error) {
    console.log("error api", error);
    // console.log("typeOf error api", typeof error);
  }
};

function FieldSearchAirs() {
  const [origin, setDataSearchOriginState] = useRecoilState(dateSearchOrigin);
  const [destination, setDataSearchDestinationState] = useRecoilState(
    dateSearchDestination
  );
  const [, setLocationFrom] = useRecoilState(originSearch);
  const [, setDestinationSearchState] = useRecoilState(destinationSearch);
  // console.log("origin", origin);
  // console.log("destination", destination);

  // Lang
  const { t , i18n} = useTranslation();

  return (
    <div
      className={`flex sm:gap-[24px] gap-[10px] sm:justify-normal justify-center  lg:flex-nowrap flex-wrap`}
    >
      <div className={`peartAutocomplete flex flex-col gap-[6px]`}>
        {/* Input Origin Air */}
        <h4
          className={`text-[#000] text-[20px] font-[500] `}
          dir={i18n.language !== "ar" ? "rtl" : "ltr"}
        >
          {t("المغادرة من")}
        </h4>
        <Autocomplete
          freeSolo
          disablePortal
          dir="rtl"
          id="combo-box-demo"
          options={origin}
          className={`text-end`}
          onChange={
            ({ target }) =>
              setLocationFrom((target as HTMLInputElement)?.innerHTML)
            // console.log((target as HTMLInputElement)?.innerHTML)
          }
          renderInput={(params) => (
            <TextField
              {...params}
              className={`outline-none `}
              placeholder={t("المغادرة من...")}
              onChange={async (e) => {
                const dateSearch = await getData(
                  "airportSearch",
                  `term=${e.target.value}`
                );
                const newExampleData = dateSearch.data.map(
                  (obj: {
                    address: { cityName: string };
                    detailedName: string;
                    iataCode: string;
                  }) => {
                    // console.log(`${obj.detailedName}, ${obj.iataCode}`);

                    return {
                      label: `${obj.detailedName}, ${obj.iataCode}`,
                    };
                  }
                );
                setDataSearchOriginState(newExampleData);
              }}
              sx={{
                width: "188px",
                height: "48px",
                direction: "rtl",
                boxShadow:
                  "box-shadow: 0px 4px 15px 0px rgba(88, 168, 247, 0.25);",
                background: "#FFF",
                color: "#117C99",
                borderRadius: "8px",
              }}
            />
          )}
        />
      </div>
      <div className={`peartAutocomplete flex flex-col gap-[6px]`}>
        {/* Input destination Air */}
        <h4 className={`text-[#000] text-[20px] font-[500] `}>الوجهة</h4>

        <Autocomplete
          freeSolo
          disablePortal
          id="combo-box-demo"
          options={destination}
          className={``}
          onChange={({ target }) =>
            setDestinationSearchState((target as HTMLInputElement)?.innerHTML)
          }
          sx={{}}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={async (e) => {
                const dateSearch = await getData(
                  "airportSearch",
                  `term=${e.target.value}`
                );
                const newExampleData = dateSearch.data.map(
                  (obj: {
                    address: { cityName: string };
                    detailedName: string;
                    iataCode: string;
                  }) => {
                    return {
                      label: `${obj.detailedName}, ${obj.iataCode}`,
                      ...obj,
                    };
                  }
                );
                setDataSearchDestinationState(newExampleData);
              }}
              className={``}
              sx={{
                height: "48px",

                width: "188px",
                direction: "rtl",
                boxShadow:
                  "box-shadow: 0px 4px 15px 0px rgba(88, 168, 247, 0.25);",
                background: "#FFF",
                borderRadius: "8px",
              }}
            />
          )}
        />
      </div>
    </div>
  );
}

export default FieldSearchAirs;
