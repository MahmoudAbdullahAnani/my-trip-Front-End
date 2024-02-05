// React
import { useEffect } from "react";
// react-router-dom
import { useNavigate } from "react-router-dom";
// Data
import { useRecoilState } from "recoil";

import {
  dateGo,
  dateReturn,
  destinationSearch,
  originSearch,
  typeTravel,
} from "../../data/RecoilState/FormHandling";
import {
  adultsData,
  // childrenData,
  // levelTravelData,
  // youthsData,
} from "../../data/RecoilState/FormSearchData";

// Fetching Data
import axios from "axios";
import { getTokenForAmadeus } from "../../Keys/GetTokenForAmadeus";
// import { Loder } from "../components/loder/Loder";
import {
  ReSearch,
  TypeSystemSearch,
} from "../../data/RecoilState/Search/TypeSystemSearch";

import TicketLoading from "../../components/loder/TicketLoading";
import HeaderSearch from "../../components/Home/Sections/Search/Headers/HeaderSearch";
import {
  LoadingDataSearch,
  MainData,
  MaxPrice,
  MinPrice,
  PriceFilter,
  TripDataFilters,
} from "../../data/RecoilState/Search/MainData";
import TicketsMapped from "../../components/Home/Sections/Search/TicketsMapped";
import BookingSteps from "../../components/Home/Sections/Search/Headers/BookingSteps";
import FiltersAir from "../../components/Home/Sections/Search/Headers/FiltersAir";
// import { GetCurrencyPricesData } from "../data/Fetching/GetCurrencyPricesData";
import { StoreCurrency } from "../../data/Fetching/StoreCurrency";
// const exampleData = [
//   {
//     type: "flight-offer",
//     id: "1",
//     source: "GDS",
//     instantTicketingRequired: false,
//     nonHomogeneous: false,
//     oneWay: false,
//     lastTicketingDate: "2024-01-27",
//     lastTicketingDateTime: "2024-01-27",
//     numberOfBookableSeats: 7,
//     itineraries: [
//       {
//         duration: "PT5H10M",
//         segments: [
//           {
//             departure: {
//               iataCode: "CAI",
//               terminal: "2",
//               at: "2024-01-27T21:00:00",
//             },
//             arrival: {
//               iataCode: "BAH",
//               at: "2024-01-28T00:50:00",
//             },
//             carrierCode: "GF",
//             number: "80",
//             aircraft: {
//               code: "789",
//             },
//             operating: {
//               carrierCode: "GF",
//             },
//             duration: "PT2H50M",
//             id: "10",
//             numberOfStops: 0,
//             blacklistedInEU: false,
//           },
//           {
//             departure: {
//               iataCode: "BAH",
//               at: "2024-01-28T01:55:00",
//             },
//             arrival: {
//               iataCode: "DXB",
//               terminal: "1",
//               at: "2024-01-28T04:10:00",
//             },
//             carrierCode: "GF",
//             number: "500",
//             aircraft: {
//               code: "320",
//             },
//             operating: {
//               carrierCode: "GF",
//             },
//             duration: "PT1H15M",
//             id: "11",
//             numberOfStops: 0,
//             blacklistedInEU: false,
//           },
//         ],
//       },
//     ],
//     price: {
//       currency: "EUR",
//       total: "207.01",
//       base: "61.00",
//       fees: [
//         {
//           amount: "0.00",
//           type: "SUPPLIER",
//         },
//         {
//           amount: "0.00",
//           type: "TICKETING",
//         },
//       ],
//       grandTotal: "207.01",
//     },
//     pricingOptions: {
//       fareType: ["PUBLISHED"],
//       includedCheckedBagsOnly: true,
//     },
//     validatingAirlineCodes: ["GF"],
//     travelerPricings: [
//       {
//         travelerId: "1",
//         fareOption: "STANDARD",
//         travelerType: "ADULT",
//         price: {
//           currency: "EUR",
//           total: "207.01",
//           base: "61.00",
//         },
//         fareDetailsBySegment: [
//           {
//             segmentId: "10",
//             cabin: "ECONOMY",
//             fareBasis: "WDLIT4EG",
//             brandedFare: "ECOLITE",
//             brandedFareLabel: "ECONOMY LIGHT",
//             class: "W",
//             includedCheckedBags: {
//               quantity: 2,
//             },
//             amenities: [
//               {
//                 description: "STANDARD SEAT",
//                 isChargeable: true,
//                 amenityType: "PRE_RESERVED_SEAT",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "MEALS AND BEVERAGES",
//                 isChargeable: false,
//                 amenityType: "MEAL",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "EXTRA LEGROOM SEATS",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "REFUNDABLE TICKET",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "CHANGEABLE TICKET",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "PREFERRED SEATS",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "50 PERCENT MILES EARNED",
//                 isChargeable: false,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//             ],
//           },
//           {
//             segmentId: "11",
//             cabin: "ECONOMY",
//             fareBasis: "WDLIT4EG",
//             brandedFare: "ECOLITE",
//             brandedFareLabel: "ECONOMY LIGHT",
//             class: "W",
//             includedCheckedBags: {
//               quantity: 2,
//             },
//             amenities: [
//               {
//                 description: "STANDARD SEAT",
//                 isChargeable: true,
//                 amenityType: "PRE_RESERVED_SEAT",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "MEALS AND BEVERAGES",
//                 isChargeable: false,
//                 amenityType: "MEAL",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "EXTRA LEGROOM SEATS",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "REFUNDABLE TICKET",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "CHANGEABLE TICKET",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "PREFERRED SEATS",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "50 PERCENT MILES EARNED",
//                 isChargeable: false,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     type: "flight-offer",
//     id: "1",
//     source: "GDS",
//     instantTicketingRequired: false,
//     nonHomogeneous: false,
//     oneWay: false,
//     lastTicketingDate: "2024-01-27",
//     lastTicketingDateTime: "2024-01-27",
//     numberOfBookableSeats: 7,
//     itineraries: [
//       {
//         duration: "PT5H10M",
//         segments: [
//           {
//             departure: {
//               iataCode: "CAI",
//               terminal: "2",
//               at: "2024-01-27T21:00:00",
//             },
//             arrival: {
//               iataCode: "BAH",
//               at: "2024-01-28T00:50:00",
//             },
//             carrierCode: "GF",
//             number: "80",
//             aircraft: {
//               code: "789",
//             },
//             operating: {
//               carrierCode: "GF",
//             },
//             duration: "PT2H50M",
//             id: "10",
//             numberOfStops: 1,
//             blacklistedInEU: false,
//           },
//           {
//             departure: {
//               iataCode: "BAH",
//               at: "2024-01-28T01:55:00",
//             },
//             arrival: {
//               iataCode: "DXB",
//               terminal: "1",
//               at: "2024-01-28T04:10:00",
//             },
//             carrierCode: "GF",
//             number: "500",
//             aircraft: {
//               code: "320",
//             },
//             operating: {
//               carrierCode: "GF",
//             },
//             duration: "PT1H15M",
//             id: "11",
//             numberOfStops: 0,
//             blacklistedInEU: false,
//           },
//         ],
//       },
//     ],
//     price: {
//       currency: "EUR",
//       total: "307.01",
//       base: "61.00",
//       fees: [
//         {
//           amount: "0.00",
//           type: "SUPPLIER",
//         },
//         {
//           amount: "0.00",
//           type: "TICKETING",
//         },
//       ],
//       grandTotal: "207.01",
//     },
//     pricingOptions: {
//       fareType: ["PUBLISHED"],
//       includedCheckedBagsOnly: true,
//     },
//     validatingAirlineCodes: ["GF"],
//     travelerPricings: [
//       {
//         travelerId: "1",
//         fareOption: "STANDARD",
//         travelerType: "ADULT",
//         price: {
//           currency: "EUR",
//           total: "207.01",
//           base: "61.00",
//         },
//         fareDetailsBySegment: [
//           {
//             segmentId: "10",
//             cabin: "ECONOMY",
//             fareBasis: "WDLIT4EG",
//             brandedFare: "ECOLITE",
//             brandedFareLabel: "ECONOMY LIGHT",
//             class: "W",
//             includedCheckedBags: {
//               quantity: 2,
//             },
//             amenities: [
//               {
//                 description: "STANDARD SEAT",
//                 isChargeable: true,
//                 amenityType: "PRE_RESERVED_SEAT",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "MEALS AND BEVERAGES",
//                 isChargeable: false,
//                 amenityType: "MEAL",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "EXTRA LEGROOM SEATS",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "REFUNDABLE TICKET",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "CHANGEABLE TICKET",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "PREFERRED SEATS",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "50 PERCENT MILES EARNED",
//                 isChargeable: false,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//             ],
//           },
//           {
//             segmentId: "11",
//             cabin: "ECONOMY",
//             fareBasis: "WDLIT4EG",
//             brandedFare: "ECOLITE",
//             brandedFareLabel: "ECONOMY LIGHT",
//             class: "W",
//             includedCheckedBags: {
//               quantity: 2,
//             },
//             amenities: [
//               {
//                 description: "STANDARD SEAT",
//                 isChargeable: true,
//                 amenityType: "PRE_RESERVED_SEAT",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "MEALS AND BEVERAGES",
//                 isChargeable: false,
//                 amenityType: "MEAL",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "EXTRA LEGROOM SEATS",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "REFUNDABLE TICKET",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "CHANGEABLE TICKET",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "PREFERRED SEATS",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "50 PERCENT MILES EARNED",
//                 isChargeable: false,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     type: "flight-offer",
//     id: "1",
//     source: "GDS",
//     instantTicketingRequired: false,
//     nonHomogeneous: false,
//     oneWay: false,
//     lastTicketingDate: "2024-01-27",
//     lastTicketingDateTime: "2024-01-27",
//     numberOfBookableSeats: 7,
//     itineraries: [
//       {
//         duration: "PT5H10M",
//         segments: [
//           {
//             departure: {
//               iataCode: "CAI",
//               terminal: "2",
//               at: "2024-01-27T21:00:00",
//             },
//             arrival: {
//               iataCode: "BAH",
//               at: "2024-01-28T00:50:00",
//             },
//             carrierCode: "GF",
//             number: "80",
//             aircraft: {
//               code: "789",
//             },
//             operating: {
//               carrierCode: "GF",
//             },
//             duration: "PT2H50M",
//             id: "10",
//             numberOfStops: 1,
//             blacklistedInEU: false,
//           },
//           {
//             departure: {
//               iataCode: "BAH",
//               at: "2024-01-28T01:55:00",
//             },
//             arrival: {
//               iataCode: "DXB",
//               terminal: "1",
//               at: "2024-01-28T04:10:00",
//             },
//             carrierCode: "GF",
//             number: "500",
//             aircraft: {
//               code: "320",
//             },
//             operating: {
//               carrierCode: "GF",
//             },
//             duration: "PT1H15M",
//             id: "11",
//             numberOfStops: 0,
//             blacklistedInEU: false,
//           },
//         ],
//       },
//     ],
//     price: {
//       currency: "EUR",
//       total: "307.01",
//       base: "61.00",
//       fees: [
//         {
//           amount: "0.00",
//           type: "SUPPLIER",
//         },
//         {
//           amount: "0.00",
//           type: "TICKETING",
//         },
//       ],
//       grandTotal: "207.01",
//     },
//     pricingOptions: {
//       fareType: ["PUBLISHED"],
//       includedCheckedBagsOnly: true,
//     },
//     validatingAirlineCodes: ["GF"],
//     travelerPricings: [
//       {
//         travelerId: "1",
//         fareOption: "STANDARD",
//         travelerType: "ADULT",
//         price: {
//           currency: "EUR",
//           total: "207.01",
//           base: "61.00",
//         },
//         fareDetailsBySegment: [
//           {
//             segmentId: "10",
//             cabin: "ECONOMY",
//             fareBasis: "WDLIT4EG",
//             brandedFare: "ECOLITE",
//             brandedFareLabel: "ECONOMY LIGHT",
//             class: "W",
//             includedCheckedBags: {
//               quantity: 2,
//             },
//             amenities: [
//               {
//                 description: "STANDARD SEAT",
//                 isChargeable: true,
//                 amenityType: "PRE_RESERVED_SEAT",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "MEALS AND BEVERAGES",
//                 isChargeable: false,
//                 amenityType: "MEAL",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "EXTRA LEGROOM SEATS",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "REFUNDABLE TICKET",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "CHANGEABLE TICKET",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "PREFERRED SEATS",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "50 PERCENT MILES EARNED",
//                 isChargeable: false,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//             ],
//           },
//           {
//             segmentId: "11",
//             cabin: "ECONOMY",
//             fareBasis: "WDLIT4EG",
//             brandedFare: "ECOLITE",
//             brandedFareLabel: "ECONOMY LIGHT",
//             class: "W",
//             includedCheckedBags: {
//               quantity: 2,
//             },
//             amenities: [
//               {
//                 description: "STANDARD SEAT",
//                 isChargeable: true,
//                 amenityType: "PRE_RESERVED_SEAT",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "MEALS AND BEVERAGES",
//                 isChargeable: false,
//                 amenityType: "MEAL",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "EXTRA LEGROOM SEATS",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "REFUNDABLE TICKET",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "CHANGEABLE TICKET",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "PREFERRED SEATS",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "50 PERCENT MILES EARNED",
//                 isChargeable: false,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     type: "flight-offer",
//     id: "1",
//     source: "GDS",
//     instantTicketingRequired: false,
//     nonHomogeneous: false,
//     oneWay: false,
//     lastTicketingDate: "2024-01-27",
//     lastTicketingDateTime: "2024-01-27",
//     numberOfBookableSeats: 7,
//     itineraries: [
//       {
//         duration: "PT5H10M",
//         segments: [
//           {
//             departure: {
//               iataCode: "CAI",
//               terminal: "2",
//               at: "2024-01-27T21:00:00",
//             },
//             arrival: {
//               iataCode: "BAH",
//               at: "2024-01-28T00:50:00",
//             },
//             carrierCode: "GF",
//             number: "80",
//             aircraft: {
//               code: "789",
//             },
//             operating: {
//               carrierCode: "GF",
//             },
//             duration: "PT2H50M",
//             id: "10",
//             numberOfStops: 2,
//             blacklistedInEU: false,
//           },
//           {
//             departure: {
//               iataCode: "BAH",
//               at: "2024-01-28T01:55:00",
//             },
//             arrival: {
//               iataCode: "DXB",
//               terminal: "1",
//               at: "2024-01-28T04:10:00",
//             },
//             carrierCode: "GF",
//             number: "500",
//             aircraft: {
//               code: "320",
//             },
//             operating: {
//               carrierCode: "GF",
//             },
//             duration: "PT1H15M",
//             id: "11",
//             numberOfStops: 3,
//             blacklistedInEU: false,
//           },
//         ],
//       },
//     ],
//     price: {
//       currency: "EUR",
//       total: "407.01",
//       base: "61.00",
//       fees: [
//         {
//           amount: "0.00",
//           type: "SUPPLIER",
//         },
//         {
//           amount: "0.00",
//           type: "TICKETING",
//         },
//       ],
//       grandTotal: "207.01",
//     },
//     pricingOptions: {
//       fareType: ["PUBLISHED"],
//       includedCheckedBagsOnly: true,
//     },
//     validatingAirlineCodes: ["GF"],
//     travelerPricings: [
//       {
//         travelerId: "1",
//         fareOption: "STANDARD",
//         travelerType: "ADULT",
//         price: {
//           currency: "EUR",
//           total: "207.01",
//           base: "61.00",
//         },
//         fareDetailsBySegment: [
//           {
//             segmentId: "10",
//             cabin: "ECONOMY",
//             fareBasis: "WDLIT4EG",
//             brandedFare: "ECOLITE",
//             brandedFareLabel: "ECONOMY LIGHT",
//             class: "W",
//             includedCheckedBags: {
//               quantity: 2,
//             },
//             amenities: [
//               {
//                 description: "STANDARD SEAT",
//                 isChargeable: true,
//                 amenityType: "PRE_RESERVED_SEAT",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "MEALS AND BEVERAGES",
//                 isChargeable: false,
//                 amenityType: "MEAL",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "EXTRA LEGROOM SEATS",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "REFUNDABLE TICKET",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "CHANGEABLE TICKET",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "PREFERRED SEATS",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "50 PERCENT MILES EARNED",
//                 isChargeable: false,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//             ],
//           },
//           {
//             segmentId: "11",
//             cabin: "ECONOMY",
//             fareBasis: "WDLIT4EG",
//             brandedFare: "ECOLITE",
//             brandedFareLabel: "ECONOMY LIGHT",
//             class: "W",
//             includedCheckedBags: {
//               quantity: 2,
//             },
//             amenities: [
//               {
//                 description: "STANDARD SEAT",
//                 isChargeable: true,
//                 amenityType: "PRE_RESERVED_SEAT",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "MEALS AND BEVERAGES",
//                 isChargeable: false,
//                 amenityType: "MEAL",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "EXTRA LEGROOM SEATS",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "REFUNDABLE TICKET",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "CHANGEABLE TICKET",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "PREFERRED SEATS",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "50 PERCENT MILES EARNED",
//                 isChargeable: false,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     type: "flight-offer",
//     id: "1",
//     source: "GDS",
//     instantTicketingRequired: false,
//     nonHomogeneous: false,
//     oneWay: false,
//     lastTicketingDate: "2024-01-27",
//     lastTicketingDateTime: "2024-01-27",
//     numberOfBookableSeats: 7,
//     itineraries: [
//       {
//         duration: "PT5H10M",
//         segments: [
//           {
//             departure: {
//               iataCode: "CAI",
//               terminal: "2",
//               at: "2024-01-27T21:00:00",
//             },
//             arrival: {
//               iataCode: "BAH",
//               at: "2024-01-28T00:50:00",
//             },
//             carrierCode: "GF",
//             number: "80",
//             aircraft: {
//               code: "789",
//             },
//             operating: {
//               carrierCode: "GF",
//             },
//             duration: "PT2H50M",
//             id: "10",
//             numberOfStops: 2,
//             blacklistedInEU: false,
//           },
//           {
//             departure: {
//               iataCode: "BAH",
//               at: "2024-01-28T01:55:00",
//             },
//             arrival: {
//               iataCode: "DXB",
//               terminal: "1",
//               at: "2024-01-28T04:10:00",
//             },
//             carrierCode: "GF",
//             number: "500",
//             aircraft: {
//               code: "320",
//             },
//             operating: {
//               carrierCode: "GF",
//             },
//             duration: "PT1H15M",
//             id: "11",
//             numberOfStops: 3,
//             blacklistedInEU: false,
//           },
//         ],
//       },
//     ],
//     price: {
//       currency: "EUR",
//       total: "407.01",
//       base: "61.00",
//       fees: [
//         {
//           amount: "0.00",
//           type: "SUPPLIER",
//         },
//         {
//           amount: "0.00",
//           type: "TICKETING",
//         },
//       ],
//       grandTotal: "207.01",
//     },
//     pricingOptions: {
//       fareType: ["PUBLISHED"],
//       includedCheckedBagsOnly: true,
//     },
//     validatingAirlineCodes: ["GF"],
//     travelerPricings: [
//       {
//         travelerId: "1",
//         fareOption: "STANDARD",
//         travelerType: "ADULT",
//         price: {
//           currency: "EUR",
//           total: "207.01",
//           base: "61.00",
//         },
//         fareDetailsBySegment: [
//           {
//             segmentId: "10",
//             cabin: "ECONOMY",
//             fareBasis: "WDLIT4EG",
//             brandedFare: "ECOLITE",
//             brandedFareLabel: "ECONOMY LIGHT",
//             class: "W",
//             includedCheckedBags: {
//               quantity: 2,
//             },
//             amenities: [
//               {
//                 description: "STANDARD SEAT",
//                 isChargeable: true,
//                 amenityType: "PRE_RESERVED_SEAT",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "MEALS AND BEVERAGES",
//                 isChargeable: false,
//                 amenityType: "MEAL",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "EXTRA LEGROOM SEATS",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "REFUNDABLE TICKET",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "CHANGEABLE TICKET",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "PREFERRED SEATS",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "50 PERCENT MILES EARNED",
//                 isChargeable: false,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//             ],
//           },
//           {
//             segmentId: "11",
//             cabin: "ECONOMY",
//             fareBasis: "WDLIT4EG",
//             brandedFare: "ECOLITE",
//             brandedFareLabel: "ECONOMY LIGHT",
//             class: "W",
//             includedCheckedBags: {
//               quantity: 2,
//             },
//             amenities: [
//               {
//                 description: "STANDARD SEAT",
//                 isChargeable: true,
//                 amenityType: "PRE_RESERVED_SEAT",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "MEALS AND BEVERAGES",
//                 isChargeable: false,
//                 amenityType: "MEAL",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "EXTRA LEGROOM SEATS",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "REFUNDABLE TICKET",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "CHANGEABLE TICKET",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "PREFERRED SEATS",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "50 PERCENT MILES EARNED",
//                 isChargeable: false,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     type: "flight-offer",
//     id: "1",
//     source: "GDS",
//     instantTicketingRequired: false,
//     nonHomogeneous: false,
//     oneWay: false,
//     lastTicketingDate: "2024-01-27",
//     lastTicketingDateTime: "2024-01-27",
//     numberOfBookableSeats: 7,
//     itineraries: [
//       {
//         duration: "PT5H10M",
//         segments: [
//           {
//             departure: {
//               iataCode: "CAI",
//               terminal: "2",
//               at: "2024-01-27T21:00:00",
//             },
//             arrival: {
//               iataCode: "BAH",
//               at: "2024-01-28T00:50:00",
//             },
//             carrierCode: "GF",
//             number: "80",
//             aircraft: {
//               code: "789",
//             },
//             operating: {
//               carrierCode: "GF",
//             },
//             duration: "PT2H50M",
//             id: "10",
//             numberOfStops: 2,
//             blacklistedInEU: false,
//           },
//           {
//             departure: {
//               iataCode: "BAH",
//               at: "2024-01-28T01:55:00",
//             },
//             arrival: {
//               iataCode: "DXB",
//               terminal: "1",
//               at: "2024-01-28T04:10:00",
//             },
//             carrierCode: "GF",
//             number: "500",
//             aircraft: {
//               code: "320",
//             },
//             operating: {
//               carrierCode: "GF",
//             },
//             duration: "PT1H15M",
//             id: "11",
//             numberOfStops: 3,
//             blacklistedInEU: false,
//           },
//         ],
//       },
//     ],
//     price: {
//       currency: "EUR",
//       total: "407.01",
//       base: "61.00",
//       fees: [
//         {
//           amount: "0.00",
//           type: "SUPPLIER",
//         },
//         {
//           amount: "0.00",
//           type: "TICKETING",
//         },
//       ],
//       grandTotal: "207.01",
//     },
//     pricingOptions: {
//       fareType: ["PUBLISHED"],
//       includedCheckedBagsOnly: true,
//     },
//     validatingAirlineCodes: ["GF"],
//     travelerPricings: [
//       {
//         travelerId: "1",
//         fareOption: "STANDARD",
//         travelerType: "ADULT",
//         price: {
//           currency: "EUR",
//           total: "207.01",
//           base: "61.00",
//         },
//         fareDetailsBySegment: [
//           {
//             segmentId: "10",
//             cabin: "ECONOMY",
//             fareBasis: "WDLIT4EG",
//             brandedFare: "ECOLITE",
//             brandedFareLabel: "ECONOMY LIGHT",
//             class: "W",
//             includedCheckedBags: {
//               quantity: 2,
//             },
//             amenities: [
//               {
//                 description: "STANDARD SEAT",
//                 isChargeable: true,
//                 amenityType: "PRE_RESERVED_SEAT",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "MEALS AND BEVERAGES",
//                 isChargeable: false,
//                 amenityType: "MEAL",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "EXTRA LEGROOM SEATS",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "REFUNDABLE TICKET",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "CHANGEABLE TICKET",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "PREFERRED SEATS",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "50 PERCENT MILES EARNED",
//                 isChargeable: false,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//             ],
//           },
//           {
//             segmentId: "11",
//             cabin: "ECONOMY",
//             fareBasis: "WDLIT4EG",
//             brandedFare: "ECOLITE",
//             brandedFareLabel: "ECONOMY LIGHT",
//             class: "W",
//             includedCheckedBags: {
//               quantity: 2,
//             },
//             amenities: [
//               {
//                 description: "STANDARD SEAT",
//                 isChargeable: true,
//                 amenityType: "PRE_RESERVED_SEAT",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "MEALS AND BEVERAGES",
//                 isChargeable: false,
//                 amenityType: "MEAL",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "EXTRA LEGROOM SEATS",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "REFUNDABLE TICKET",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "CHANGEABLE TICKET",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "PREFERRED SEATS",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "50 PERCENT MILES EARNED",
//                 isChargeable: false,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },

