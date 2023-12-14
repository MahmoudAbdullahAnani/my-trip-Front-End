import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useRecoilState } from "recoil";
import { dateSearchOrigin } from "../data/RecoilState/FormHandling";

export default function AutoComplete() {
  const [dataAirState] = useRecoilState(dateSearchOrigin);
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={dataAirState}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

