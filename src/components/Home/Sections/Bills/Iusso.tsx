// import { useNavigate } from "react-router-dom";
// import { useRecoilState } from "recoil";
// import { DataBooking } from "../../../../data/RecoilState/Search/TicketData";
import { Link } from "react-router-dom";
import { iconTime, iconWarning } from "../../../../assets/icons/home";
import { Flip, toast } from "react-toastify";
import { URLPayment } from "../../../../data/RecoilState/Payment/StripeURLsPayment";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

function Iusso() {
  return (
    <div
      className={`bg-[#FDEAB4] text-[#F36E16] flex w-full justify-center mt-[16px] py-[14px] rounded-[16px]`}
    >
      <span dir="rtl">
        ملاحظة: بيانات المسافر يجب ان تكون باللغة الإنجليزية و مطابقة للهوية أو
        جواز السفر
      </span>
      <span>{iconWarning}</span>
    </div>
  );
}
function Iusso2() {
  return (
    <div
      style={{
        boxShadow: "rgb(0 0 0 / 25%) 0px 4px 4px",
      }}
      className={`bg-[#E7EAF7] text-[#002684] text-[20px] mt-[24px] py-[15px] font-medium w-full rounded-[16px] text-center flex justify-center items-center gap-[24px]`}
    >
      <span>يمكنك إلغاء الحجز خلال 24 ساعة</span>
      <span>{iconTime}</span>
    </div>
  );
}
function BtnPay({ isPageAirPay = false }: { isPageAirPay: boolean }) {
  const [URLPaymentState] = useRecoilState(URLPayment);
  // const [RerenderingUrlState] = useRecoilState(RerenderingUrl);
  console.log(URLPaymentState);

  useEffect(() => {}, [URLPaymentState]);
  //====================================================== User Data For air booking ===========================================================================================
  // const [dataBookingState] = useRecoilState(DataBooking);
  //======================================================= User Data For air booking ===========================================================================================
  // const navigator = useNavigate();
  const ClickPay = () => {
    return toast.warn(" يحب ادخال بيانات الحجز ", {
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
  };
  if (isPageAirPay) {
    return (
      <>
        {URLPaymentState === "" ? (
          <>
            {/* desktop */}
            <div
              className={`roundedCornerPay sm:block hidden absolute -bottom-2 left-[50%] translate-x-[-50%] bg-[#e9e9e9] py-2 md:px-7 px-4 rounded-t-[16px]`}
            >
              <button
                onClick={() =>
                  toast.warn("يجب اختيار طريقة دفع", {
                    position: "top-right",
                    autoClose: 5075,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Flip,
                  })
                }
                className={`w-[294px] h-[48px] rounded-[16px] bg-[#117C99] hover:bg-[#117c99b0] duration-200 text-[#FFF] flex justify-center relative top-0 items-center `}
              >
                إكمال عملة الدفع
              </button>
            </div>
            {/* mobile */}
            <div
              className={`sm:hidden block absolute -bottom-2 left-[50%] translate-x-[-50%] bg-[#e9e9e9] py-2 md:px-7 px-4 rounded-t-[16px]`}
            >
              <button
                onClick={() =>
                  toast.warn("يجب اختيار طريقة دفع", {
                    position: "top-right",
                    autoClose: 5075,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Flip,
                  })
                }
                className={`w-[294px] h-[48px] rounded-[16px] bg-[#117C99] hover:bg-[#117c99b0] duration-200 text-[#FFF] flex justify-center relative top-0 items-center `}
              >
                إكمال عملة الدفع
              </button>
            </div>
          </>
        ) : (
          <>
            {/* desktop */}
            <div
              className={`roundedCornerPay sm:block hidden absolute -bottom-2 left-[50%] translate-x-[-50%] bg-[#e9e9e9] py-2 md:px-7 px-4 rounded-t-[16px]`}
            >
              <Link
                to={URLPaymentState}
                className={`w-[294px] h-[48px] rounded-[16px] bg-[#117C99] hover:bg-[#117c99b0] duration-200 text-[#FFF] flex justify-center relative top-0 items-center `}
              >
                إكمال عملة الدفع
              </Link>
            </div>
            {/* mobile */}
            <div
              className={`sm:hidden block absolute -bottom-2 left-[50%] translate-x-[-50%] bg-[#e9e9e9] py-2 md:px-7 px-4 rounded-t-[16px]`}
            >
              <Link
                to={URLPaymentState}
                className={`w-[294px] h-[48px] rounded-[16px] bg-[#117C99] hover:bg-[#117c99b0] duration-200 text-[#FFF] flex justify-center relative top-0 items-center `}
              >
                إكمال عملة الدفع
              </Link>
            </div>
          </>
        )}
      </>
    );
  }
  return (
    <>
      {/* desktop */}
      <div
        className={`roundedCornerPay sm:block hidden absolute -bottom-2 left-[50%] translate-x-[-50%] bg-[#e9e9e9] py-2 md:px-7 px-4 rounded-t-[16px]`}
      >
        <button
          onClick={ClickPay}
          className={`w-[294px] h-[48px] rounded-[16px] bg-[#117C99] hover:bg-[#117c99b0] duration-200 text-[#FFF] flex justify-center relative top-0 items-center `}
        >
          إكمال عملة الدفع
        </button>
      </div>
      {/* mobile */}
      <div
        className={`sm:hidden block absolute -bottom-2 left-[50%] translate-x-[-50%] bg-[#e9e9e9] py-2 md:px-7 px-4 rounded-t-[16px]`}
      >
        <button
          onClick={ClickPay}
          className={`w-[294px] h-[48px] rounded-[16px] bg-[#117C99] hover:bg-[#117c99b0] duration-200 text-[#FFF] flex justify-center relative top-0 items-center `}
        >
          إكمال عملة الدفع
        </button>
      </div>
    </>
  );
}
export { Iusso2, BtnPay };
export default Iusso;
