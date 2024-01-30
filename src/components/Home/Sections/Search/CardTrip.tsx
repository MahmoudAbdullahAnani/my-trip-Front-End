import { FlightOffer } from "../../../../interface/MainData";

function CardTrip({ itineraries, price, id }: FlightOffer) {
  const durationH = itineraries[0].duration.split("PT")[1].split("H")[0];
  const durationM = itineraries[0].duration
    .split("PT")[1]
    .split("H")[1]
    .split("M")[0];

  return (
    <div className={`bg-red-700`}>
      <span>Price: {price.total}- </span>
      <span>durationH:{durationH}- </span>
      <span>durationM:{durationM}- </span>
      <span>id:{id}& </span>
      <span>numberOfStops:{itineraries[0].segments[0].numberOfStops} </span>
    </div>
  );
}

export default CardTrip;
