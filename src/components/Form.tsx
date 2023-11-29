"use client";
import * as React from "react";
import querystring from "query-string";
import axios from "axios";

// Test fetching on Amadeus
// 1) fetch get token
// 2) fetch get example data

// x-www-form-urlencoded
const formData = querystring.stringify({
  client_id: import.meta.env.VITE_PUBLIC_CLIENT_ID,
  client_secret: import.meta.env.VITE_PUBLIC_CLIENT_SECRET,
  grant_type: import.meta.env.VITE_PUBLIC_GRANT_TYPE,
});

const api = import.meta.env.VITE_PUBLIC_API_TOKEN_ACCOUNT;
async function GetTokenAmadeus(): Promise<string> {
  const res = await axios.post(api, formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  console.log(res.data.access_token);
  return res.data.access_token;
}

// Type of Fetching
// const query = new URLSearch({
//   subType: "CITY,AIRPORT",
//   keyword: "CAI",
// });

const MainAPI = import.meta.env.VITE_PUBLIC_API;

async function FetchExampleData(token: string, route: string, query: string) {
  try {
    const res = await axios.get(`${MainAPI}/${route}?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log("error api", error);
  }
}

export default function Form() {
  const [dataLocations, setDataLocations] = React.useState([]);
  const [keyword, setKeyword] = React.useState("");
  const GetPlace = async () => {
    const token = await GetTokenAmadeus();

    const data = await FetchExampleData(
      token,
      "reference-data/locations",
      `subType=CITY,AIRPORT&keyword=${keyword}`
    );
    setDataLocations(data?.data);
  };
  const keywordRef = React.useRef(null);

  const [inputFocus, setInputFocus] = React.useState(false);

  return (
    <>
      <div className={`w-[200px]`}>
        <input
          ref={keywordRef}
          onBlur={() => {
            setInputFocus(false);
          }}
          onFocus={() => {
            setInputFocus(true);
          }}
          type="text"
          className={`bg-red-400 `}
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          onKeyDown={() => {
            // setKeyword("");
            if (keyword !== "") {
              return GetPlace();
            }
            return setDataLocations([]);
          }}
        />
        {dataLocations !== undefined || inputFocus ? (
          <div className={`flex flex-col bg-red-900 `}>
            {dataLocations.map(
              ({
                iataCode,
                address,
                name,
              }: {
                iataCode: string;
                address: { cityName: string };
                name: string;
              }) => (
                <button
                  onClick={() => {
                    setKeyword(
                      address?.cityName + ", " + name + " (" + iataCode + ")"
                    );
                    setDataLocations([]);
                  }}
                  key={`${iataCode}-${Math.random()}`}
                >
                  {address?.cityName + ", " + name + " (" + iataCode + ")"}
                </button>
              )
            )}
          </div>
        ) : null}
      </div>
    </>
  );
}
