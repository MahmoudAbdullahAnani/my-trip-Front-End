import axios from "axios";
import { useRecoilState } from "recoil";
import {
  dateSearchDestination,
  dateSearchOrigin,
  destinationSearch,
  textSearch,
} from "../data/RecoilState/FormHandling";
import { Autocomplete, TextField } from "@mui/material";
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
  const [, setLocationFrom] = useRecoilState(textSearch);
  const [, setDestinationSearchState] = useRecoilState(destinationSearch);
  console.log("origin", origin);
  console.log("destination", destination);

  return (
    <div
      className={`flex sm:gap-[24px] gap-[10px] sm:justify-normal justify-center  lg:flex-nowrap flex-wrap`}
    >
      <div className={`flex flex-col gap-[6px]`}>
        {/* Input Origin Air */}
        <h4 className={`text-[#000] text-[20px] font-[500] `}>المغادرة من</h4>
        <Autocomplete
          dir="rtl"
          disablePortal
          id="combo-box-demo"
          options={origin}
          className={``}
          onChange={
            ({ target }) =>
              setLocationFrom((target as HTMLInputElement)?.innerHTML)
            // console.log((target as HTMLInputElement)?.innerHTML)
          }
          renderInput={(params) => (
            <TextField
              {...params}
              className={`outline-none`}
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
                      ...obj,
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
              }}
            />
          )}
        />
      </div>
      <div className={`flex flex-col gap-[6px]`}>
        {/* Input destination Air */}
        <h4 className={`text-[#000] text-[20px] font-[500] `}>الوجهة</h4>

        <Autocomplete
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
              }}
            />
          )}
        />
      </div>
    </div>
  );
}

export default FieldSearchAirs;
