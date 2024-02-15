import { iconLineLeft, iconLineRight } from "../assets/icons/home";

function OrLogin() {
  return (
    <div className={`flex justify-center items-center gap-[33px]`}>
      <span>{iconLineLeft}</span>
      <span>او</span>
      <span>{iconLineRight}</span>
    </div>
  );
}

export default OrLogin;
