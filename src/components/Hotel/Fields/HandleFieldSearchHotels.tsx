// State
import { useRef, useState } from "react";

// Icons
import { exitIcon } from "../../../assets/icons/home";
import { iconLocation } from "../../../assets/icons/home";

// Fetching
import { Combobox } from "@headlessui/react";
import axios from "axios";
import { useRecoilState } from "recoil";
import {
  fromSwitchData,
  originSearch,
} from "../../../data/RecoilState/FormHandling";
import { useTranslation } from "react-i18next";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

function HandleFieldSearchHotels() {
  const [people, setPeople] = useState([]);
  const getData = async (route: string, query: string) => {
    // console.log("loading Here.....");

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_PUBLIC_LIVE_AIRPORT_CITY}/${route}?${query}`,
        {
          cancelToken: source.token,
        }
      );
      // console.log("Data==> ", res.data.data);
      setPeople(res.data.data);
      return res.data;
    } catch (error) {
      console.log("error api airportSearch", error);
    }
  };
  const [selectedPerson, setSelectedPerson] = useState("");
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person: { address: { cityName: string } }) => {
          return person.address.cityName
            .toLowerCase()
            .includes(query.toLowerCase());
        });

  // const [defaultValue, setDefaultValue] = useState<
  //   string | number | readonly string[] | undefined
  // >("");
  const [fromSwitchDataState, setFromSwitchDataState] =
    useRecoilState(fromSwitchData);

  // console.log("defaultValue==> ", defaultValue);

  const [, setOriginSearchState] = useRecoilState(originSearch);
  const refFocus = useRef(null);
  // console.log(refFocus);

  // Lang
  const { t, i18n } = useTranslation();

  return (
    <div className="relative no-scrollbar sm:w-fit w-full">
      <Combobox value={selectedPerson} onChange={setSelectedPerson}>
        <div
          style={{ boxShadow: "0px 4px 15px 0px rgba(88, 168, 247, 0.25)" }}
          className={`bg-[#FFF] w-full sm:w-[188px] h-[48px] rounded-[8px] relative`}
        >
          <Combobox.Input
            ref={refFocus}
            dir={i18n.language !== "ar" ? "rtl" : "ltr"}
            placeholder={t("وجهتك")}
            type={"text"}
            onChange={async (event) => {
              await getData("airportSearch", `term=${event.target.value}`);
              // setValue(event.target.value);
              setQuery(event.target.value);
            }}
            className={`bg-[#FFF] w-full text-center z-50 shadow-lg focus:border border-[#117C99] focus:shadow-[#58a8f752] hover:shadow-[#58a8f752] duration-200 sm:w-[188px] h-[48px] rounded-[8px] sm:text-center sm:px-0 p-[10px] focus-visible:outline-none text-[#117C99] text-[14px] placeholder:text-[14px] font-[500] placeholder:font-[500]`}
          />
          {fromSwitchDataState && (
            <div
              className={`absolute top-0 flex justify-center items-center left-0 bg-[#FFF]  sm:w-[188px] w-full h-[48px] rounded-[8px]`}
            >
              <span
                onClick={() => setFromSwitchDataState("")}
                className={`absolute left-1 cursor-pointer`}
              >
                {exitIcon}
              </span>
              <span>
                {`...${
                  fromSwitchDataState
                    ?.toString()
                    .toLocaleLowerCase()
                    .split(",")[0]
                }`.length > 12
                  ? `${fromSwitchDataState
                      ?.toString()
                      .toLocaleLowerCase()
                      .split(",")[0]
                      .slice(0, 12)}`
                  : `${fromSwitchDataState
                      ?.toString()
                      .toLocaleLowerCase()
                      .split(",")[0][0]
                      .toLocaleUpperCase()}${fromSwitchDataState
                      ?.toString()
                      .toLocaleLowerCase()
                      .split(",")[0]
                      .slice(1)}`}
              </span>
            </div>
          )}

          <div
            // onClick={() => refFocus.current.focus()}
            className={`absolute top-[11.85px] right-[15px] block `}
          >
            <span>{iconLocation}</span>
          </div>
        </div>
        <Combobox.Options
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
          className={`bg-[#FFFFFF] rounded-lg pt-5 no-scrollbar border border-[#117C99] border-x-0 border-b-0 z-30 max-h-[200px] overflow-y-scroll px-3 no-scrollbar absolute lg:left-0  top-[88%] flex flex-col gap-3 `}
        >
          {filteredPeople.length <= 0 ? (
            <span
              className={`w-full sm:w-[188px] `}
              dir={i18n.language === "ar" ? "rtl" : "ltr"}
            >
              {t("لا يوجد نتائج...")}
            </span>
          ) : (
            filteredPeople.map(
              (person: {
                address: { cityName: string; countryCode: string };
                iataCode: string;
              }) => (
                <Combobox.Option
                  dir="ltr"
                  key={`${person.address.cityName} --- ${Math.random()}`}
                  value={person}
                  onClick={(e) => {
                    setFromSwitchDataState(
                      (e.target as HTMLInputElement)?.textContent ?? ""
                    );
                    setOriginSearchState(
                      (e.target as HTMLInputElement)?.textContent?.slice(
                        -4,
                        -1
                      ) ?? ""
                    );
                  }}
                  className={`flex justify-between cursor-pointer gap-2 whitespace-nowrap `}
                >
                  <span>
                    {`${person.address.cityName[0]}${person.address.cityName
                      .slice(1)
                      .toLowerCase()}`}
                    ,{` ${person.address.countryCode}`},
                    {` (${person.iataCode})`}
                  </span>
                  {/* <img
                  width={24}
                  height={24}
                  src={`https://flagsapi.com/${person.address.countryCode}/flat/64.png`}
                /> */}
                </Combobox.Option>
              )
            )
          )}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
export default HandleFieldSearchHotels;
