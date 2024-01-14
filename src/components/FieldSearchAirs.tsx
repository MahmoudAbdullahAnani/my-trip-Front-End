import axios from "axios";
import { useRecoilState } from "recoil";
import {
  dateSearchDestination,
  dateSearchOrigin,
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
  console.log("origin", origin);
  console.log("destination", destination);

  return (
    <div className={`flex flex-row-reverse gap-5 `}>
      {/* Input Origin Air */}
      <Autocomplete
        dir="rtl"
        disablePortal
        id="combo-box-demo"
        options={origin}
        className={``}
        renderInput={(params) => (
          <TextField
            {...params}
            className={`w-[188px] rounded-[8px] border-0 outline-0 text-[#117C99] text-[14px] font-[600]`}
            onChange={async (e) => {
              const dateSearch = await getData(
                "airportSearch",
                `term=${e.target.value}`
              );
              const newExampleData = dateSearch.data.map(
                (obj: { address: { cityName: string } }) => {
                  return { label: obj.address.cityName, ...obj };
                }
              );
              setDataSearchOriginState(newExampleData);
            }}
            sx={{
              width: "188px",
              direction: "rtl",
              boxShadow:
                "box-shadow: 0px 4px 15px 0px rgba(88, 168, 247, 0.25);",
              background: "#FFF",
              color: "#117C99",
            }}
          />
        )}
      />
      {/* Input destination Air */}
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={origin}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={async (e) => {
              const dateSearch = await getData(
                "airportSearch",
                `term=${e.target.value}`
              );
              const newExampleData = dateSearch.data.map(
                (obj: { address: { cityName: string } }) => {
                  return { label: obj.address.cityName, ...obj };
                }
              );
              setDataSearchDestinationState(newExampleData);
            }}
            className={`w-[188px] rounded-[8px] border-0 outline-0 text-[#117C99] text-[14px] font-[600]`}
            sx={{
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
  );
}

export default FieldSearchAirs;
