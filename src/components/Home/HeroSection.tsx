// import { useRecoilState } from "recoil";
// import HandleForm from "../HandleForm";
// import { typeTravel } from "../../data/RecoilState/FormHandling";
import FieldSearchAirs from "../FieldSearchAirs";

function HeroSection() {
  // const [typeTravelState] = useRecoilState(typeTravel);

  return (
    <div
      style={{
        fill: "rgba(182, 231, 251, 0.30)",
        strokeWidth: "1px",
        stroke: "#FFF",
        backdropFilter: "blur(10px)",
      }}
      className={`flex flex-row-reverse`}
    >
      <FieldSearchAirs />
      {/* <HandleForm oneWay={typeTravelState} /> */}
    </div>
  );  
}

export default HeroSection;