//   {
//     type: "flight-offer",
//     id: "1",
//     source: "GDS",
//     instantTicketingRequired: false,
//     nonHomogeneous: false,
//     oneWay: false,
//     lastTicketingDate: "2024-02-02",
//     lastTicketingDateTime: "2024-02-02",
//     numberOfBookableSeats: 9,
//     itineraries: [
//       {
//         duration: "PT5H20M",
//         segments: [
//           {
//             departure: {
//               iataCode: "CAI",
//               terminal: "2",
//               at: "2024-02-02T19:55:00",
//             },
//             arrival: {
//               iataCode: "AMM",
//               at: "2024-02-02T22:15:00",
//             },
//             carrierCode: "RJ",
//             number: "506",
//             aircraft: {
//               code: "E95",
//             },
//             operating: {
//               carrierCode: "RJ",
//             },
//             duration: "PT1H20M",
//             id: "1",
//             numberOfStops: 0,
//             blacklistedInEU: false,
//           },
//           {
//             departure: {
//               iataCode: "AMM",
//               at: "2024-02-02T23:10:00",
//             },
//             arrival: {
//               iataCode: "DXB",
//               terminal: "1",
//               at: "2024-02-03T03:15:00",
//             },
//             carrierCode: "RJ",
//             number: "612",
//             aircraft: {
//               code: "320",
//             },
//             operating: {
//               carrierCode: "RJ",
//             },
//             duration: "PT3H5M",
//             id: "2",
//             numberOfStops: 0,
//             blacklistedInEU: false,
//           },
//         ],
//       },
//     ],
//     price: {
//       currency: "EUR",
//       total: "197.63",
//       base: "44.00",
//       fees: [
//         {
//           amount: "0.00",
//           type: "SUPPLIER",
//         },
//         {
//           amount: "0.00",
//           type: "TICKETING",
//         },
//       ],
//       grandTotal: "197.63",
//     },
//     pricingOptions: {
//       fareType: ["PUBLISHED"],
//       includedCheckedBagsOnly: true,
//     },
//     validatingAirlineCodes: ["RJ"],
//     travelerPricings: [
//       {
//         travelerId: "1",
//         fareOption: "STANDARD",
//         travelerType: "ADULT",
//         price: {
//           currency: "EUR",
//           total: "197.63",
//           base: "44.00",
//         },
//         fareDetailsBySegment: [
//           {
//             segmentId: "1",
//             cabin: "ECONOMY",
//             fareBasis: "QLANEG1",
//             brandedFare: "ECPLUS",
//             brandedFareLabel: "ECONOMY PLUS",
//             class: "Q",
//             includedCheckedBags: {
//               quantity: 2,
//             },
//             amenities: [
//               {
//                 description: "CARRY ON BAGGAGE",
//                 isChargeable: false,
//                 amenityType: "BAGGAGE",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "FREE BAGGAGE ALLOWANCE",
//                 isChargeable: false,
//                 amenityType: "BAGGAGE",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "PRE RESERVED SEAT ASSIGNMENT",
//                 isChargeable: true,
//                 amenityType: "PRE_RESERVED_SEAT",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "MILEAGE ACCRUAL",
//                 isChargeable: false,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "CHANGEABLE TICKET",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "REFUND BEFORE DEPARTURE",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//             ],
//           },
//           {
//             segmentId: "2",
//             cabin: "ECONOMY",
//             fareBasis: "QLANEG1",
//             brandedFare: "ECPLUS",
//             brandedFareLabel: "ECONOMY PLUS",
//             class: "Q",
//             includedCheckedBags: {
//               quantity: 2,
//             },
//             amenities: [
//               {
//                 description: "CARRY ON BAGGAGE",
//                 isChargeable: false,
//                 amenityType: "BAGGAGE",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "FREE BAGGAGE ALLOWANCE",
//                 isChargeable: false,
//                 amenityType: "BAGGAGE",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "PRE RESERVED SEAT ASSIGNMENT",
//                 isChargeable: true,
//                 amenityType: "PRE_RESERVED_SEAT",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "MILEAGE ACCRUAL",
//                 isChargeable: false,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "CHANGEABLE TICKET",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//               {
//                 description: "REFUND BEFORE DEPARTURE",
//                 isChargeable: true,
//                 amenityType: "BRANDED_FARES",
//                 amenityProvider: {
//                   name: "BrandedFare",
//                 },
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];

