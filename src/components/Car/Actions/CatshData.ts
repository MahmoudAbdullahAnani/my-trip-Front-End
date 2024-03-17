import axios from "axios";
import { TransferOffer } from "../interfaces/MainData.interface";

const sendCatchData = async (data: TransferOffer) => {
  const chooseTicket = {
    CompanyLogo: data.vehicle.imageURL,
    carID: data.id,
    startDateCar: data.start.dateTime,
    endDateCar: data.end.dateTime,
    distanceCar: `${data.distance?.value || ""} ${data.distance?.unit || ""}`,
    categoryCar: data.vehicle.category,
    descriptionCar: data.vehicle.description,
    serviceProviderCar: data.serviceProvider.name,
    priceCar: data.quotation.base.monetaryAmount,
  };

  const sessionId = localStorage.getItem("sessionId");
  await axios
    .patch(
      import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
        ? `${
            import.meta.env.VITE_PUBLIC_API_LOCAL
          }/catch-data/ticket/${sessionId}`
        : `${
            import.meta.env.VITE_PUBLIC_API_PRODUCTION
          }/catch-data/ticket/${sessionId}`,
      {
        chooseTicket: { ...chooseTicket },
      }
    )
    .then(() => {})
    .catch((error) => {
      console.log(error);
      // if (error.response?.data.statusCode === 401) {
      //   localStorage.removeItem("token");
      // }
    });
  return true;
};
export default sendCatchData;
