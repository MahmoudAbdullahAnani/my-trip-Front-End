import { Link } from "react-router-dom";
import { TransferOffer } from "./interfaces/MainData.interface";
import { useTranslation } from "react-i18next";
import axios from "axios";

function TicketCar(data: TransferOffer) {
  const durationH = data.duration.split("PT")[1].split("H")[0];
  const durationM = data.duration.split("PT")[1].split("H")[1].split("M")[0];

  // handle catch data

  const sendCatchData = async () => {
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

  // console.log(data);
  const { t } = useTranslation();
  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg  rounded-lg overflow-hidden">
        <div>
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">Transfer Details</h2>
            <p>
              <strong>ID:</strong> {data.id}
            </p>
            <p>
              <strong>Type:</strong> {data.type}
            </p>
            <p>
              <strong>Transfer Type:</strong> {data.transferType}
            </p>
            <p>
              <strong>Start Date/Time:</strong> {data.start.dateTime}
            </p>
            <p>
              <strong>End Date/Time:</strong> {data.end.dateTime}
            </p>
            <p>
              <strong>Duration:</strong> {durationH}:{durationM}
            </p>
            <p>
              <strong>Distance:</strong> {data.distance?.value || ""}{" "}
              {data.distance?.unit || ""}
            </p>
          </div>

          <div className="p-4 border-t border-gray-200">
            <h3 className="text-xl font-bold mb-2">Vehicle Details</h3>
            <div className="flex flex-col items-center">
              <img
                src={data.vehicle.imageURL}
                alt="Vehicle"
                className="w- h-32 rounded-md object-cover mr-4"
              />
              <div>
                <p>
                  <strong>Category:</strong> {data.vehicle.category}
                </p>
                <p>
                  <strong>Description:</strong> {data.vehicle.description}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200">
            <h3 className="text-xl font-bold mb-2">Service Provider Details</h3>
            <div className="flex items-center">
              <img
                src={data.serviceProvider.logoUrl}
                alt="Service Provider"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p>
                  <strong>Name:</strong> {data.serviceProvider.name}
                </p>
                <p>
                  <strong>Code:</strong> {data.serviceProvider.code}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200">
            <h3 className="text-xl font-bold mb-2">Quotation Details</h3>
            <p>
              <strong>Base Amount:</strong> {data.quotation.base.monetaryAmount}{" "}
              {data.quotation.currencyCode}
            </p>
            <p>
              <strong>Total Taxes:</strong>{" "}
              {data.quotation.totalTaxes.monetaryAmount}{" "}
              {data.quotation.currencyCode}
            </p>
            <p>
              <strong>Total Fees:</strong>{" "}
              {data.quotation.totalFees.monetaryAmount}{" "}
              {data.quotation.currencyCode}
            </p>
          </div>
        </div>
        <div className={`w-full text-center p-5`}>
          <Link
            className={`px-3 mx-auto py-2 rounded-lg  mt-10 bg-[#117C99] duration-200 text-white hover:bg-[#31B2E1]`}
            onClick={() => {
              sendCatchData();
            }}
            to={""}
          >
            {t("اختيار")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TicketCar;
