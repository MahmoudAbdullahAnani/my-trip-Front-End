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
    <div className={`flex flex-col gap-5`}>
      {/* Input Origin Air */}
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={origin}
        className={``}
        renderInput={(params) => (
          <TextField
            {...params}
            className={``}
            label="Origin Location"
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
            sx={{}}
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
            label="Destination Location"
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
          />
        )}
      />
    </div>
  );
}

export default FieldSearchAirs;
