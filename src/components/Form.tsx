"use client";
import * as React from "react";
// import querystring from "query-string";
import axios, { AxiosError } from "axios";

// Test fetching on Amadeus
// 1) fetch get token
// 2) fetch get example data

// x-www-form-urlencoded
// const formData = querystring.stringify({
//   client_id: import.meta.env.VITE_PUBLIC_CLIENT_ID,
//   client_secret: import.meta.env.VITE_PUBLIC_CLIENT_SECRET,
//   grant_type: import.meta.env.VITE_PUBLIC_GRANT_TYPE,
// });

// const api = import.meta.env.VITE_PUBLIC_API_TOKEN_ACCOUNT;
// async function GetTokenAmadeus(): Promise<string> {
//   const res = await axios.post(api, formData, {
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//   });
//   // console.log(res.data.access_token);
//   return res.data.access_token;
// }

// Type of Fetching
// const query = new URLSearch({
//   subType: "CITY,AIRPORT",
//   keyword: "CAI",
// });

// const MainAPI = import.meta.env.VITE_PUBLIC_API;
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import {
  destinationSearch,
  textSearch,
} from "../data/RecoilState/FormHandling";

// async function FetchExampleData(token: string, route: string, query: string) {
//   try {
//     const res = await axios.get(`${MainAPI}/${route}?${query}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return res.data;
//   } catch (error) {
//     // console.log("error api", error);
//     // console.log("typeOf error api", typeof error);
//   }
// }
// Test Error lode fetching
async function FetchExampleData(route: string, query: string) {
  try {
    const res = await axios.get(
      `https://live-airport-city-search.onrender.com/${route}?${query}`
    );
    return res.data;
  } catch (error) {
    // console.log("error api", error);
    // console.log("typeOf error api", typeof error);
  }
}

export default function Form({ isOrigin }: { isOrigin: boolean }) {
  const [dataLocations, setDataLocations] = React.useState([]);
  const [keyword, setKeyword] = useRecoilState(
    isOrigin ? textSearch : destinationSearch
  );

  // const GetPlace = async () => {
  //   const token = await GetTokenAmadeus();
  //   try {
  //     await FetchExampleData(
  //       token,
  //       "reference-data/locations",
  //       `subType=CITY,AIRPORT&keyword=${keyword}`
  //     ).then((data) => {
  //       setDataLocations(data?.data);
  //     });
  //   } catch (err) {
  //     const errorResponse = err as AxiosError<{ errors: [string] }>;
  //     return toast.error(errorResponse?.response?.data?.errors[0], {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //   }
  // };
  // Test Lode Fetching locale
  const GetPlace = async () => {
    // const token = await GetTokenAmadeus();
    try {
      await FetchExampleData("airportSearch", `term=${keyword}`).then(
        ({ data }) => {
          console.log(data);

          setDataLocations(data);
        }
      );
    } catch (err) {
      console.log(err);

      const errorResponse = err as AxiosError<{ errors: [string] }>;
      return toast.error(errorResponse?.response?.data?.errors[0], {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const keywordRef = React.useRef(null);
  document.addEventListener("click", () => {
    setDataLocations([]);
  });
  return (
    <>
      <div className={`w-full`}>
        <input
          ref={keywordRef}
          type="text"
          className={`bg-red-400 w-full border`}
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          onKeyUp={() => {
            // console.log("stop-typing", keyword);

            setTimeout(() => {
              if (keyword !== "") {
                return GetPlace();
              }
              return setDataLocations([]);
            }, 300);
          }}
        />
        {dataLocations !== undefined ? (
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
                  {address?.cityName + ", " + name}
                </button>
              )
            )}
          </div>
        ) : null}
      </div>
    </>
  );
}
