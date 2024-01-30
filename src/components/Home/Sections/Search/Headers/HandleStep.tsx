import { iconArrowLeftBig } from "../../../../../assets/icons/home";

function HandleStep({ icon, title }: { title: string; icon: JSX.Element }) {
  return (
    <div className={`flex justify-center items-center gap-[7px]`}>
      <span>{iconArrowLeftBig}</span>
      <div className={`flex gap-[3px] justify-center items-center p-[10px]`}>
        <span className={`text-[#117C99] text-[20px] font-[600] `}>
          {title}
        </span>
        <span>{icon}</span>
      </div>
    </div>
  );
}

export default HandleStep;
