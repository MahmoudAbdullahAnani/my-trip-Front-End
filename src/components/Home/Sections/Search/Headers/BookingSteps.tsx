import { iconChooseFlight } from "../../../../../assets/icons/home"
import HandleStep from "./HandleStep"

function BookingSteps() {
  return (
    <div className={`w-full h-full flex justify-end pe-[309px] `}>
      <HandleStep icon={iconChooseFlight} title="اختيار الرحلة " />
      <HandleStep icon={iconChooseFlight} title="اختيار الرحلة " />
      <HandleStep icon={iconChooseFlight} title="اختيار الرحلة " />
    </div>
  );
}

export default BookingSteps
