import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const filterOptions = createFilterOptions({
  matchFrom: "any",
  stringify: (option: FilmOptionType) => option.iataCode,
});

export default function Filter() {
  return (
    <Autocomplete
      id="filter-demo"
      options={top100Films}
      getOptionLabel={(option) => option.iataCode}
      filterOptions={filterOptions}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Custom filter" />}
    />
  );
}

interface FilmOptionType {
  iataCode: string;
  type: string;
  subType: string;
  name: string;
  detailedName: string;
  id: string;
  self: {
    href: string;
    methods: string[];
  };
  timeZoneOffset: string;
  geoCode: {
    latitude: number;
    longitude: number;
  };
  address: {
    cityName: string;
    cityCode: string;
    countryName: string;
    countryCode: string;
    stateCode: string;
    regionCode: string;
  };
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  {
    type: "location",
    subType: "CITY",
    name: "CAIRO",
    detailedName: "CAIRO/IL/US",
    id: "CCIR",
    self: {
      href: "https://test.api.amadeus.com/v1/reference-data/locations/CCIR",
      methods: ["GET"],
    },
    timeZoneOffset: "-06:00",
    iataCode: "CIR",
    geoCode: {
      latitude: 37.0,
      longitude: -89.18,
    },
    address: {
      cityName: "CAIRO",
      cityCode: "CIR",
      countryName: "UNITED STATES OF AMERICA",
      countryCode: "US",
      stateCode: "IL",
      regionCode: "NAMER",
    },
  },
  {
    type: "location",
    subType: "AIRPORT",
    name: "CAIRO",
    detailedName: "CAIRO/IL/US",
    id: "ACIR",
    self: {
      href: "https://test.api.amadeus.com/v1/reference-data/locations/ACIR",
      methods: ["GET"],
    },
    timeZoneOffset: "-06:00",
    iataCode: "CIR",
    geoCode: {
      latitude: 37.0,
      longitude: -89.18,
    },
    address: {
      cityName: "CAIRO",
      cityCode: "CIR",
      countryName: "UNITED STATES OF AMERICA",
      countryCode: "US",
      stateCode: "IL",
      regionCode: "NAMER",
    },
  },
  {
    type: "location",
    subType: "CITY",
    name: "FORT RUCKER/OZARK",
    detailedName: "FORT RUCKER/OZARK/AL/US",
    id: "COZR",
    self: {
      href: "https://test.api.amadeus.com/v1/reference-data/locations/COZR",
      methods: ["GET"],
    },
    timeZoneOffset: "-06:00",
    iataCode: "OZR",
    geoCode: {
      latitude: 31.27806,
      longitude: -85.71583,
    },
    address: {
      cityName: "FORT RUCKER/OZARK",
      cityCode: "OZR",
      countryName: "UNITED STATES OF AMERICA",
      countryCode: "US",
      stateCode: "AL",
      regionCode: "NAMER",
    },
  },
  {
    type: "location",
    subType: "AIRPORT",
    name: "CAIRNS AAF",
    detailedName: "FORT RUCKER/OZARK/AL/US:CAIRNS",
    id: "AOZR",
    self: {
      href: "https://test.api.amadeus.com/v1/reference-data/locations/AOZR",
      methods: ["GET"],
    },
    timeZoneOffset: "-06:00",
    iataCode: "OZR",
    geoCode: {
      latitude: 31.27806,
      longitude: -85.71583,
    },
    address: {
      cityName: "FORT RUCKER/OZARK",
      cityCode: "OZR",
      countryName: "UNITED STATES OF AMERICA",
      countryCode: "US",
      stateCode: "AL",
      regionCode: "NAMER",
    },
  },
];
