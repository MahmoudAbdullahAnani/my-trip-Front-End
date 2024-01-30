// const w = {
//   type: "flight-offer",
//   id: "1",
//   source: "GDS",
//   instantTicketingRequired: false,
//   nonHomogeneous: false,
//   oneWay: false,
//   lastTicketingDate: "2024-01-27",
//   lastTicketingDateTime: "2024-01-27",
//   numberOfBookableSeats: 7,
//   itineraries: [
//     {
//       duration: "PT5H10M",
//       segments: [
//         {
//           departure: {
//             iataCode: "CAI",
//             terminal: "2",
//             at: "2024-01-27T21:00:00",
//           },
//           arrival: {
//             iataCode: "BAH",
//             at: "2024-01-28T00:50:00",
//           },
//           carrierCode: "GF",
//           number: "80",
//           aircraft: {
//             code: "789",
//           },
//           operating: {
//             carrierCode: "GF",
//           },
//           duration: "PT2H50M",
//           id: "10",
//           numberOfStops: 0,
//           blacklistedInEU: false,
//         },
//         {
//           departure: {
//             iataCode: "BAH",
//             at: "2024-01-28T01:55:00",
//           },
//           arrival: {
//             iataCode: "DXB",
//             terminal: "1",
//             at: "2024-01-28T04:10:00",
//           },
//           carrierCode: "GF",
//           number: "500",
//           aircraft: {
//             code: "320",
//           },
//           operating: {
//             carrierCode: "GF",
//           },
//           duration: "PT1H15M",
//           id: "11",
//           numberOfStops: 0,
//           blacklistedInEU: false,
//         },
//       ],
//     },
//   ],
//   price: {
//     currency: "EUR",
//     total: "207.01",
//     base: "61.00",
//     fees: [
//       {
//         amount: "0.00",
//         type: "SUPPLIER",
//       },
//       {
//         amount: "0.00",
//         type: "TICKETING",
//       },
//     ],
//     grandTotal: "207.01",
//   },
//   pricingOptions: {
//     fareType: ["PUBLISHED"],
//     includedCheckedBagsOnly: true,
//   },
//   validatingAirlineCodes: ["GF"],
//   travelerPricings: [
//     {
//       travelerId: "1",
//       fareOption: "STANDARD",
//       travelerType: "ADULT",
//       price: {
//         currency: "EUR",
//         total: "207.01",
//         base: "61.00",
//       },
//       fareDetailsBySegment: [
//         {
//           segmentId: "10",
//           cabin: "ECONOMY",
//           fareBasis: "WDLIT4EG",
//           brandedFare: "ECOLITE",
//           brandedFareLabel: "ECONOMY LIGHT",
//           class: "W",
//           includedCheckedBags: {
//             quantity: 2,
//           },
//           amenities: [
//             {
//               description: "STANDARD SEAT",
//               isChargeable: true,
//               amenityType: "PRE_RESERVED_SEAT",
//               amenityProvider: {
//                 name: "BrandedFare",
//               },
//             },
//             {
//               description: "MEALS AND BEVERAGES",
//               isChargeable: false,
//               amenityType: "MEAL",
//               amenityProvider: {
//                 name: "BrandedFare",
//               },
//             },
//             {
//               description: "EXTRA LEGROOM SEATS",
//               isChargeable: true,
//               amenityType: "BRANDED_FARES",
//               amenityProvider: {
//                 name: "BrandedFare",
//               },
//             },
//             {
//               description: "REFUNDABLE TICKET",
//               isChargeable: true,
//               amenityType: "BRANDED_FARES",
//               amenityProvider: {
//                 name: "BrandedFare",
//               },
//             },
//             {
//               description: "CHANGEABLE TICKET",
//               isChargeable: true,
//               amenityType: "BRANDED_FARES",
//               amenityProvider: {
//                 name: "BrandedFare",
//               },
//             },
//             {
//               description: "PREFERRED SEATS",
//               isChargeable: true,
//               amenityType: "BRANDED_FARES",
//               amenityProvider: {
//                 name: "BrandedFare",
//               },
//             },
//             {
//               description: "50 PERCENT MILES EARNED",
//               isChargeable: false,
//               amenityType: "BRANDED_FARES",
//               amenityProvider: {
//                 name: "BrandedFare",
//               },
//             },
//           ],
//         },
//         {
//           segmentId: "11",
//           cabin: "ECONOMY",
//           fareBasis: "WDLIT4EG",
//           brandedFare: "ECOLITE",
//           brandedFareLabel: "ECONOMY LIGHT",
//           class: "W",
//           includedCheckedBags: {
//             quantity: 2,
//           },
//           amenities: [
//             {
//               description: "STANDARD SEAT",
//               isChargeable: true,
//               amenityType: "PRE_RESERVED_SEAT",
//               amenityProvider: {
//                 name: "BrandedFare",
//               },
//             },
//             {
//               description: "MEALS AND BEVERAGES",
//               isChargeable: false,
//               amenityType: "MEAL",
//               amenityProvider: {
//                 name: "BrandedFare",
//               },
//             },
//             {
//               description: "EXTRA LEGROOM SEATS",
//               isChargeable: true,
//               amenityType: "BRANDED_FARES",
//               amenityProvider: {
//                 name: "BrandedFare",
//               },
//             },
//             {
//               description: "REFUNDABLE TICKET",
//               isChargeable: true,
//               amenityType: "BRANDED_FARES",
//               amenityProvider: {
//                 name: "BrandedFare",
//               },
//             },
//             {
//               description: "CHANGEABLE TICKET",
//               isChargeable: true,
//               amenityType: "BRANDED_FARES",
//               amenityProvider: {
//                 name: "BrandedFare",
//               },
//             },
//             {
//               description: "PREFERRED SEATS",
//               isChargeable: true,
//               amenityType: "BRANDED_FARES",
//               amenityProvider: {
//                 name: "BrandedFare",
//               },
//             },
//             {
//               description: "50 PERCENT MILES EARNED",
//               isChargeable: false,
//               amenityType: "BRANDED_FARES",
//               amenityProvider: {
//                 name: "BrandedFare",
//               },
//             },
//           ],
//         },
//       ],
//     },
//   ],

import { itinerariesSteps } from "./Filters/NumberOfStopsAirline";

// };
function CardTrip({ itineraries, price, id }: itinerariesSteps) {
  const durationH = itineraries[0].duration.split("PT")[1].split("H")[0];
  const durationM = itineraries[0].duration
    .split("PT")[1]
    .split("H")[1]
    .split("M")[0];

  return (
    <div>
      <span>Price: {price.total}- </span>
      <span>durationH:{durationH}- </span>
      <span>durationM:{durationM}- </span>
      <span>id:{id}& </span>
      <span>numberOfStops:{itineraries[0].segments[0].numberOfStops} </span>
    </div>
  );
}

export default CardTrip;