/*================================================= */

// const exampleData = [
//   {
//     type: "flight-offer",
//     id: "1",
//     source: "GDS",
//     instantTicketingRequired: false,
//     nonHomogeneous: false,
//     oneWay: false,
//     lastTicketingDate: "2024-01-31",
//     lastTicketingDateTime: "2024-01-31",
//     numberOfBookableSeats: 6,
//     itineraries: [
//       {
//         duration: "PT6H30M",
//         segments: [
//           {
//             departure: {
//               iataCode: "CAI",
//               terminal: "2",
//               at: "2024-02-02T01:30:00",
//             },
//             arrival: {
//               iataCode: "MCT",
//               at: "2024-02-02T07:15:00",
//             },
//             carrierCode: "WY",
//             number: "408",
//             aircraft: {
//               code: "738",
//             },
//             operating: {
//               carrierCode: "WY",
//             },
//             duration: "PT3H45M",
//             id: "1",
//             numberOfStops: 0,
//             blacklistedInEU: false,
//           },
//           {
//             departure: {
//               iataCode: "MCT",
//               at: "2024-02-02T08:45:00",
//             },
//             arrival: {
//               iataCode: "DXB",
//               terminal: "1",
//               at: "2024-02-02T10:00:00",
//             },
//             carrierCode: "WY",
//             number: "603",
//             aircraft: {
//               code: "7M8",
//             },
//             operating: {
//               carrierCode: "WY",
//             },
//             duration: "PT1H15M",
//             id: "2",
//             numberOfStops: 0,
//             blacklistedInEU: false,
//           },
//         ],
//       },
//       {
//         duration: "PT8H",
//         segments: [
//           {
//             departure: {
//               iataCode: "DXB",
//               terminal: "1",
//               at: "2024-02-05T11:25:00",
//             },
//             arrival: {
//               iataCode: "MCT",
//               at: "2024-02-28T12:40:00",
//             },
//             carrierCode: "WY",
//             number: "604",
//             aircraft: {
//               code: "7M8",
//             },
//             operating: {
//               carrierCode: "WY",
//             },
//             duration: "PT1H15M",
//             id: "3",
//             numberOfStops: 0,
//             blacklistedInEU: false,
//           },
//           {
//             departure: {
//               iataCode: "MCT",
//               at: "2024-02-28T14:45:00",
//             },
//             arrival: {
//               iataCode: "CAI",
//               terminal: "2",
//               at: "2024-02-05T17:25:00",
//             },
//             carrierCode: "WY",
//             number: "405",
//             aircraft: {
//               code: "739",
//             },
//             operating: {
//               carrierCode: "WY",
//             },
//             duration: "PT4H40M",
//             id: "4",
//             numberOfStops: 1,
//             blacklistedInEU: false,
//           },
//         ],
//       },
//     ],
//     price: {
//       currency: "EUR",
//       total: "305.01",
//       base: "59.00",
//       fees: [
//         {
//           amount: "0.00",
//           type: "SUPPLIER",
//         },
//         {
//           amount: "0.00",
//           type: "TICKETING",
//         },
//       ],
//       grandTotal: "305.01",
//     },
//     pricingOptions: {
//       fareType: ["PUBLISHED"],
//       includedCheckedBagsOnly: true,
//     },
//     validatingAirlineCodes: ["WY"],
//     travelerPricings: [
//       {
//         travelerId: "1",
//         fareOption: "STANDARD",
//         travelerType: "ADULT",
//         price: {
//           currency: "EUR",
//           total: "305.01",
//           base: "59.00",
//         },
//         fareDetailsBySegment: [
//           {
//             segmentId: "1",
//             cabin: "ECONOMY",
//             fareBasis: "OEL3EG",
//             class: "O",
//             includedCheckedBags: {
//               weight: 40,
//               weightUnit: "KG",
//             },
//           },
//           {
//             segmentId: "2",
//             cabin: "ECONOMY",
//             fareBasis: "OEL3EG",
//             class: "O",
//             includedCheckedBags: {
//               weight: 40,
//               weightUnit: "KG",
//             },
//           },
//           {
//             segmentId: "3",
//             cabin: "ECONOMY",
//             fareBasis: "OEL3EG",
//             class: "O",
//             includedCheckedBags: {
//               weight: 45,
//               weightUnit: "KG",
//             },
//           },
//           {
//             segmentId: "4",
//             cabin: "ECONOMY",
//             fareBasis: "OEL3EG",
//             class: "O",
//             includedCheckedBags: {
//               weight: 45,
//               weightUnit: "KG",
//             },
//           },
//         ],
//       },
//     ],
//   },
//   {
//     type: "flight-offer",
//     id: "2",
//     source: "GDS",
//     instantTicketingRequired: false,
//     nonHomogeneous: false,
//     oneWay: false,
//     lastTicketingDate: "2024-01-31",
//     lastTicketingDateTime: "2024-01-31",
//     numberOfBookableSeats: 6,
//     itineraries: [
//       {
//         duration: "PT6H30M",
//         segments: [
//           {
//             departure: {
//               iataCode: "CAI",
//               terminal: "2",
//               at: "2024-02-02T01:30:00",
//             },
//             arrival: {
//               iataCode: "MCT",
//               at: "2024-02-02T07:15:00",
//             },
//             carrierCode: "WY",
//             number: "408",
//             aircraft: {
//               code: "738",
//             },
//             operating: {
//               carrierCode: "WY",
//             },
//             duration: "PT3H45M",
//             id: "1",
//             numberOfStops: 0,
//             blacklistedInEU: false,
//           },
//           {
//             departure: {
//               iataCode: "MCT",
//               at: "2024-02-02T08:45:00",
//             },
//             arrival: {
//               iataCode: "DXB",
//               terminal: "1",
//               at: "2024-02-02T10:00:00",
//             },
//             carrierCode: "WY",
//             number: "603",
//             aircraft: {
//               code: "7M8",
//             },
//             operating: {
//               carrierCode: "WY",
//             },
//             duration: "PT1H15M",
//             id: "2",
//             numberOfStops: 0,
//             blacklistedInEU: false,
//           },
//         ],
//       },
//       {
//         duration: "PT9H",
//         segments: [
//           {
//             departure: {
//               iataCode: "DXB",
//               terminal: "1",
//               at: "2024-02-28T17:15:00",
//             },
//             arrival: {
//               iataCode: "MCT",
//               at: "2024-02-28T18:30:00",
//             },
//             carrierCode: "WY",
//             number: "610",
//             aircraft: {
//               code: "7M8",
//             },
//             operating: {
//               carrierCode: "WY",
//             },
//             duration: "PT1H15M",
//             id: "5",
//             numberOfStops: 0,
//             blacklistedInEU: false,
//           },
//           {
//             departure: {
//               iataCode: "MCT",
//               at: "2024-02-28T21:35:00",
//             },
//             arrival: {
//               iataCode: "CAI",
//               terminal: "2",
//               at: "2024-02-29T00:15:00",
//             },
//             carrierCode: "WY",
//             number: "407",
//             aircraft: {
//               code: "738",
//             },
//             operating: {
//               carrierCode: "WY",
//             },
//             duration: "PT4H40M",
//             id: "6",
//             numberOfStops: 0,
//             blacklistedInEU: false,
//           },
//         ],
//       },
//     ],
//     price: {
//       currency: "EUR",
//       total: "305.01",
//       base: "59.00",
//       fees: [
//         {
//           amount: "0.00",
//           type: "SUPPLIER",
//         },
//         {
//           amount: "0.00",
//           type: "TICKETING",
//         },
//       ],
//       grandTotal: "305.01",
//     },
//     pricingOptions: {
//       fareType: ["PUBLISHED"],
//       includedCheckedBagsOnly: true,
//     },
//     validatingAirlineCodes: ["WY"],
//     travelerPricings: [
//       {
//         travelerId: "1",
//         fareOption: "STANDARD",
//         travelerType: "ADULT",
//         price: {
//           currency: "EUR",
//           total: "305.01",
//           base: "59.00",
//         },
//         fareDetailsBySegment: [
//           {
//             segmentId: "1",
//             cabin: "ECONOMY",
//             fareBasis: "OEL3EG",
//             class: "O",
//             includedCheckedBags: {
//               weight: 40,
//               weightUnit: "KG",
//             },
//           },
//           {
//             segmentId: "2",
//             cabin: "ECONOMY",
//             fareBasis: "OEL3EG",
//             class: "O",
//             includedCheckedBags: {
//               weight: 40,
//               weightUnit: "KG",
//             },
//           },
//           {
//             segmentId: "5",
//             cabin: "ECONOMY",
//             fareBasis: "OEL3EG",
//             class: "O",
//             includedCheckedBags: {
//               weight: 45,
//               weightUnit: "KG",
//             },
//           },
//           {
//             segmentId: "6",
//             cabin: "ECONOMY",
//             fareBasis: "OEL3EG",
//             class: "O",
//             includedCheckedBags: {
//               weight: 45,
//               weightUnit: "KG",
//             },
//           },
//         ],
//       },
//     ],
//   },
//   {
//     type: "flight-offer",
//     id: "3",
//     source: "GDS",
//     instantTicketingRequired: false,
//     nonHomogeneous: false,
//     oneWay: false,
//     lastTicketingDate: "2024-01-31",
//     lastTicketingDateTime: "2024-01-31",
//     numberOfBookableSeats: 6,
//     itineraries: [
//       {
//         duration: "PT6H30M",
//         segments: [
//           {
//             departure: {
//               iataCode: "CAI",
//               terminal: "2",
//               at: "2024-02-02T01:30:00",
//             },
//             arrival: {
//               iataCode: "MCT",
//               at: "2024-02-02T07:15:00",
//             },
//             carrierCode: "WY",
//             number: "408",
//             aircraft: {
//               code: "738",
//             },
//             operating: {
//               carrierCode: "WY",
//             },
//             duration: "PT3H45M",
//             id: "1",
//             numberOfStops: 0,
//             blacklistedInEU: false,
//           },
//           {
//             departure: {
//               iataCode: "MCT",
//               at: "2024-02-02T08:45:00",
//             },
//             arrival: {
//               iataCode: "DXB",
//               terminal: "1",
//               at: "2024-02-02T10:00:00",
//             },
//             carrierCode: "WY",
//             number: "603",
//             aircraft: {
//               code: "7M8",
//             },
//             operating: {
//               carrierCode: "WY",
//             },
//             duration: "PT1H15M",
//             id: "2",
//             numberOfStops: 0,
//             blacklistedInEU: false,
//           },
//         ],
//       },
//       {
//         duration: "PT13H20M",
//         segments: [
//           {
//             departure: {
//               iataCode: "DXB",
//               terminal: "1",
//               at: "2024-02-28T06:05:00",
//             },
//             arrival: {
//               iataCode: "MCT",
//               at: "2024-02-28T07:20:00",
//             },
//             carrierCode: "WY",
//             number: "602",
//             aircraft: {
//               code: "7M8",
//             },
//             operating: {
//               carrierCode: "WY",
//             },
//             duration: "PT1H15M",
//             id: "7",
//             numberOfStops: 0,
//             blacklistedInEU: false,
//           },
//           {
//             departure: {
//               iataCode: "MCT",
//               at: "2024-02-28T14:45:00",
//             },
//             arrival: {
//               iataCode: "CAI",
//               terminal: "2",
//               at: "2024-02-28T17:25:00",
//             },
//             carrierCode: "WY",
//             number: "405",
//             aircraft: {
//               code: "739",
//             },
//             operating: {
//               carrierCode: "WY",
//             },
//             duration: "PT4H40M",
//             id: "8",
//             numberOfStops: 0,
//             blacklistedInEU: false,
//           },
//         ],
//       },
//     ],
//     price: {
//       currency: "EUR",
//       total: "305.01",
//       base: "59.00",
//       fees: [
//         {
//           amount: "0.00",
//           type: "SUPPLIER",
//         },
//         {
//           amount: "0.00",
//           type: "TICKETING",
//         },
//       ],
//       grandTotal: "305.01",
//     },
//     pricingOptions: {
//       fareType: ["PUBLISHED"],
//       includedCheckedBagsOnly: true,
//     },
//     validatingAirlineCodes: ["WY"],
//     travelerPricings: [
//       {
//         travelerId: "1",
//         fareOption: "STANDARD",
//         travelerType: "ADULT",
//         price: {
//           currency: "EUR",
//           total: "305.01",
//           base: "59.00",
//         },
//         fareDetailsBySegment: [
//           {
//             segmentId: "1",
//             cabin: "ECONOMY",
//             fareBasis: "OEL3EG",
//             class: "O",
//             includedCheckedBags: {
//               weight: 40,
//               weightUnit: "KG",
//             },
//           },
//           {
//             segmentId: "2",
//             cabin: "ECONOMY",
//             fareBasis: "OEL3EG",
//             class: "O",
//             includedCheckedBags: {
//               weight: 40,
//               weightUnit: "KG",
//             },
//           },
//           {
//             segmentId: "7",
//             cabin: "ECONOMY",
//             fareBasis: "OEL3EG",
//             class: "O",
//             includedCheckedBags: {
//               weight: 45,
//               weightUnit: "KG",
//             },
//           },
//           {
//             segmentId: "8",
//             cabin: "ECONOMY",
//             fareBasis: "OEL3EG",
//             class: "O",
//             includedCheckedBags: {
//               weight: 45,
//               weightUnit: "KG",
//             },
//           },
//         ],
//       },
//     ],
//   },
// ];

