import { HotelData } from "./interfaces/MainDataHotels.interface";

const HotelDetails = ({ hotel }: { hotel: HotelData }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <img
            src={hotel.images[0].thumbnail.split("=s")[0] + "=s1000"}
            alt={hotel.name}
            className="w-full h-auto md:h-96 object-cover"
          />
        </div>
        <div className="p-6">
          <h2 className="text-3xl font-semibold mb-2">{hotel.name}</h2>
          <p className="text-gray-600 mb-4">{hotel.description}</p>
          <div className="mb-4">
            <p>
              <span className="font-semibold">Check-in Time:</span>{" "}
              {hotel.check_in_time}
            </p>
            <p>
              <span className="font-semibold">Check-out Time:</span>{" "}
              {hotel.check_out_time}
            </p>
          </div>
          <div className="mb-4">
            <p>
              <span className="font-semibold">Rate per Night:</span>{" "}
              {hotel.rate_per_night.lowest}
            </p>
            <p>
              <span className="font-semibold">Total Rate:</span>{" "}
              {hotel.total_rate.lowest}
            </p>
          </div>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Deal:</span> {hotel.deal}
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Hotel Class:</span>{" "}
            {hotel.hotel_class}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
