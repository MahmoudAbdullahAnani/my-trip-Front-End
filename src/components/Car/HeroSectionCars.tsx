import NavTopMobile from "../../layout/NavTopMobile";
import FiledData from "../Home/HandleData/FiledData";
import FormModule from "../Home/Systems/FormModule";

function HeroSectionCars() {
  return (
    <>
      <div className={`lg:hidden`}>
        <NavTopMobile />
      </div>
      <FormModule>
        <FiledData />
      </FormModule>
    </>
  );
}
export default HeroSectionCars;