function Search() {
  // Statement Data of trip
  const [, setTrip] = useRecoilState(MainData);
  const [, setTripDataFilters] = useRecoilState(TripDataFilters);
  const [, setPriceFilterState] = useRecoilState(PriceFilter);
  const [, setMinPriceState] = useRecoilState(MinPrice);
  const [, setMaxPriceState] = useRecoilState(MaxPrice);
  const [storeCurrency] = useRecoilState(StoreCurrency);

  const [loading, setLoading] = useRecoilState(LoadingDataSearch);
  // Data For Search
  const [originLocationCode] = useRecoilState(originSearch);
  const [destinationLocationCode] = useRecoilState(destinationSearch);
  const [departureDate] = useRecoilState(dateGo);
  const [returnDate] = useRecoilState(dateReturn);
  // const [levelTravelDataState] = useRecoilState(levelTravelData);
  // const [childrenDataState] = useRecoilState(childrenData);
  // const [youthsDataState] = useRecoilState(youthsData);
  const [adults] = useRecoilState(adultsData);
  const [typeTravelState] = useRecoilState(typeTravel);

  const [, setTypeSystemSearchState] = useRecoilState(TypeSystemSearch);

  // Fetching Data
  const getDataSearch = async () => {
    const originLocationCodeQuery = `originLocationCode=${originLocationCode}`;
    const destinationLocationCodeQuery = `destinationLocationCode=${destinationLocationCode}`;
    const adultsQuery = `adults=${adults}`;
    // handle Date
    let departureDateQuery = "";
    departureDateQuery = `${departureDate?.toString().split("/")[2]}-${
      departureDate?.toString().split("/")[1]
    }-${departureDate?.toString().split("/")[0]}`;

    departureDateQuery = `departureDate=${departureDateQuery}`;

    let dataOfQuery = "";
    dataOfQuery = `${originLocationCodeQuery}&${destinationLocationCodeQuery}&${departureDateQuery}&${adultsQuery}`;
    if (typeTravelState !== "oneWay") {
      let returnDateQuery = "";

      returnDateQuery = `${returnDate?.toString().split("/")[2]}-${
        returnDate?.toString().split("/")[1]
      }-${returnDate?.toString().split("/")[0]}`;

      returnDateQuery = `returnDate=${returnDateQuery}`;

      dataOfQuery = `${originLocationCodeQuery}&${destinationLocationCodeQuery}&${departureDateQuery}&${returnDateQuery}&${adultsQuery}`;
    }
    // console.log("dataOfQuery==> ", dataOfQuery);

    if (originLocationCode && destinationLocationCode && departureDate) {
      const token = await getTokenForAmadeus();

      await axios
        .get(
          `${
            import.meta.env.VITE_PUBLIC_API_V2
          }/shopping/flight-offers?${dataOfQuery}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(({ data }) => {
          const prices = data.data.map(
            (ticket: { price: { total: string } }) => {
              const totalPriceUSD =
                +ticket.price.total * +storeCurrency.rates.EUR;
              const totalPriceEGP = totalPriceUSD * +storeCurrency.rates.EGP;
              return +totalPriceEGP;
            }
          );
          setMinPriceState(Math.min(...prices));
          setMaxPriceState(Math.ceil(Math.max(...prices)));
          setPriceFilterState({
            min: Math.min(...prices),
            max: Math.ceil(Math.max(...prices)),
          });

          setTripDataFilters(data.data);
          setTrip(data.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          navigator("/");
        });
    }
  };
  const [reSearchState] = useRecoilState(ReSearch);

  // console.log("trip==> ", trip);
  const navigator = useNavigate();
  useEffect(() => {
    setTypeSystemSearchState("airline");
    // Test Price
    // const prices = exampleData.map((ticket: { price: { total: string } }) => {
    //   const totalPriceUSD = +ticket.price.total * +storeCurrency.rates.EUR;
    //   const totalPriceEGP = totalPriceUSD * +storeCurrency.rates.EGP;
    //   return +totalPriceEGP;
    // });
    // setMinPriceState(Math.min(...prices));
    // setMaxPriceState(Math.ceil(Math.max(...prices)));
    // setPriceFilterState({
    //   min: Math.min(...prices),
    //   max: Math.ceil(Math.max(...prices)),
    // });
    // setLoading(false);
    // setTripDataFilters(exampleData);
    if (!originLocationCode || !destinationLocationCode || !departureDate) {
      return navigator(`/`);
    }
    getDataSearch();
    // GetCurrencyPricesData();
  }, [reSearchState]);
  if (loading) {
    return (
      <>
        <HeaderSearch />
        <div className={`py-10 flex flex-col gap-5`}>
          <TicketLoading />
          <TicketLoading />
          <TicketLoading />
          <TicketLoading />
        </div>
      </>
    );
  }

  return (
    <section className={``}>
      <HeaderSearch />
      <div className={`h-[104px] mb-[25px] lg:block hidden`}>
        <BookingSteps />
      </div>
      {/* Content Page Search */}
      <div className={`grid grid-cols-4`}>
        {/* Tickets */}
        <TicketsMapped />
        {/* Filters */}
        <FiltersAir />
      </div>
    </section>
  );
}

export default Search;
