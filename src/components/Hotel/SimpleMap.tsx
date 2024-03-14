import React from "react";

interface MapProps {
  latitude: number;
  longitude: number;
  className: string;
}

const SimpleMap: React.FC<MapProps> = ({ latitude, longitude, className }) => {
  return (
    <iframe
      style={{ border: "0" }}
      allowFullScreen
      loading="lazy"
      width={"100%"}
      height={"100%"}
      className={className}
      referrerPolicy={"no-referrer-when-downgrade"}
      src={`https://maps.google.com/maps?q=${latitude},${longitude}&markers=${latitude},${longitude}|${latitude},${longitude}&output=embed`}
    ></iframe>
  );
};

export default SimpleMap;
