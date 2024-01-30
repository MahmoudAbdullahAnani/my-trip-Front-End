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
} from "../data/RecoilState/FormHandling";
import {
  adultsData,
  // childrenData,
  // levelTravelData,
  // youthsData,
} from "../data/RecoilState/FormSearchData";

// Fetching Data
import axios from "axios";
import { getTokenForAmadeus } from "../Keys/GetTokenForAmadeus";
// import { Loder } from "../components/loder/Loder";
import {
  ReSearch,
  TypeSystemSearch,
} from "../data/RecoilState/Search/TypeSystemSearch";

import TicketLoading from "../components/loder/TicketLoading";
import HeaderSearch from "../components/Home/Sections/Search/Headers/HeaderSearch";
import {
  LoadingDataSearch,
  MainData,
  MaxPrice,
  MinPrice,
  PriceFilter,
  TripDataFilters,
} from "../data/RecoilState/Search/MainData";
import TicketsMapped from "../components/Home/Sections/Search/TicketsMapped";
import BookingSteps from "../components/Home/Sections/Search/Headers/BookingSteps";
import FiltersAir from "../components/Home/Sections/Search/Headers/FiltersAir";

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
// ];

function Search() {
  // Statement Data of trip
  const [, setTrip] = useRecoilState(MainData);
  const [, setTripDataFilters] = useRecoilState(TripDataFilters);
  const [, setPriceFilterState] = useRecoilState(PriceFilter);
  const [, setMinPriceState] = useRecoilState(MinPrice);
  const [, setMaxPriceState] = useRecoilState(MaxPrice);
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
              return +ticket.price.total;
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
    //   return +ticket.price.total;
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
      <div className={`h-[104px] lg:block hidden`}>
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
