import { useRecoilState } from "recoil";
import { typeTravel } from "../data/RecoilState/FormHandling";
// MUI
// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function TypeTravelComponent() {
  const [typeTravelState, setTypeTravelState] = useRecoilState(typeTravel);
  // console.log(typeTravelState);

  const handleChange = (e: SelectChangeEvent) => {
    if (e.target.value === "OneWay") {
      return setTypeTravelState(true);
    }
    return setTypeTravelState(false);
  };
  return (
    <>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={typeTravelState === true ? "OneWay" : "RoundTrip"}
        label="Type Travel"
        onChange={handleChange}
        className={`p-0 m-0`}
      >
        <MenuItem value={"OneWay"}>One-Way</MenuItem>
        <MenuItem value={"RoundTrip"}>Round-trip</MenuItem>
      </Select>
    </>
  );
}

export default TypeTravelComponent;
