import { useLocation } from "react-router-dom";
import {
  iconChooseFlightActive,
  iconChooseFlightActiveStep2,
  iconStep1Active,
  // iconStep1UnActive,
  // iconStep2Active,
  iconStep2UnActive,
  iconStep3Active,
  iconStep3UnActive,
} from "../../../../../assets/icons/home";
import HandleStep from "./HandleStep";
import { useRecoilState } from "recoil";
// State Data
import {
  NameBooking,
  TicketId,
} from "../../../../../data/RecoilState/Search/TicketData";

function BookingSteps() {
  const { pathname } = useLocation();
  const [ticketIdState] = useRecoilState(TicketId);
  const [nameBookingState] = useRecoilState(NameBooking);
  return (
    <div className={`w-full h-full flex justify-center pe-[309px] mt-[29px]`}>
      <HandleStep
        typeStep={"3"}
        title="بيانات الدفع "
        icon={
          pathname !== "/airPay" && nameBookingState
            ? iconStep3Active
            : iconStep3UnActive
        }
        linkEdit={pathname !== "/airData" && pathname !== "/search"}
        link={"/airPay"}
        // icon={iconChooseFlightActive}
        // activeIcon={iconStep3Active}
        // unActiveIcon={iconStep3UnActive}
      />
      <HandleStep
        typeStep={"2"}
        title="بيانات المسافر "
        icon={
          pathname !== "/airData" && nameBookingState
            ? iconChooseFlightActiveStep2
            : iconStep2UnActive
        }
        linkEdit={pathname !== "/airData" && nameBookingState ? true : false}
        link={"/airData"}

        // icon={iconChooseFlightActive}
        // activeIcon={iconStep2Active}
        // unActiveIcon={iconStep2UnActive}
      />
      <HandleStep
        typeStep={"1"}
        title="اختيار الرحلة "
        icon={
          pathname !== "/search" && ticketIdState
            ? iconStep1Active
            : iconChooseFlightActive
        }
        linkEdit={pathname !== "/search" && ticketIdState ? true : false}
        link={"/search"}

        // icon={iconChooseFlightActive}
        // activeIcon={iconStep1Active}
        // unActiveIcon={iconStep1UnActive}
      />
    </div>
  );
}

export default BookingSteps;
