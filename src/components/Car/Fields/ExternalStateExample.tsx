import { useCallback, useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GeoLocation } from "../../../data/RecoilState/car/MainDataCar";
import { useRecoilState } from "recoil";
// const center = [51.505, -0.09];
const zoom = 13;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function DisplayPosition({ map }) {
  const [, setPosition] = useState(() => map.getCenter());
  // const [position, setPosition] = useState(() => map.getCenter());

  // const onClick = useCallback(() => {
  //   map.setView(center, zoom);
  // }, [map]);

  const onMove = useCallback(() => {
    setPosition(map.getCenter());
  }, [map]);

  useEffect(() => {
    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
  }, [map, onMove]);

  return (
    <>
      {/* <p>
        latitude: {position.lat.toFixed(4)}, longitude:{" "}
        {position.lng.toFixed(4)} <button onClick={onClick}>reset</button>
      </p> */}
    </>
  );
}

function ExternalStateExample() {
  const [map, setMap] = useState(null);
  const [geolocation] = useRecoilState(GeoLocation);

  const displayMap = useMemo(
    () => (
      <MapContainer
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        center={[geolocation.lat, geolocation.long]}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={setMap}
      >
        <TileLayer
          attribution='<div>
          <a href="https://waronwant.org/our-work/palestine">Free Palestine</a> <img width="30px" src="https://flagsapi.com/PS/shiny/32.png"/>
          </div>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    ),
    [geolocation.lat]
  );

  return (
    <>
      {map ? <DisplayPosition map={map} /> : null}
      {displayMap}
    </>
  );
}

export default ExternalStateExample;
