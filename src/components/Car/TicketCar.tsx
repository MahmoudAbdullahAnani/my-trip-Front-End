import { Link } from "react-router-dom";
import { TransferOffer } from "./interfaces/MainData.interface";
import { useTranslation } from "react-i18next";
import sendCatchData from "./Actions/CatshData";
import { useState } from "react";
import axios from "axios";
import { Flip, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../data/store";
import { exampleDataCurrency } from "../../data/Fetching/ExampleData";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
function TicketCar(data: TransferOffer) {
  const durationH = data.duration.split("PT")[1].split("H")[0] || "";
  const durationM =
    data.duration.split("PT")[1].split("H")[1].split("M")[0] || "";

  // console.log(data);
  // handle payment
  const [dataLoadingState, setDataLoadingState] = useState(false);
  const stateUserData = useSelector((state: RootState) => state.loggedUser);
  const EGP =
    +exampleDataCurrency.rates.EGP * +data.quotation.base.monetaryAmount;
  async function PaymentCar(data: TransferOffer) {
    // Stripe
    setDataLoadingState(true);
    return await axios
      .post(
        `${
          import.meta.env.VITE_PUBLIC_API_PRODUCTION
        }/checkout-completed/stripe`,
        {
          typeSystem: "Car",
          price: Math.floor(EGP),
          description: data.vehicle.description,
          user_id: stateUserData ? stateUserData._id : "gust",
          urlSuccess: `https://ittrip.vercel.app?system=car&itemId=${data.id}&status=success`,
          urlCancel: `https://ittrip.vercel.app?system=car&itemId=${data.id}&status=cancel`,
          userEmail: stateUserData ? stateUserData.email : "gust",
          carrierCodeLogo: data.vehicle.imageURL,
          timeGo: data.start.dateTime,
          timeSet: data.end.dateTime,
          durationH,
          durationM,
          isStope: 0,
        }
      )
      .then(({ data }) => {
        setDataLoadingState(false);
        location.href = data.url;
        // setURLVisaPaymentState(data.url);
      })
      .catch((err) => {
        console.log("err===> ", err);
        setDataLoadingState(false);
        toast.warn("هناك مشكلة بالانترنت لديك", {
          position: "top-right",
          autoClose: 5075,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Flip,
        });
      });
  }

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
              <strong>Base Amount:</strong> {Math.floor(EGP)} {"EGP"}
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
            onClick={async () => {
              sendCatchData(data);
              await PaymentCar(data);
            }}
            to={""}
          >
            {dataLoadingState ? "تحميل..." : t("اختيار")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TicketCar;
