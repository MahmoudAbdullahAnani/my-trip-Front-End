import { useRecoilState } from "recoil";
import { typeSystem } from "../../../data/RecoilState/FormHandling";
import FormModule from "./FormModule";
// import FiledData from "../HandleData/FiledData";
import TypeTravelComponent from "./TypeTravelComponent";
import TypeTravelComponentMobile from "./TypeTravelComponentMobile";
import HeroSectionHotels from "../../Hotel/HeroSection/HeroSectionHotels";
import FiledData from "../HandleData/FiledData";

function HeroSection() {
  const [typeSystemState] = useRecoilState(typeSystem);

  if (typeSystemState === "car") {
    return <FormModule>cart</FormModule>;
  }
  if (typeSystemState === "hotel") {
    return <HeroSectionHotels />;
  }
  return (
    <>
      <TypeTravelComponentMobile />
      <FormModule>
        <TypeTravelComponent />
        {/* Inputs */}
        <FiledData />
      </FormModule>
    </>
  );
}

export default HeroSection;
